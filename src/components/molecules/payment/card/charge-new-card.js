import React, { Component } from 'react'

import axios from 'axios'
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

import CountryDropdown from './country-dropdown'
import DonationFrequencyDropdown from '../donation/donation-frequency-dropdown'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'
import createCustomerCard from '../../../../queries/bscsapi/stripe/create-customer-card';
import createDonationSubscription from '../../../../queries/bscsapi/stripe/create-donation-subscription';

import './charge-new-card.scss'

/* ChargeNewCard functions
*
* constructor(props) {...}
* componentWillUnmount() {}
* blurAddress = (e) => {...}
* blurCity = (e) => {...}
* blurCustomerState = (e) => {...}
* blurDonateAmount = (e) => {...}
* blurFirstName = (e) => {...}
* blurLastName = (e) => {...}
* blurZipcode = (e) => {...}
* createStripeToken = async () => {...}
* handleDonation = async (e) => {...}
* setAddress = (e) => {...}
* setCity = (e) => {...}
* setCustomerState = (e) => {...}
* setDonateAmount = (e) => {...}
* setFirstName = (e) => {...}
* setLastName = (e) => {...}
* setZipcode = (e) => {...}
* submit = async (e) => {...}
*
*/

const ChargeNewCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: undefined,
      address_touched: false,
      city: undefined,
      city_touched: false,
      country: 'US',
      donate_amount: 0,
      donate_amount_touched: false,
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      state: undefined,
      state_touched: false,
      zipcode: undefined,
      zipcode_touched: false,

      errors: false,
      frequency: 'Monthly',
      loading: false,
      successfully_charged: false
    }

    this.cancelToken = axios.CancelToken.source()
    this.style = {
      base: {
        color: "#495057",
        fontWeight: 400,
        // fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
        fontFamily: "Open Sans, Adobe Blank, sans-serif",
        // fontSize: "1.2rem",
        fontSize: "19.2px",
        fontSmoothing: "antialiased",

        "::placeholder": {
          color: "#7c8c8e"
        }
      },
      invalid: {
        color: "#E25950"
      }
    }
  }

