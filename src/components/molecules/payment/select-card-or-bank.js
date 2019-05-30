import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import retrieveStripeCustomerBanks from '../../../queries/bscsapi/stripe/retrieve-stripe-customer-banks'
import retrieveStripeCustomerCards from '../../../queries/bscsapi/stripe/retrieve-stripe-customer-cards'

/* SelectCard functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * getUserBanks = async () => {
  * getUserCards = async () => {
  * getCardId = () => {...}
  * setUserPaymentMethods = async () => {...}
  * setPaymentMethodId = (e) => {...}
  * render() {...}
  *
*/

const SelectCardOrBank = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      payment_methods: undefined,
      selected_payment_method: undefined
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setUserPaymentMethods()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  getUserBanks = async () => {
    let banks

    banks = await retrieveStripeCustomerBanks(this.cancelToken)

    if(banks && !banks.data.data.retrieveStripeCustomerBanks.data.errors) {
      return banks.data.data.retrieveStripeCustomerBanks.data
    } else {
      return null
    }
  }

  getUserCards = async () => {
    let cards

    cards = await retrieveStripeCustomerCards(this.cancelToken)

    if(cards && !cards.data.data.retrieveStripeCustomerCards.data.errors) {
      return cards.data.data.retrieveStripeCustomerCards.data
    } else {
      return null
    }
  }

  setUserPaymentMethods = async () => {
    let cards, banks, payment_methods

    banks = await this.getUserBanks()
    cards = await this.getUserCards()

    payment_methods = []

    if(banks !== null && cards !== null) {
      payment_methods.push(...banks, ...cards)
      this.setState({payment_methods: payment_methods})
    } else {
      this.setState({errors: true})
    }
  }

  setPaymentMethodId = (e) => {
    let payment_methods, action_type

    e.preventDefault()

    if (this.props.dashboard) {
      action_type = document.activeElement.getAttribute('data-action-type')
      payment_methods = document.getElementsByName('dashboard-customer-payment-methods');
    } else {
      payment_methods = document.getElementsByName('customer-payment-methods');
    }

    for (let i = 0; i < payment_methods.length; i++) {
      if (payment_methods[i].checked) {
        this.setState({selected_payment_method: payment_methods[i].id})

        if (this.props.setSelectedSource && this.props.dashboard) {
          this.props.setSelectedSource((payment_methods[i].id).replace('dashboard-', ''), action_type)
        } else if (this.props.setSelectedSource && !this.props.dashboard) {
          this.props.setSelectedSource(payment_methods[i].id)
        }
        break
      }
    }
  }
