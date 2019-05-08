import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

// import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import CreateNewBank from '../bank/create-new-bank';
import CreateNewCard from '../card/create-new-card';
import CreditOrBank from '../credit-or-bank'
import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'
import SelectBank from '../bank/select-bank'
import SelectCard from '../card/select-card'
import SelectDonation from './select-donation'
import SigninForm from '../../../atoms/forms/signin-form/signin-form'
import Stepper from '../stepper'
import UpdateDonation from './update-donation'
import VerifyBank from '../bank/verify-bank';

import retrieveStripeCustomer from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../stepper.scss'

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
      bank_id: undefined,
      bank_status: undefined,
      card_id: undefined,
      customer_default_card: undefined,
      customer_stripe_id: undefined,
      donation_id: undefined,
      max_stage: 0,
      number_of_steps: 4,
      register: false,
      stage: 0,
      steps: ["Select Donation", "Credit or Bank", "Select Payment Source", "Update Donation"],
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
          this.setState({customer_stripe_id: response.data.data.retrieveStripeCustomer.id})
        } else {
          this.setState({customer_default_card: null, customer_stripe_id: null})
        }
      }
    })
  }

  next = (e) => {
    let current_stage, new_stage
    e.preventDefault()

    current_stage = this.state.stage
    if(current_stage < 3 && this.state.max_stage > current_stage) {
      new_stage = ++current_stage
      this.setState({stage: new_stage})
    }
  }

  previous = (e) => {
    let current_stage, new_stage
    e.preventDefault()

    current_stage = this.state.stage
    if(current_stage !== 0) {
      new_stage = --current_stage
      this.setState({stage: new_stage})
    }
  }

  setBankInfo = (bank_id, bank_status) => {
    console.log(bank_id)
    console.log(bank_status)
    if(bank_id === 'new-bank') {
      this.setState({
        bank_status: null,
        max_stage: 3,
        number_of_steps: 6,
        stage: 3,
        steps: ["Select Donation", "Card or Bank", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Update Donation"]
      })
    } else if(bank_status === 'verified') {
      this.setState({
        bank_id: bank_id,
        bank_status: 'SavedBankVerified',
        max_stage: 4,
        number_of_steps: 4,
        stage: 4,
        steps: ["Select Donation", "Card or Bank", "Select Bank", "Update Donation"],
        verified: true
      })
    } else if(bank_status !== 'verified') {
      this.setState({
        bank_id: bank_id,
        bank_status: 'SavedBankNotVerified',
        max_stage: 4,
        number_of_steps: 5,
        stage: 4,
        steps: ["Select Donation", "Card or Bank", "Select Bank", "Verify Bank Micro Transactions", "Update Donation"]
      })
    }
  }

  setCreditOrBank = (credit_or_bank) => {
    if(credit_or_bank === 'Credit') {
      this.setState({
        bank_id: null,
        bank_status: null,
        credit_or_bank: credit_or_bank,
        max_stage: 2,
        number_of_steps: 4,
        stage: 2,
        steps: ["Select Donation", "Card or Bank", "Select Card", "Update Donation"]
      })
    } else if(credit_or_bank === 'Bank') {
      this.setState({
        bank_status: null,
        card_id: null,
        credit_or_bank: credit_or_bank,
        max_stage: 2,
        number_of_steps: 4,
        stage: 2,
        steps: ["Select Donation", "Card or Bank", "Select Bank", "Update Donation"]
      })
    }
  }

  setStripeScript = () => {
    try {
      setTimeout(() => {
        this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')})
      }, 500)
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
        aria-labelledby="signin-form"
        centered
      >
        <Stepper
          max_stage={this.state.max_stage}
          number_of_steps={this.state.number_of_steps}
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage: max_stage})}
          signed_in={this.props.signed_in}
          stage={this.state.stage}
          steps={this.state.steps}
        />
        <Modal.Body>
          {this.state.stage === 0 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          { this.state.stage === 0 && this.props.signed_in &&
            <SelectDonation setDonationId={(donation_id) => this.setState({donation_id: donation_id, stage: 1, max_stage: 1})} />
          }
          {this.state.stage === 1 && this.props.signed_in &&
            <CreditOrBank setCreditOrBank={(credit_or_bank) => {this.setCreditOrBank(credit_or_bank)}} />
          }
          {this.state.stage === 2 && !this.state.stripe &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Bank' &&
            <SelectBank
              setBankInfo={(bank_id, bank_status) => this.setBankInfo(bank_id, bank_status)}
              allow_new={true}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Credit' &&
            <SelectCard
              setCardId={(card_id) => {
                if(card_id === 'new-card') {
                  this.setState({
                    card_id: card_id,
                    max_stage: 3,
                    number_of_steps: 5,
                    stage: 3,
                    steps: ["Select Donation", "Card or Bank", "Select Card", "Card Info", "Update Donation"]
                  })
                } else {
                  this.setState({
                    card_id: card_id,
                    max_stage: 3,
                    number_of_steps: 4,
                    stage: 3,
                    steps: ["Select Donation", "Card or Bank", "Select Card", "Update Donation"]
                  })
                }
              }}
              default_card={this.state.customer_default_card}
              allow_new={true}
            />
          }
          { this.state.stage === 3 && this.state.stripe && this.state.card_id === 'new-card' && this.state.credit_or_bank === 'Credit' &&
            <React.Fragment>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewCard setCardId={(card_id) => {this.setState({card_id: card_id, stage: 4, max_stage: 4})}} />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          }
          { this.state.stage === 3 && this.state.stripe && this.state.bank_status === null && this.state.credit_or_bank === 'Bank' &&
            <React.Fragment>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewBank
                    amount={this.props.amount}
                    description={this.props.description}
                    setBankId={(bank_id) => {
                      this.setState({
                        bank_id: bank_id,
                        max_stage: 4,
                        number_of_steps: 6,
                        steps: ["Select Donation", "Card or Bank", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Update Donation"],
                        stage: 4
                      })
                    }}
                  />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          }
          { this.state.stage === 3 && this.state.number_of_steps === 6 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({ max_stage: 5, stage: 5, verified: verified })}
            />
          }
          { this.state.stage === 4 && this.state.number_of_steps === 5 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({ max_stage: 5, stage: 5, verified: verified })}
            />
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bank_id && !this.state.verified &&
            <p>Unable to verify bank.</p>
          }
          { this.state.stage === 3 && this.props.signed_in && this.state.number_of_steps === 4 &&
            <UpdateDonation donation_id={this.state.donation_id} source_id={this.state.card_id || this.state.bank_id}  />
          }
          { this.state.stage === 4 && this.props.signed_in && (this.state.number_of_steps === 4 || this.state.number_of_steps === 5) &&
            <UpdateDonation donation_id={this.state.donation_id} source_id={this.state.card_id || this.state.bank_id} />
          }
          { this.state.stage === 5 && this.props.signed_in && this.state.number_of_steps === 6 &&
            <UpdateDonation donation_id={this.state.donation_id} source_id={this.state.card_id || this.state.bank_id} />
          }
        </Modal.Body>
        {/* <Modal.Footer>
            {this.state.stage > 0 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 3 && this.state.maxStage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default UpdateDonationModal