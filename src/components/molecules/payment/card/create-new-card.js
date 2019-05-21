import React, { Component } from 'react'

import axios from 'axios'
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

import CountryDropdown from './country-dropdown'

import createCustomerCard from '../../../../queries/bscsapi/stripe/create-customer-card';

import './charge-new-card.scss'

/* CreateNewCard functions
  *
  * constructor(props) {...}
  * componentWillUnmount() {}
  * blurAddress = (e) => {...}
  * blurCity = (e) => {...}
  * blurCustomerState = (e) => {...}
  * blurFirstName = (e) => {...}
  * blurLastName = (e) => {...}
  * blurZipcode = (e) => {...}
  * createStripeToken = async () => {...}
  * handleCreation = async (e) => {...}
  * setAddress = (e) => {...}
  * setCity = (e) => {...}
  * setCustomerState = (e) => {...}
  * setFirstName = (e) => {...}
  * setLastName = (e) => {...}
  * setZipcode = (e) => {...}
  *
*/

const CreateNewCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: undefined,
      address_touched: false,
      city: undefined,
      city_touched: false,
      country: 'US',
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      state: undefined,
      state_touched: false,
      zipcode: undefined,
      zipcode_touched: false,

      errors: false,
      loading: false,
      successfully_created: false
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

  handleCreation = async (e) => {
    let token_id
    e.preventDefault()

    token_id = await this.createStripeToken()

    this.setState({loading: true})

    createCustomerCard(this.cancelToken, token_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({errors: false, loading: false, successfully_created: true })
      } else {
        this.setState({errors: true, loading: false, successfully_created: false  })
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  setAddress = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-address-input');
    input_elem.value === '' ? this.setState({address: undefined}) : this.setState({address: input_elem.value})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-city-input');
    input_elem.value === '' ? this.setState({city: undefined}) : this.setState({city: input_elem.value})
  }

  setCustomerState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-state-input');
    input_elem.value === '' ? this.setState({state: undefined}) : this.setState({state: input_elem.value})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  setZipcode = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cncc-zipcode-input');
    input_elem.value === '' ? this.setState({zipcode: undefined}) : this.setState({zipcode: input_elem.value})
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_created && !this.state.errors &&
          <div className="checkout">
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="cncc-first-name-input"
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
                      id="cncc-last-name-input"
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
                  <CountryDropdown setCountry={(country_code) => this.setState({country: country_code})} />
                </Col>
                {this.state.country === 'US' &&
                  <React.Fragment>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Control
                          className="form-control"
                          id="cncc-address-input"
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
                          id="cncc-city-input"
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
                          id="cncc-state-input"
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
                          id="cncc-zipcode-input"
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
              {!this.state.loading && !this.state.errors && !this.state.successfully_created && this.state.firstname && this.state.lastname && this.state.address && this.state.state &&this.state.zipcode && this.state.country &&
                <Button onClick={this.handleCreation} style={{marginTop: '1rem'}}>Save new card</Button>
              }
              {!this.state.loading && !this.state.errors && !this.state.successfully_created && (!this.state.firstname || !this.state.lastname || !this.state.address || !this.state.state ||!this.state.zipcode || !this.state.country) &&
                <Button style={{marginTop: '1rem'}} disabled>Save new card</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_created &&
          <div className="d-flex justify-content-center">
            <p>Error saving card.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Saving new card.</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_created &&
          <div className="d-flex justify-content-center">
            <p>New card saved successfully!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default injectStripe(CreateNewCard)