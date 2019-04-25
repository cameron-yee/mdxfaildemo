import React, { Component } from 'react'

import axios from 'axios'
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'

import AccountHolderTypeDropdown from './account-holder-type-dropdown'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'
import createCustomerBank from '../../../../queries/bscsapi/stripe/create-customer-bank';


const CreateNewBank = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,

      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      account_holder_type: 'individual',
      routing_number: undefined,
      routing_number_touched: false,
      account_number: undefined,
      account_number_touched: false,
      country: 'US',

      loading: false,
      errors: false,
      successfullyCreated: false
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
    let bank_info, name, token

    name = this.state.firstname + ' ' + this.state.lastname

    bank_info = {
      country: 'US',
      currency: 'usd',
      routing_number: this.state.routing_number,
      account_number: this.state.account_number,
      account_holder_type: this.state.account_holder_type,
      account_holder_name: name
    }

    token = this.props.stripe.createToken('bank_account', bank_info)
    return token
  }

  submit = async (e) => {
    e.preventDefault()
    let token, token_id

    token = await this.createStripeToken()
    console.log(token)
    console.log(token.token.id)
    token_id = token.token.id

    this.setState({loading: true})

    console.log(token_id)
    createCustomerBank(this.cancelToken, token_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({errors: false, loading: false, successfullyCreated: true })
        this.props.setBankId(response.data.data.createStripeCustomerBank.id)
      } else {
        this.setState({errors: true, loading: false, successfullyCreated: false })
        console.log(response)
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('bank-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('bank-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  setRoutingNumber = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('bank-routing-number-input');
    input_elem.value === '' ? this.setState({routing_number: undefined}) : this.setState({routing_number: input_elem.value})
  }

  blurRoutingNumber = (e) => {
    e.preventDefault()
    this.setState({routing_number_touched: true})
  }

  setAccountNumber = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('bank-account-number-input');
    input_elem.value === '' ? this.setState({account_number: undefined}) : this.setState({account_number: input_elem.value})
  }

  blurAccountNumber = (e) => {
    e.preventDefault()
    this.setState({account_number_touched: true})
  }

  setAccountHolderType = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('bank-account-holder-type-input');
    input_elem.value === '' ? this.setState({account_holder_type: undefined}) : this.setState({account_holder_type: input_elem.value})
  }

  blurAccountHolderType = (e) => {
    e.preventDefault()
    this.setState({account_holder_type_touched: true})
  }


  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfullyCreated && !this.state.errors &&
          <div className="checkout">
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="bank-first-name-input"
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
                      id="bank-last-name-input"
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
                <Col xs={12} md={6}>
                  <AccountHolderTypeDropdown setType={(type) => this.setState({account_holder_type: type})} />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>Last name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="bank-routing-number-input"
                      type="text"
                      placeholder="Routing Number"
                      maxLength="50"
                      onKeyUp={this.setRoutingNumber}
                      onBlur={this.blurRoutingNumber}
                      isInvalid={this.state.routing_number_touched && (!this.state.routing_number || this.state.routing_number === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a routing number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>Last name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="bank-account-number-input"
                      type="text"
                      placeholder="Account Number"
                      maxLength="50"
                      onKeyUp={this.setAccountNumber}
                      onBlur={this.blurAccountNumber}
                      isInvalid={this.state.account_number_touched && (!this.state.account_number || this.state.account_number === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide an account number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfullyCreated && this.state.firstname && this.state.lastname && this.state.routing_number && this.state.account_number &&
                <Button onClick={(e) => this.submit(e)} style={{marginTop: '1rem'}}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
              {!this.state.loading && !this.state.errors && !this.state.successfullyCreated && (!this.state.firstname || !this.state.lastname ||  !this.state.routing_number || !this.state.account_number) &&
                <Button style={{marginTop: '1rem'}} disabled>Pay ${(this.props.amount/100).toFixed(2)}</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfullyCreated &&
          <div className="d-flex justify-content-center">
            <p>Error during charge.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Saving bank info</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfullyCreated &&
          <div className="d-flex justify-content-center">
            <p>Bank Save Successful!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default injectStripe(CreateNewBank)