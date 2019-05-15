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
// import CreateNewBank from './bank/create-new-bank';
// import CreditOrBank from './credit-or-bank'
import SelectCardOrBank from './select-card-or-bank'
// import SelectCard from './card/select-card'
// import SelectBank from './bank/select-bank'
import SpecificContactForm from '../../atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'
import Stepper from './stepper'
// import VerifyBank from './bank/verify-bank';

import retrieveStripeCustomer from '../../../queries/bscsapi/stripe/retrieve-stripe-customer'

import '../../../global-scss/index.scss'

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
      selected_source: null,
      payment_method: null,
      bank_status: null,
      customer_default_card: undefined,
      max_stage: 0,
      number_of_steps: 1,
      register: false,
      stage: 0,
      steps: ["Sign In or Register"],
      stripe: null,
      // verified: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setStripeScript()
    if(this.props.signed_in) {
      this.getCustomerDefaultCard(this.cancelToken)
      this.setState({steps: ["Payment Method", "Pay"], number_of_steps: 2})
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
        this.setState({steps: ["Payment Method", "Pay"], number_of_steps: 2})
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
        // centered
      >
        <Modal.Header closeButton style={{background: '#e6e6e6'}}>
          <Modal.Title id="signin-form">
            {this.props.signed_in &&
              <span>{this.props.product} Payment</span>
            }
          </Modal.Title>
        </Modal.Header>
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
          {this.state.stage === 0 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {/* {this.state.stage === 0 && this.props.signed_in &&
            <CreditOrBank setCreditOrBank={(credit_or_bank) => {this.setCreditOrBank(credit_or_bank)}} />
          } */}
          {this.state.stage === 0 && this.props.signed_in &&
            <SelectCardOrBank
              default_card={this.state.customer_default_card}
              allow_new={true}
              selected_source={this.state.selected_source}
              setSelectedSource={(source_id) => this.setState({selected_source: source_id, stage: 1, max_stage: 1})}
            />
          }
          {this.state.stage === 0 && !this.state.stripe &&
            <Spinner animation="grow" variant="primary" />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.selected_source.includes('card_') &&
            <ChargeCard
              amount={this.props.amount}
              card_id={this.state.selected_source}
              description={this.props.description}
            />
          }
          { this.state.stage === 1 && this.state.stripe && this.state.selected_source === 'new-card' &&
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <ChargeNewCard
                  amount={this.props.amount}
                  description={this.props.description}
                />
              </Elements>
            </StripeProvider>
          }
          { this.state.stage === 1 && this.state.stripe && this.state.selected_source.includes('ba_') &&
            <ChargeBank
              amount={this.props.amount}
              bank_id={this.state.selected_source}
              description={this.props.description}
            />
          }
          {/* { this.state.stage === 2 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' &&
            <VerifyBank
              bank_id={this.state.bank_id}
              setVerified={(verified) => this.setState({ max_stage: 3, stage: 3, verified: verified })}
            />
          } */}
          {/* { this.state.stage === 3 && this.state.stripe && this.state.bank_status === 'SavedBankNotVerified' && this.state.bank_id && this.state.verified &&
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
          } */}
          {/* { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bank_id && !this.state.verified &&
            <p>Unable to verify bank.</p>
          }
          { this.state.stage === 4 && this.state.stripe && this.state.credit_or_bank === 'Bank' && this.state.bank_id && this.state.verified &&
            <ChargeBank
              amount={this.props.amount}
              bank_id={this.state.bank_id}
              description={this.props.description}
            />
          } */}
        </Modal.Body>
        <Modal.Footer>
            <SpecificContactForm
              sendto="Alyssa Markle"
              infoat="false"
            >
              Purchase order form?
            </SpecificContactForm>
            {/* {this.state.stage > 0 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 2 && this.state.maxStage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            } */}
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PaymentModal

