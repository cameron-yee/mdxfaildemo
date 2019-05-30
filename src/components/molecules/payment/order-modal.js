import React, { Component } from 'react'

import axios from 'axios'
import { Elements, StripeProvider } from 'react-stripe-elements'

// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import RegistrationForm from '../../atoms/forms/signin-form/registration-form'
import SigninForm from '../../atoms/forms/signin-form/signin-form'

import CreateAndPayOrder from './order/create-and-pay-order'
import NewCardCreateAndPayOrder from './order/new-card-create-and-pay-order'
import SelectCardOrBank from './select-card-or-bank'
import ShippingForm from '../../atoms/forms/shipping-form/shipping-form'
import SpecificContactForm from '../../atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'
import Stepper from './stepper'

import retrieveStripeCustomer from '../../../queries/bscsapi/stripe/retrieve-stripe-customer'
import retrieveSkuInformation from '../../../queries/bscsapi/stripe/retrieve-sku-information'


import '../../../global-scss/index.scss'

/* OrderModal functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentWillUnmount() {...}
  * componentWillUpdate(prevProps) {...}
  * getCustomerDefaultCard = (cancelToken) => {...}
  * setCreditOrBank = (credit_or_bank) => {...}
  * setStripeScript = () => {...}
  * render() {...}
  *
*/

const OrderModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_source: null,
      customer_default_source: undefined,
      max_stage: 1,
      number_of_steps: 2,
      register: false,
      stage: 0,
      steps:[["Sign in", "fa-sign-in-alt"], ["Register", "fa-user-plus"]],
      stripe: null,
      sku_image: undefined,
      sku_price: undefined,
      sku_quantity: undefined
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setStripeScript()
    if(this.props.signed_in) {
      this.getCustomerDefaultSource()
      this.getSkuInformation()
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

  componentDidUpdate(prevProps) {
    if(prevProps.sku !== this.props.sku && this.props.signed_in) {
      this.getSkuInformation()
    }

    if(prevProps.signed_in !== this.props.signed_in) {
      if(this.props.signed_in) {
        this.getCustomerDefaultSource()
        this.getSkuInformation()
        if(this.props.ship) {
          this.setState({
            steps: [["Payment Method", "fa-credit-card"], ["Shipping", "fa-shipping-fast"], ["Place Order", "fa-check-circle"]],
            max_stage: 0,
            number_of_steps: 3
          })
        } else {
          this.setState({
            steps: [["Payment Method", "fa-credit-card"], ["Place Order", "fa-check-circle"]],
            max_stage: 0,
            number_of_steps: 2
          })
        }
      } else {
        this.setState({
          steps:[["Sign in", "fa-sign-in-alt"], ["Register", "fa-user-plus"]],
          max_stage: 1,
          number_of_steps: 2
        })
      }
    }
  }
//End lifecycle hooks

//Custom functions
  getSkuInformation = () => {
    retrieveSkuInformation(this.cancelToken, this.props.sku).then(response => {
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        this.setState({
          sku_image: response.data.data.retrieveStripeSku.image,
          sku_quantity: response.data.data.retrieveStripeSku.inventory.quantity,
          sku_price: response.data.data.retrieveStripeSku.price
        })
      }
    })
  }

  getCustomerDefaultSource = () => {
    retrieveStripeCustomer(this.cancelToken).then(response => {
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        if(response.data.data.retrieveStripeCustomer !== null) {
          this.setState({customer_default_source: response.data.data.retrieveStripeCustomer.default_source})
        } else {
          this.setState({customer_default_source: null})
        }
      }
    })
  }

  setStripeScript = () => {
    try {
      if('Stripe' in window) {
        // this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')}) //TESTING
        this.setState({stripe: window.Stripe('pk_live_HDeMFcHo2Gc2UM9Plqoku55j')}) //LIVE
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
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="signin-form"
      >
        <Modal.Header closeButton style={{background: '#e6e6e6'}}>
          <Modal.Title id="signin-form">
            {this.props.signed_in &&
              <span>Order {this.props.product}</span>
            }
            {!this.props.signed_in &&
              <span>Sign In or Register</span>
            }
          </Modal.Title>
        </Modal.Header>
        <Stepper
          setStage={(stage) => {
            stage === 0
            ?
            this.setState({stage: stage, register: false})
            :
            this.setState({stage: stage, register: true})
          }}
          setMaxStage={(max_stage) => this.setState({max_stage})}
          stage={this.state.stage}
          max_stage={this.state.max_stage}
          no_checks={true}
          number_of_steps={this.state.number_of_steps}
          signed_in={this.props.signed_in}
          steps={this.state.steps}
        />
        {this.state.sku_quantity && this.state.sku_quantity === 0 &&
          <Modal.Body>
            <p>Out of Stock. Contact ____ for more information.</p>
          </Modal.Body>
        }
        {(!this.state.sku_quantity || this.state.sku_quantity > 0) &&
          <Modal.Body>
            {this.state.stage === 0 && !this.props.signed_in &&
              <SigninForm setSignedIn={this.props.setSignedIn} />
            }
            {this.state.stage === 1 && !this.props.signed_in &&
              <RegistrationForm setSignedIn={this.props.setSignedIn} />
            }
            {this.state.stage === 0 && this.props.signed_in &&
              <SelectCardOrBank
                default_source={this.state.customer_default_source}
                allow_new={true}
                selected_source={this.state.selected_source}
                setSelectedSource={(source_id) => this.setState({selected_source: source_id, stage: 1, max_stage: 1})}
              />
            }
            {this.state.stage === 0 && !this.state.stripe &&
              <Spinner animation="grow" variant="primary" />
            }
            {this.props.signed_in && this.props.ship && this.state.stage === 1 &&
              <ShippingForm
                setShipping={(shipping) => this.setState({shipping: shipping, stage: 2, max_stage: 2})}
              />
            }
            {this.props.signed_in && this.props.ship && this.state.stage === 2 && this.state.stripe && this.state.selected_source !== 'new-card' &&
              <CreateAndPayOrder
                metadata={this.props.metadata}
                price={this.state.sku_price}
                sku={this.props.sku}
                source_id={this.state.selected_source}
                shipping={this.state.shipping}
              />
            }
            {this.props.signed_in && this.props.ship && this.state.stage === 2 && this.state.stripe && this.state.selected_source === 'new-card' &&
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <NewCardCreateAndPayOrder
                    metadata={this.props.metadata}
                    price={this.state.sku_price}
                    sku={this.props.sku}
                    shipping={this.state.shipping}
                  />
                </Elements>
              </StripeProvider>
            }
            {this.props.signed_in && !this.props.ship && this.state.stage === 1 && this.state.stripe && this.state.selected_source !== 'new-card' &&
              <CreateAndPayOrder
                metadata={this.props.metadata}
                price={this.state.sku_price}
                sku={this.props.sku}
                source_id={this.state.selected_source}
              />
            }
            {this.props.signed_in && !this.props.ship && this.state.stage === 1 && this.state.stripe && this.state.selected_source === 'new-card' &&
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <NewCardCreateAndPayOrder
                    metadata={this.props.metadata}
                    price={this.state.sku_price}
                    sku={this.props.sku}
                  />
                </Elements>
              </StripeProvider>
            }
          </Modal.Body>
        }
        {this.props.signed_in && this.props.purchase_order_form &&
          <Modal.Footer>
              <SpecificContactForm
                sendto={this.props.purchase_order_form}
                infoat="false"
              >
                Purchase order form?
              </SpecificContactForm>
          </Modal.Footer>
        }
      </Modal>
    )
  }
}

export default OrderModal

