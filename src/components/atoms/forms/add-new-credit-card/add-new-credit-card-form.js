import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements'

import axios from 'axios'

import './add-new-credit-card-form.scss'


const AddNewCreditCardForm = class extends Component {
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

  submit = async (e) => {
    let { token } = await this.props.stripe.createToken({name: "Name"})

    axios({
      url: "http://127.0.0.1:4000",
      method: "post",
      // headers: {"Content-Type": "text/plain"},
      // body: token.id
      cancelToken: this.cancelToken.token,
      withCredentials: true, //Must include this to send cookies
      data: {
        query: `
          query {
            createStripeCustomerCard(tokenId: "${token.id}") {
              id
            }
          }
          `
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
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
    this.setState({zipcode: true})
  }

  render() {
    if(this.state.complete) {
      return (<p>Purchase complete</p>)
    } else {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
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
                <Form.Group>
                  {/* <Form.Label>Address</Form.Label> */}
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
              <Col xs={12} md={3}>
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
              <Col xs={12} md={3}>
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
            </Row>
          </Form>
          <Row>
            <Col md={6}><CardNumberElement style={this.style} className="border" /></Col>
            <Col md={3}><CardExpiryElement className="border" /></Col>
            <Col md={3}><CardCVCElement className="border" /></Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Button onClick={this.submit} style={{marginTop: '1rem'}}>Pay Now</Button>
          </div>
        </div>
      )
    }
  }
}

export default injectStripe(AddNewCreditCardForm)