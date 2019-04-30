import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import SelectCard from './select-card'
import DeleteCard from './delete-card'
import SigninForm from '../../../atoms/forms/signin-form/signin-form'
import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'

import retrieveStripeCustomer from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../stepper.scss'

const DeleteCardModal = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardId: undefined,
      customerDefaultCard: undefined,
      customerStripeId: undefined,
      maxStage: 1,
      register: false,
      stage: 1,
      stripe: null
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentDidMount() {
    if(this.props.signedIn) {
      this.getCustomerInfo(this.cancelToken)
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if(prevProps.signedIn !== this.props.signedIn) {
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

  previous = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage !== 1) {
      let new_stage = --current_stage
      this.setState({stage: new_stage})
    }
  }

  next = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage < 2 && this.state.maxStage > current_stage) {
      let new_stage = ++current_stage
      console.log(new_stage)
      this.setState({stage: new_stage})
    }
  }

  getCustomerInfo = (cancelToken) => {
    retrieveStripeCustomer(cancelToken).then(response => {
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        if(response.data.data.retrieveStripeCustomer !== null) {
          this.setState({customerDefaultCard: response.data.data.retrieveStripeCustomer.default_source})
          this.setState({customerStripeId: response.data.data.retrieveStripeCustomer.id})
        } else {
          this.setState({customerDefaultCard: null, customerStripeId: null})
        }
      }
    })
  }

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
        {this.props.signedIn && this.state.stage === 1 &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Select Card</div>
          </Col>
        }
        {this.props.signedIn && this.state.stage === 2 &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Delete Card</div>
          </Col>
        }
        {!this.props.signedIn &&
          <Col xs={12} className="step steps-1">
            <div className="d-flex align-items-center">Sign In or Register</div>
          </Col>
        }
        <Modal.Body>
          {this.state.stage === 1 && !this.props.signedIn && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 1 && !this.props.signedIn && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          { this.state.stage === 1 && this.props.signedIn &&
            <SelectCard
              // setCardInfo={(card_id, card_last4) => this.setState({cardId: card_id, cardLast4: card_last4, stage: 2, maxStage: 2})}
              allowNew={false}
              defaultCard={this.state.customerDefaultCard}
              delete={true}
              setCardId={(card_id) => this.setState({cardId: card_id, stage: 2, maxStage: 2})}
            />
          }
          { this.state.stage === 2 && this.props.signedIn &&
            <DeleteCard cardId={this.state.cardId} />
          }
        </Modal.Body>
        <Modal.Footer>
            {this.state.stage > 1 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 2 && this.state.maxStage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteCardModal