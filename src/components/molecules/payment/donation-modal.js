import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

// import ChargeNewCard from './card/charge-new-card'
import SigninForm from '../../atoms/forms/signin-form/signin-form'
import RegistrationForm from '../../atoms/forms/signin-form/registration-form'

// import ChargeBank from './bank/charge-bank'
// import ChargeCard from './card/charge-card'
import CreateNewBank from './bank/create-new-bank'
import CreditOrBank from './credit-or-bank'
import NewDonationSubscription from './donation/new-donation-subscription'
import SelectCard from './card/select-card'
import SelectBank from './bank/select-bank'
import Stepper from './stepper'
import VerifyBank from './bank/verify-bank'

import retrieveStripeCustomer from '../../../queries/bscsapi/stripe/retrieve-stripe-customer'

const DonationModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bank_id: null,
      card_id: null,
      // cardLast4: null,
      creditOrBank: null,
      bank_status: null,
      customer_default_card: undefined,
      max_stage: 0,
      register: false,
      stage: 0,
      stripe: null,
      verified: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentDidMount() {
    this.setStripeScript()
    console.log(this.props.signedIn)
    if(this.props.signedIn) {
      this.getCustomerDefaultCard(this.cancelToken)
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if(prevProps.signedIn !== this.props.signedIn) {
      this.getCustomerDefaultCard(this.cancelToken)
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }

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

  setCreditOrBank = (credit_or_bank) => {
    this.setState({credit_or_bank: credit_or_bank, bank_status: null, stage: 1, max_stage: 1})
  }

  setBankInfo = (bank_id, bank_status) => {
    console.log(bank_id)
    console.log(bank_status)
    if(bank_id === 'new-bank') {
      this.setState({stage: 2, max_stage: 2, bank_status: null})
    } else if(bank_status === 'verified') {
      this.setState({bankId: bank_id, bank_status, stage: 2, max_stage: 2, bank_status: 'SavedBankVerified', verified: true})
    } else if(bank_status !== 'verified') {
      this.setState({bankId: bank_id, bank_status, stage: 2, max_stage: 2, bank_status: 'SavedBankNotVerified'})
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

  next = (e) => {
    e.preventDefault()
    let current_stage = this.state.stage
    if(current_stage < 2 && this.state.max_stage > current_stage) {
      let new_stage = ++current_stage
      console.log(new_stage)
      this.setState({stage: new_stage})
    }
  }

  setStripeScript = () => {
    try {
      const stripeJs = document.createElement('script');
      stripeJs.async = true;
      stripeJs.id = "stripe-js"
      stripeJs.src = 'https://js.stripe.com/v3/';
      document.getElementsByTagName('head')[0].appendChild(stripeJs)
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
      setTimeout(() => {
        this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')})
      }, 500)
    } catch(error) {
      console.log(error)
    }
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
        {/* <Modal.Header> closeButton */}
          <Stepper
            setStage={(stage) => this.setState({stage: stage})}
            setMaxStage={(max_stage) => this.setState({max_stage})}
            stage={this.state.stage}
            max_stage={this.state.max_stage}
            signedIn={this.props.signedIn}
            credit_or_bank={this.state.credit_or_bank}
            bank_status={this.state.bank_status}
          />
        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <Modal.Title id="signin-form">
              {this.props.signedIn &&
                <span>{this.props.product} Payment</span>
              }
              {!this.props.signedIn &&
                <span>Sign in or Register</span>
              }
            </Modal.Title>
          </div>
          {this.state.stage === 0 && !this.props.signedIn && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signedIn && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && this.props.signedIn &&
            <CreditOrBank setCreditOrBank={(credit_or_bank) => {this.setCreditOrBank(credit_or_bank)}} />
          }
          {this.state.stage === 1 && !this.state.stripe &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.credit_or_bank === 'Bank' &&
            <SelectBank
              // setCardInfo={(card_id, card_last4) => this.setState({cardId: card_id, cardLast4: card_last4, stage: 2, max_stage: 2})}
              setBankInfo={(bank_id, bank_status) => this.setBankInfo(bank_id, bank_status)}
            />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.credit_or_bank === 'Credit' &&
            <SelectCard
              // setCardInfo={(card_id, card_last4) => this.setState({cardId: card_id, cardLast4: card_last4, stage: 2, max_stage: 2})}
              setCardId={(card_id) => this.setState({cardId: card_id, stage: 2, max_stage: 2})}
              default_card={this.state.customer_default_card}
              allowNew={true}
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
                    setBankId={(bank_id) => this.setState({bankId: bank_id, stage: 3, max_stage: 3})}
                  />
                </Elements>
              </StripeProvider>
            </React.Fragment>
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Credit' && this.state.cardId !== 'new-card' &&
            <NewDonationSubscription
              amount={this.props.amount}
              source_id={this.state.card_id || this.state.bank_id}
              // description={this.props.description}
              // cardLast4={this.state.cardLast4}
              // cancelToken={this.cancelToken}
              // cancelAxios={() => {this.cancelToken.cancel()}}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.credit_or_bank === 'Credit' && this.state.cardId === 'new-card' &&
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
              bankId={this.state.bankId}
              setVerified={(verified) => this.setState({verified: verified, stage: 3, max_stage: 3})}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.bank_status === 'SavedBankVerified' && this.state.bankId && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bankId={this.state.bankId}
              description={this.props.description}
            />
          }
          { this.state.stage === 3 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' && this.state.bankId && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bankId={this.state.bankId}
              description={this.props.description}
            />
          }
          { this.state.stage === 3 && this.state.stripe && this.state.bank_status === null &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({verified: verified, stage: 4, max_stage: 4})}
            />
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bankId && !this.state.verified &&
            <p>Unable to verify bank.</p>
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bankId && this.state.verified &&
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
            {this.state.stage < 2 && this.state.max_stage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default DonationModal