//Lifecycle hooks
  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  blurAddress = (e) => {
    e.preventDefault()
    this.setState({address_touched: true})
  }

  blurCity = (e) => {
    e.preventDefault()
    this.setState({city_touched: true})
  }

  blurCustomerState = (e) => {
    e.preventDefault()
    this.setState({state_touched: true})
  }

  blurDonateAmount = (e) => {
    e.preventDefault()
    this.setState({donate_amount_touched: true})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  blurZipcode = (e) => {
    e.preventDefault()
    this.setState({zipcode_touched: true})
  }

  createStripeToken = async () => {
    let name, token

    name = this.state.firstname + ' ' + this.state.lastname
    if(this.state.country === 'US') {
      token = await this.props.stripe.createToken({
        name: name,
        address_line1: this.state.address,
        address_city: this.state.city,
        address_state: this.state.state,
        address_zip: this.state.zipcode,
        address_country: this.state.country
      })
    } else {
      token = await this.props.stripe.createToken({
        name: name,
        address_country: this.state.country
      })
    }

    return token.token.id
  }

  handleDonation = async (e) => {
    let token_id
    e.preventDefault()

    token_id = await this.createStripeToken()

    this.setState({loading: true})

    createCustomerCard(this.cancelToken, token_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        if(this.state.frequency === 'Monthly' || this.state.frequency === 'Yearly') {
          createDonationSubscription(this.cancelToken, this.state.donate_amount, this.state.frequency, response.data.data.createStripeCustomerCard.id).then(response => {
            if(response.status === 200 && !response.data.errors && response.data.data.createStripeCustomerDonationSubscription.status === 'active') {
              this.setState({successfully_charged: true, loading: false})
            } else {
              this.setState({errors: true, loading: false })
            }
          })
        } else if(this.state.frequency === 'Once') {
          const donation_description = 'BSCS Science Learning one time donation'
          createCharge(this.cancelToken, this.state.donate_amount*100, response.data.data.createStripeCustomerCard.id, donation_description).then(response => {
            if(response.status === 200 && !response.data.errors) {
              this.setState({successfully_charged: true, loading: false})
            } else {
              this.setState({errors: true, loading: false })
            }
          })
        }
      } else {
        this.setState({errors: true, loading: false })
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  setAddress = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-address-input');
    input_elem.value === '' ? this.setState({address: undefined}) : this.setState({address: input_elem.value})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-city-input');
    input_elem.value === '' ? this.setState({city: undefined}) : this.setState({city: input_elem.value})
  }

  setCustomerState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-state-input');
    input_elem.value === '' ? this.setState({state: undefined}) : this.setState({state: input_elem.value})
  }

  setDonateAmount = (e) => {
    let input_elem_number
    e.preventDefault()

    input_elem_number = parseInt(document.getElementById('donate-amount-input').value, 10);

    (isNaN(input_elem_number) || input_elem_number > 20000 || input_elem_number < 1)
    ?
    this.setState({donate_amount: 0})
    :
    this.setState({donate_amount: input_elem_number})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  setZipcode = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-zipcode-input');
    input_elem.value === '' ? this.setState({zipcode: undefined}) : this.setState({zipcode: input_elem.value})
  }

  submit = async (e) => {
    let token_id
    e.preventDefault()

    this.setState({loading: true})

    token_id = await this.createStripeToken()

    console.log(token_id)

    createCustomerCard(this.cancelToken, token_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        createCharge(this.cancelToken, this.props.amount, response.data.data.createStripeCustomerCard.id, this.props.description).then(response => {
          if(response.status === 200 && !response.data.errors) {
            this.setState({successfully_charged: true, loading: false})
          } else {
            this.setState({errors: true, loading: false })
          }
        })
      } else {
        this.setState({errors: true, loading: false })
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_charged && !this.state.errors &&
          <div className="checkout">
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="cc-first-name-input"
                      type="text"
                      placeholder="First name"
                      maxLength="50"
                      onKeyUp={this.setFirstName}
                      onBlur={this.blurFirstName}
                      isInvalid={this.state.firstname_touched && (!this.state.firstname || this.state.firstname === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a first name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>Last name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="cc-last-name-input"
                      type="text"
                      placeholder="Last name"
                      maxLength="50"
                      onKeyUp={this.setLastName}
                      onBlur={this.blurLastName}
                      isInvalid={this.state.lastname_touched && (!this.state.lastname || this.state.lastname === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a last name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  {/* <Form.Group>
                    <Form.Control
                      className="form-control"
                      id="cc-country-input"
                      type="text"
                      placeholder="Country"
                      maxLength="50"
                      onKeyUp={this.setCountry}
                      onBlur={this.blurCountry}
                      isInvalid={this.state.country_touched && (!this.state.country || this.state.country === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter country.
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  <CountryDropdown setCountry={(country_code) => this.setState({country: country_code})} />
                </Col>
                {this.state.country === 'US' &&
                  <React.Fragment>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Control
                          className="form-control"
                          id="cc-address-input"
                          type="text"
                          placeholder="Address"
                          maxLength="50"
                          onKeyUp={this.setAddress}
                          onBlur={this.blurAddress}
                          isInvalid={this.state.address_touched && (!this.state.address || this.state.address === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide an address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        {/* <Form.Label>City</Form.Label> */}
                        <Form.Control
                          className="form-control"
                          id="cc-city-input"
                          type="text"
                          placeholder="City"
                          maxLength="50"
                          onKeyUp={this.setCity}
                          onBlur={this.blurCity}
                          isInvalid={this.state.city_touched && (!this.state.city || this.state.city === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        {/* <Form.Label>State</Form.Label> */}
                        <Form.Control
                          className="form-control"
                          id="cc-state-input"
                          type="text"
                          placeholder="State"
                          maxLength="50"
                          onKeyUp={this.setCustomerState}
                          onBlur={this.blurCustomerState}
                          isInvalid={this.state.state_touched && (!this.state.state || this.state.state === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        {/* <Form.Label>Zipcode</Form.Label> */}
                        <Form.Control
                          className="form-control"
                          id="cc-zipcode-input"
                          type="text"
                          placeholder="Zipcode"
                          maxLength="50"
                          onKeyUp={this.setZipcode}
                          onBlur={this.blurZipcode}
                          isInvalid={this.state.zipcode_touched && (!this.state.zipcode || this.state.zipcode === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a zipcode.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </React.Fragment>
                }
              </Row>
            </Form>
            <Row>
              {/* <Col><CardElement /></Col> */}
              <Col md={6}><CardNumberElement style={this.style} className="border" /></Col>
              <Col md={3}><CardExpiryElement style={this.style} className="border" /></Col>
              <Col md={3}><CardCVCElement style={this.style} className="border" /></Col>
            </Row>

            <div className="d-flex justify-content-center mt-3 flex-wrap">
              {!this.props.donate && this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_charged && this.state.firstname && this.state.lastname && this.state.address && this.state.state &&this.state.zipcode && this.state.country &&
                <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {!this.props.donate && this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_charged && (!this.state.firstname || !this.state.lastname || !this.state.address || !this.state.state ||!this.state.zipcode || !this.state.country) &&
                <Button style={{marginTop: '1rem'}} disabled>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {!this.props.donate && this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_charged && this.state.firstname && this.state.lastname && this.state.country &&
                <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {!this.props.donate && this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_charged && (!this.state.firstname || !this.state.lastname || !this.state.country) &&
                <Button style={{marginTop: '1rem'}} disabled>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {this.props.donate && !this.state.errors && !this.state.successfully_charged &&
                <React.Fragment>
                  {/* <div className="d-flex justify-content-center flex-wrap mt-3"> */}
                    <Form.Control
                      id="donate-amount-input"
                      className="w-100 mb-3"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Donation amount"
                      onKeyUp={this.setDonateAmount}
                      onBlur={this.blurDonateAmount}
                      isInvalid={this.state.donate_amount_touched && (!this.state.donate_amount || this.state.donate_amount === 0)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid amount.
                    </Form.Control.Feedback>
                  {/* </div> */}
                  {/* <div className="d-flex justify-content-center flex-wrap mt-3"> */}
                    <Button className="m-3" variant="outline-primary" onClick={(e) => this.handleDonation(e)}>Donate ${(this.state.donate_amount).toFixed(2)}</Button>
                    <DonationFrequencyDropdown setFrequency={(frequency) => {this.setState({frequency: frequency})}} />
                  {/* </div> */}
                </React.Fragment>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_charged &&
          <div className="d-flex justify-content-center">
            <p>Error during charge.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Payment Processing</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_charged &&
          <div className="d-flex justify-content-center">
            <p>Charge Successful!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default injectStripe(ChargeNewCard)