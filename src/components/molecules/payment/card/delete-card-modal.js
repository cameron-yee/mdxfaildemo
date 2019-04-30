import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import DeleteCard from './delete-card'
import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'
import SelectCard from './select-card'
import SigninForm from '../../../atoms/forms/signin-form/signin-form'

import retrieveStripeCustomer from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../stepper.scss'

/* DeleteCardModal functions
*
* constructor(props) {...}
* componentDidMount() {...}
* componentWillUpdate(prevProps) {...}
* componentWillUnmount() {...}
* getCustomerInfo = (cancelToken) => {...}
* next = (e) => {...}
* previous = (e) => {...}
* render() {...}
*
*/
const DeleteCardModal = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      card_id: undefined,
      customer_default_card: undefined,
      customer_stripe_id: undefined,
      max_stage: 1,
      register: false,
      stage: 1,
      stripe: null
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    if(this.props.signed_in) {
      this.getCustomerInfo(this.cancelToken)
    }
  }

  componentWillUpdate(prevProps) {
    if(prevProps.signed_in !== this.props.signed_in) {
      this.getCustomerInfo(this.cancelToken)
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }
//End lifecycle hooks

//Custom functions
  getCustomerInfo = (cancelToken) => {
    retrieveStripeCustomer(cancelToken).then(response => {
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        if(response.data.data.retrieveStripeCustomer !== null) {
          this.setState({customer_default_card: response.data.data.retrieveStripeCustomer.default_source})
          this.setState({customer_stripe_id: response.data.data.retrieveStripeCustomer.id})
        } else {
          this.setState({customer_default_card: null, customer_stripe_id: null})
        }
      }
    })
  }

  next = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage < 2 && this.state.max_stage > current_stage) {
      let new_stage = ++current_stage
      console.log(new_stage)
      this.setState({stage: new_stage})
    }
  }

  previous = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage !== 1) {
      let new_stage = --current_stage
      this.setState({stage: new_stage})
    }
  }
//End custom functions

  render() {
    return (
      <Modal
        // {...this.props}
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="signin-form"
        centered
      >
        {this.props.signed_in && this.state.stage === 1 &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Select Card</div>
          </Col>
        }
        {this.props.signed_in && this.state.stage === 2 &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Delete Card</div>
          </Col>
        }
        {!this.props.signed_in &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Sign In or Register</div>
          </Col>
        }
        <Modal.Body>
          {this.state.stage === 1 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 1 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          { this.state.stage === 1 && this.props.signed_in &&
            <SelectCard
              // setCardInfo={(card_id, card_last4) => this.setState({card_id: card_id, cardLast4: card_last4, stage: 2, max_stage: 2})}
              allow_new={false}
              default_card={this.state.customer_default_card}
              delete={true}
              setCardId={(card_id) => this.setState({card_id: card_id, stage: 2, max_stage: 2})}
            />
          }
          { this.state.stage === 2 && this.props.signed_in &&
            <DeleteCard card_id={this.state.card_id} />
          }
        </Modal.Body>
        <Modal.Footer>
            {this.state.stage > 1 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 2 && this.state.max_stage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteCardModal