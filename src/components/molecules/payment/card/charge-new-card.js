import React, { Component } from 'react'

import axios from 'axios'
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'

import CountryDropdown from './country-dropdown'
import './charge-new-card.scss'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'
import createCustomerCard from '../../../../queries/bscsapi/stripe/create-customer-card';


const ChargeNewCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      address: undefined,
      address_touched: false,
      city: undefined,
      city_touched: false,
      state: undefined,
      state_touched: false,
      zipcode: undefined,
      zipcode_touched: false,
      country: 'US',
      // country_touched: false,
      //
      loading: false,
      errors: false,
      successfullyCharged: false
    }

    this.cancelToken = axios.CancelToken.source()
    this.style = {
      base: {
        color: "#7c8c8e",
        fontWeight: 400,
        // fontFamily: "Inter UI, Open Sans, Segoe UI, sans-serif",
        fontFamily: "Open Sans, Adobe Blank, sans-serif",
        fontSize: "1.2rem",
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

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
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

  submit = async (e) => {
    e.preventDefault()
    let token_id = await this.createStripeToken()

    this.setState({loading: true})

    console.log(token_id)
    createCustomerCard(this.props.cancelToken, token_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        createCharge(this.props.cancelToken, this.props.amount, response.data.data.createStripeCustomerCard.id, this.props.description).then(response => {
          if(response.status === 200 && !response.data.errors) {
            this.setState({successfullyCharged: true, loading: false})
            console.log(response)
          } else {
            this.setState({errors: true, loading: false })
            console.log(response)
          }
        })
      } else {
        this.setState({errors: true, loading: false })
        console.log(response)
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  setAddress = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-address-input');
    input_elem.value === '' ? this.setState({address: undefined}) : this.setState({address: input_elem.value})
  }

  blurAddress = (e) => {
    e.preventDefault()
    this.setState({address_touched: true})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-city-input');
    input_elem.value === '' ? this.setState({city: undefined}) : this.setState({city: input_elem.value})
  }

  blurCity = (e) => {
    e.preventDefault()
    this.setState({city_touched: true})
  }

  setCustomerState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-state-input');
    input_elem.value === '' ? this.setState({state: undefined}) : this.setState({state: input_elem.value})
  }

  blurState = (e) => {
    e.preventDefault()
    this.setState({state_touched: true})
  }

  setZipcode = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('cc-zipcode-input');
    input_elem.value === '' ? this.setState({zipcode: undefined}) : this.setState({zipcode: input_elem.value})
  }

  blurZipcode = (e) => {
    e.preventDefault()
    this.setState({zipcode_touched: true})
  }

  // setCountry = (e) => {
  //   e.preventDefault()
  //   let input_elem = document.getElementById('cc-country-input');
  //   input_elem.value === '' ? this.setState({country: undefined}) : this.setState({country: input_elem.value})
  // }

  // blurCountry = (e) => {
  //   e.preventDefault()
  //   this.setState({country_touched: true})
  // }

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfullyCharged && !this.state.errors &&
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
              <Col md={3}><CardExpiryElement className="border" /></Col>
              <Col md={3}><CardCVCElement className="border" /></Col>
            </Row>

            <div className="d-flex justify-content-center mt-3">
              {this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfullyCharged && this.state.firstname && this.state.lastname && this.state.address && this.state.state &&this.state.zipcode && this.state.country &&
                <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfullyCharged && (!this.state.firstname || !this.state.lastname || !this.state.address || !this.state.state ||!this.state.zipcode || !this.state.country) &&
                <Button style={{marginTop: '1rem'}} disabled>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfullyCharged && this.state.firstname && this.state.lastname && this.state.country &&
                <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfullyCharged && (!this.state.firstname || !this.state.lastname || !this.state.country) &&
                <Button style={{marginTop: '1rem'}} disabled>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfullyCharged &&
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
        {!this.state.errors && this.state.successfullyCharged &&
          <div className="d-flex justify-content-center">
            <p>Charge Successful!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default injectStripe(ChargeNewCard)