import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

// import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import CreateNewCard from '../card/create-new-card';
import SelectCardOrBank from '../select-card-or-bank'
import Stepper from '../stepper'
import UpdateDonation from './update-donation'

import retrieveStripeCustomer from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../stepper.scss'
import '../../../../global-scss/index.scss'

/* UpdateDonationModal functions
*
* constructor(props) {...}
* componentDidMount() {...}
* componentWillUpdate(prevProps) {...}
* componentWillUnmount() {...}
* getCustomerInfo = (cancelToken) => {...}
* next = (e) => {...}
* previous = (e) => {...}
* setStripeScript = () => {...}
* render() {...}
*
*/

const UpdateDonationModal = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      donation_id: undefined,
      max_stage: 0,
      number_of_steps: 2,
      source_id: undefined,
      stage: 0,
      steps: ["Payment Method", "Update Donation"],
      stripe: null
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setStripeScript()

    if(this.props.signed_in) {
      this.getCustomerInfo()
    }
  }

  componentWillUpdate(prevProps) {
    if(prevProps.signed_in !== this.props.signed_in) {
      this.getCustomerInfo()
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
  getCustomerInfo = () => {
    retrieveStripeCustomer(this.cancelToken).then(response => {
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        if(response.data.data.retrieveStripeCustomer !== null) {
          this.setState({customer_default_card: response.data.data.retrieveStripeCustomer.default_source})
        } else {
          this.setState({customer_default_card: null})
        }
      }
    })
  }

  setStripeScript = () => {
    try {
      if('Stripe' in window) {
        this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')})
      } else {
        setTimeout(this.setStripeScript, 200)
      }
    } catch(error) {
      console.log(error)
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
        aria-labelledby="update-donation-modal"
      >
        <Modal.Header closeButton style={{background: '#e6e6e6'}}>
          <Modal.Title id="update-donation-modal">
            <span>Update Donation</span>
          </Modal.Title>
        </Modal.Header>
        <Stepper
          max_stage={this.state.max_stage}
          number_of_steps={this.state.number_of_steps}
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage: max_stage})}
          signed_in={true}
          stage={this.state.stage}
          steps={this.state.steps}
        />
        <Modal.Body>
          { !this.state.stripe && this.stage === 0 &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 0 && this.state.stripe &&
            <SelectCardOrBank
              default_source={this.props.customer_default_source}
              allow_new={true}
              selected_source={this.state.selected_source}
              setSelectedSource={(source_id) => {
                if(source_id === 'new-card') {
                  this.setState({
                    selected_source: source_id,
                    stage: 1,
                    max_stage: 1,
                    number_of_steps: 3,
                    steps: ["Payment Method", "Card Information", "Update Donation"]
                  })
                } else {
                  this.setState({
                    selected_source: source_id,
                    stage: 1,
                    max_stage: 1,
                    number_of_steps: 2,
                    steps: ["Payment Method", "Update Donation"]
                  })
                }
              }}
            />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.selected_source === 'new-card' &&
            <React.Fragment>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewCard setCardId={(card_id) => {this.setState({selected_source: card_id, stage: 2, max_stage: 2})}} />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          }
          { this.state.stage === 1 && this.state.selected_source !== 'new-card' &&
            <UpdateDonation donation_id={this.props.donation_id} source_id={this.state.selected_source}  />
          }
          { this.state.stage === 2 &&
            <UpdateDonation donation_id={this.props.donation_id} source_id={this.state.selected_source} />
          }
        </Modal.Body>
      </Modal>
    )
  }
}

export default UpdateDonationModal