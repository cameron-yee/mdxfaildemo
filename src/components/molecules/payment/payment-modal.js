import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import ChargeNewCard from '../../../components/molecules/payment/charge-new-card'
import SigninForm from '../../../components/atoms/forms/signin-form/signin-form'

import ChargeCard from './charge-card'
import CreditOrBank from './credit-or-bank'
import SelectCard from './select-card'
import Stepper from './stepper'

import retrieveStripeCustomer from '../../../queries/bscsapi/stripe/retrieve-stripe-customer'

const PaymentModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardId: null,
      // cardLast4: null,
      creditOrBank: null,
      customerDefaultCard: null,
      maxStage: 0,
      stage: 0,
      stripe: null,
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

  componentWillUpdate(prevProps) {
    if(this.props.signedIn && this.state.customerDefaultCard === null) {
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
      if(response !== undefined && response.status === 200 && !response.data.errors) {
        this.setState({customerDefaultCard: response.data.data.retrieveStripeCustomer.default_source})
      }
    })
  }

  setCreditOrBank = (credit_or_bank) => {
    this.setState({creditOrBank: credit_or_bank, stage: 1, maxStage: 1})
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
    if(current_stage < 2 && this.state.maxStage > current_stage) {
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
            setMaxStage={(maxStage) => this.setState({maxStage})}
            stage={this.state.stage}
            maxStage={this.state.maxStage}
            signedIn={this.props.signedIn}
            creditOrBank={this.state.creditOrBank}
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
          {this.state.stage === 0 && !this.props.signedIn &&
            <SigninForm setSignedIn={this.props.setSignedIn} />
          }
          {this.state.stage === 0 && this.props.signedIn &&
            <CreditOrBank setCreditOrBank={(credit_or_bank) => {this.setCreditOrBank(credit_or_bank)}} />
          }
          {this.state.stage === 1 && !this.state.stripe &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.creditOrBank === 'Bank' &&
            <React.Fragment>
              <p>Bank Payments not created yet</p>
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Back</Button>
            </React.Fragment>
          }
          { this.state.stage === 1 && this.state.stripe && this.state.creditOrBank === 'Credit' &&
            <SelectCard
              // setCardInfo={(card_id, card_last4) => this.setState({cardId: card_id, cardLast4: card_last4, stage: 2, maxStage: 2})}
              setCardId={(card_id) => this.setState({cardId: card_id, stage: 2, maxStage: 2})}
              defaultCard={this.state.customerDefaultCard}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.creditOrBank === 'Credit' && this.state.cardId !== 'new-card' &&
            <ChargeCard
              amount={this.props.amount}
              cardId={this.state.cardId}
              description={this.props.description}
              // cardLast4={this.state.cardLast4}
              cancelToken={this.cancelToken}
              cancelAxios={() => {this.cancelToken.cancel()}}
            />
          }
          { this.state.stage === 2 && this.state.stripe && this.state.creditOrBank === 'Credit' && this.state.cardId === 'new-card' &&
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <ChargeNewCard
                  amount={this.props.amount}
                  description={this.props.description}
                  cancelToken={this.cancelToken}
                  cancelAxios={() => {this.cancelToken.cancel()}}
                />
              </Elements>
            </StripeProvider>
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