//End custom functions

  render() {
    return (
      // <p>TEST</p>
      <React.Fragment>
        {!this.state.payment_methods && this.state.payment_methods !== null &&
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {(this.state.payment_methods || this.state.payment_methods === null) &&
          <React.Fragment>
            <Alert variant="warning">Love the work we do? Then make your donation go further! Setting up gifts through your checking account maximizes your donation to the fullest by avoiding the transaction and processing fees often associated with credit cards. As an independent nonprofit, we appreciate your generosity and support!</Alert>
            <Form onSubmit={(e) => this.setPaymentMethodId(e)} className="mb-4">
              <Form.Group>
                { this.state.payment_methods !== null &&
                  this.state.payment_methods.map((source, index) => {
                    if(
                      "bank_name" in source &&
                      this.props.selected_source &&
                      source.id === this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else if(
                      "bank_name" in source &&
                      source.status === 'verified' &&
                      this.props.selected_source &&
                      source.id === this.props.selected_source &&
                      this.props.default_source !== source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                        </React.Fragment>
                      )
                    } else if(
                      "bank_name" in source &&
                      source.status === 'verified' &&
                      this.props.selected_source &&
                      source.id !== this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else if(
                      "bank_name" in source &&
                      source.status === 'verified' &&
                      this.props.selected_source &&
                      source.id !== this.props.selected_source &&
                      this.props.default_source !== source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`dashboard-${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                        </React.Fragment>
                      )
                    } else if(
                      "bank_name" in source &&
                      source.status === 'verified' &&
                      !this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              inline="true"
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else if(
                      "bank_name" in source &&
                      source.status === 'verified' &&
                      !this.props.selected_source &&
                      this.props.default_source !== source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`dashboard-${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`${source.id}`}
                              label={`${source.bank_name}: ••••••••${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                        </React.Fragment>
                      )
                    } else if(
                      source.id.includes('card_') &&
                      this.props.selected_source &&
                      source.id === this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else if(
                      source.id.includes('card_') &&
                      this.props.selected_source &&
                      source.id !== this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                            <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else if(
                      source.id.includes('card_') &&
                      this.props.selected_source &&
                      source.id === this.props.selected_source &&
                      this.props.default_source !== source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              label={`•••• •••• •••• ${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              label={`•••• •••• •••• ${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                        </React.Fragment>
                      )
                    } else if(
                      source.id.includes('card_') &&
                      source.id !== this.props.selected_source &&
                      this.props.default_source !== source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`dashboard-${source.id}`}
                              label={`•••• •••• •••• ${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              id={`${source.id}`}
                              label={`•••• •••• •••• ${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#7c8c8e'}}
                              type="radio"
                            />
                          }
                        </React.Fragment>
                      )
                    } else if(
                      source.id.includes('card_') &&
                      !this.props.selected_source &&
                      this.props.default_source === source.id
                    ) {
                      return(
                        <React.Fragment key={`source-${index}`}>
                          {this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`dashboard-${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="dashboard-customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                          {!this.props.dashboard &&
                            <Form.Check
                              custom
                              defaultChecked
                              id={`${source.id}`}
                              inline="true"
                              label={`•••• •••• •••• ${source.last4}`}
                              name="customer-payment-methods"
                              style={{color: '#637375'}}
                              type="radio"
                            />
                          }
                            <span className="badge badge-pill badge-primary">DEFAULT</span>
                        </React.Fragment>
                      )
                    } else {
                      return (<React.Fragment key={`source-${index}`}></React.Fragment>)
                    }
                  })
                }
                {!this.props.default_source && this.props.allow_new &&
                  <React.Fragment>
                    <br />
                    {this.props.dashboard &&
                      <Form.Check
                        custom
                        defaultChecked
                        id="dashboard-new-card"
                        label="New Card"
                        name="dashboard-customer-payment-methods"
                        style={{color: '#637375'}}
                        type="radio"
                      />
                    }
                    {!this.props.dashboard &&
                      <Form.Check
                        custom
                        defaultChecked
                        id="new-card"
                        label="New Card"
                        name="customer-payment-methods"
                        style={{color: '#637375'}}
                        type="radio"
                      />
                    }
                  </React.Fragment>
                }
                {this.props.default_source && this.props.allow_new &&
                  <React.Fragment>
                    <br />
                    {this.props.dashboard &&
                      <Form.Check
                        custom
                        id="dashboard-new-card"
                        label="New Card"
                        name="dashboard-customer-payment-methods"
                        style={{color: '#7c8c8e'}}
                        type="radio"
                      />
                    }
                    {!this.props.dashboard &&
                      <Form.Check
                        custom
                        id="new-card"
                        label="New Card"
                        name="customer-payment-methods"
                        style={{color: '#7c8c8e'}}
                        type="radio"
                      />
                    }
                  </React.Fragment>
                }
                {(this.state.payment_methods === null || this.state.payment_methods.length === 0) && !this.props.allow_new &&
                  <p>No saved payment methods.</p>
                }
              </Form.Group>
              {!this.props.dashboard && this.state.payment_methods && (this.state.payment_methods.length !== 0 || this.props.allow_new) &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Use this payment method</Button>
                </div>
              }
              {this.props.dashboard && this.state.payment_methods && this.state.payment_methods.length !== 0 && !this.props.allow_new &&
                <div className="d-flex justify-content-center flex-wrap">
                  <Button data-action-type="update" className="m-3" variant="outline-primary" type="submit">Update</Button>
                  <Button data-action-type="delete" className="m-3" variant="outline-primary" type="submit">Delete</Button>
                  <Button data-action-type="verify" className="m-3" variant="outline-primary" type="submit">Verify Bank</Button>
                  <Button data-action-type="new-bank" className="m-3" variant="outline-primary" type="submit">New Bank</Button>
                  <Button data-action-type="new-card" className="m-3" variant="outline-primary" type="submit">New Card</Button>
                </div>
              }
            </Form>
            <hr />
            <p className="mt-4">Note: Bank accounts must be verified before they can be used.  Go to the Payment Methods section of the Dashboard to create or verify a bank account.</p>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectCardOrBank
