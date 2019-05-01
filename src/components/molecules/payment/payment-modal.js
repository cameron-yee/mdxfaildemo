import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import ChargeNewCard from './card/charge-new-card'
import RegistrationForm from '../../../components/atoms/forms/signin-form/registration-form'
import SigninForm from '../../../components/atoms/forms/signin-form/signin-form'

import ChargeBank from './bank/charge-bank'
import ChargeCard from './card/charge-card'
import CreateNewBank from './bank/create-new-bank';
import CreditOrBank from './credit-or-bank'
import SelectCard from './card/select-card'
import SelectBank from './bank/select-bank'
import Stepper from './stepper'
import VerifyBank from './bank/verify-bank';

import retrieveStripeCustomer from '../../../queries/bscsapi/stripe/retrieve-stripe-customer'

/* PaymentModal functions
*
* constructor(props) {...}
* componentDidMount() {...}
* componentWillUnmount() {...}
* componentWillUpdate(prevProps) {...}
* getCustomerDefaultCard = (cancelToken) => {...}
* next = (e) => {...}
* previous = (e) => {...}
* setBankInfo = (bank_id, bank_status) => {...}
* setCreditOrBank = (credit_or_bank) => {...}
* setStripeScript = () => {...}
* render() {...}
*
*/

const PaymentModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bank_id: null,
      card_id: null,
      // cardLast4: null,
      credit_or_bank: null,
      bank_status: null,
      customer_default_card: undefined,
      max_stage: 0,
      number_of_steps: 1,
      register: false,
      stage: 0,
      steps: ["Sign In or Register"],
      stripe: null,
      verified: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setStripeScript()
    console.log(this.props.signed_in)
    if(this.props.signed_in) {
      this.getCustomerDefaultCard(this.cancelToken)
      this.setState({steps: ["Select Payment Type", "Info", "Pay"], number_of_steps: 3})
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }

  componentWillUpdate(prevProps) {
    if(prevProps.signed_in !== this.props.signed_in) {
      this.getCustomerDefaultCard(this.cancelToken)

      if(!this.props.signed_in) {
        this.setState({steps: ["Select Payment Type", "Info", "Pay"], number_of_steps: 3})
      } else {
        this.setState({steps: ["Sign In or Register"], number_of_steps: 1})
      }
    }
  }
//End lifecycle hooks

//Custom functions
  getCustomerDefaultCard = (cancelToken) => {
    retrieveStripeCustomer(cancelToken).then(response => {
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

  next = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage < this.state.number_of_steps && this.state.max_stage > current_stage) {
      let new_stage = ++current_stage
      console.log(new_stage)
      this.setState({stage: new_stage})
    }
  }

  previous = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage !== 0) {
      let new_stage = --current_stage
      console.log(new_stage)
      this.setState({stage: new_stage})
    }
  }

  setBankInfo = (bank_id, bank_status) => {
    console.log(bank_id)
    console.log(bank_status)
    if(bank_id === 'new-bank') {
      this.setState({
        bank_status: null,
        max_stage: 2,
        number_of_steps: 5,
        stage: 2,
        steps: ["Select Payment", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Pay"]
      })
    } else if(bank_status === 'verified') {
      this.setState({
        bank_id: bank_id,
        bank_status: 'SavedBankVerified',
        max_stage: 2,
        number_of_steps: 3,
        stage: 2,
        steps: ["Select Payment", "Select Bank", "Pay"],
        verified: true
      })
    } else if(bank_status !== 'verified') {
      this.setState({
        bank_id: bank_id,
        bank_status: 'SavedBankNotVerified',
        max_stage: 2,
        number_of_steps: 4,
        stage: 2,
        steps: ["Select Payment", "Select Bank", "Verify Bank Micro Transactions", "Pay"]
      })
    }
  }

  setCreditOrBank = (credit_or_bank) => {
    if(credit_or_bank === 'Credit') {
      this.setState({
        bank_status: null,
        credit_or_bank: credit_or_bank,
        max_stage: 1,
        number_of_steps: 3,
        stage: 1,
        steps: ["Select Payment", "Select Card", "Pay"]
      })
    } else if(credit_or_bank === 'Bank') {
      this.setState({
        bank_status: null,
        credit_or_bank: credit_or_bank,
        max_stage: 1,
        number_of_steps: 5,
        stage: 1,
        steps: ["Select Payment", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Pay"]
      })
    }
  }

  setStripeScript = () => {
    try {
      // const stripeJs = document.createElement('script');
      // stripeJs.async = true;
      // stripeJs.id = "stripe-js"
      // stripeJs.src = 'https://js.stripe.com/v3/';
      // document.getElementsByTagName('head')[0].appendChild(stripeJs)
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
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
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage})}
          stage={this.state.stage}
          max_stage={this.state.max_stage}
          number_of_steps={this.state.number_of_steps}
          signed_in={this.props.signed_in}
          steps={this.state.steps}
          // credit_or_bank={this.state.credit_or_bank}
          // bank_status={this.state.bank_status}
        />
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <Modal.Title id="signin-form">
              {this.props.signed_in &&
                <span>{this.props.product} Payment</span>
              }
            </Modal.Title>
          </div>
          {this.state.stage === 0 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && this.props.signed_in &&
            <CreditOrBank setCreditOrBank={(credit_or_bank) => {this.setCreditOrBank(credit_or_bank)}} />
          }
          {this.state.stage === 1 && !this.state.stripe &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.credit_or_bank === 'Bank' &&
            <SelectBank
              setBankInfo={(bank_id, bank_status) => this.setBankInfo(bank_id, bank_status)}
            />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.credit_or_bank === 'Credit' &&
            <SelectCard
              setCardId={(card_id) => {
                this.setState({
                  card_id: card_id,
                  max_stage: 2,
                  number_of_steps: 3,
                  stage: 2,
                  steps: ["Select Payment", "Select Card", "Pay"]
                })
              }}
              default_card={this.state.customer_default_card}
              allow_new={true}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.bank_status === null && this.state.credit_or_bank === 'Bank' &&
            <React.Fragment>
              {/* <p>Bank Payments not created yet</p>
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Back</Button> */}
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewBank
                    amount={this.props.amount}
                    description={this.props.description}
                    setBankId={(bank_id) => {
                      this.setState({
                        bank_id: bank_id,
                        max_stage: 3,
                        number_of_steps: 5,
                        steps: ["Select Payment", "Select Bank", "Enter Bank Info", "Verify Bank Micro Transactions", "Pay"],
                        stage: 3
                      })
                    }}
                  />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Credit' && this.state.card_id !== 'new-card' &&
            <ChargeCard
              amount={this.props.amount}
              card_id={this.state.card_id}
              description={this.props.description}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Credit' && this.state.card_id === 'new-card' &&
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <ChargeNewCard
                  amount={this.props.amount}
                  description={this.props.description}
                />
              </Elements>
            </StripeProvider>
          }
          { this.state.stage === 2 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({ max_stage: 3, stage: 3, verified: verified })}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.bank_status === 'SavedBankVerified' && this.state.bank_id && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bank_id={this.state.bank_id}
              description={this.props.description}
            />
          }
          { this.state.stage === 3 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' && this.state.bank_id && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bank_id={this.state.bank_id}
              description={this.props.description}
            />
          }
          { this.state.stage === 3 && this.state.stripe && this.state.bank_status === null &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({ max_stage: 4, stage: 4, verified: verified})}
            />
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bank_id && !this.state.verified &&
            <p>Unable to verify bank.</p>
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bank_id && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bank_id={this.state.bank_id}
              description={this.props.description}
            />
          }
        </Modal.Body>
        {/* <Modal.Footer>
            {this.state.stage > 0 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 2 && this.state.maxStage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default PaymentModal

