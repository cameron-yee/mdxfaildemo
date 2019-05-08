import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import DeleteBank from './delete-bank'
import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'
import SelectBank from './select-bank'
import SigninForm from '../../../atoms/forms/signin-form/signin-form'
import Stepper from '../stepper'

import retrieveStripeCustomer from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../stepper.scss'

/* DeleteBankModal functions
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

const DeleteBankModal = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bank_id: undefined,
      //customer_default_card: undefined,
      customer_stripe_id: undefined,
      max_stage: 0,
      register: false,
      stage: 0,
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
        <Stepper
          max_stage={this.state.max_stage}
          number_of_steps={2}
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage})}
          signed_in={this.props.signed_in}
          stage={this.state.stage}
          steps={["Select Bank", "Delete Bank account"]}
        />
        <Modal.Body>
          {this.state.stage === 0 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          { this.state.stage === 0 && this.props.signed_in &&
            <SelectBank
              allow_new={false}
              delete={true}
              setBankInfo={(bank_id, bank_status) => this.setState({bank_id: bank_id, stage: 1, max_stage: 1})}
            />
          }
          { this.state.stage === 1 && this.props.signed_in &&
            <DeleteBank bank_id={this.state.bank_id} />
          }
        </Modal.Body>
        <Modal.Footer>
            {this.state.stage > 0 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 1 && this.state.max_stage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeleteBankModal