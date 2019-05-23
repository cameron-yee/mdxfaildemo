import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

/* ShippingForm functions
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

const ShippingForm = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: undefined,
      address_touched: false,
      city: undefined,
      city_touched: false,
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      state: undefined,
      state_touched: false,
      zipcode: undefined,
      zipcode_touched: false,

      // errors: false,
      // loading: false,
      // successfully_created: false
    }

    this.cancelToken = axios.CancelToken.source()
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

  handleForm = (e) => {
    let shipping

    e.preventDefault()

    shipping = {
      name: `"${this.state.firstname + ' ' + this.state.lastname}"`,
      line1: `"${this.state.address}"`,
      city: `"${this.state.city}"`,
      state: `"${this.state.state}"`,
      postalCode: `"${this.state.zipcode}"`
    }

    this.props.setShipping(shipping)

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
              </Row>
            </Form>

            <div className="d-flex justify-content-center mt-3 flex-wrap">
              {this.state.firstname && this.state.lastname && this.state.address && this.state.state &&this.state.zipcode &&
                <Button
                  variant="outline-primary"
                  onClick={(e) => this.handleForm(e)}
                  style={{marginTop: '1rem'}}
                >
                  Ship to this address
                </Button>
              }
              {(!this.state.firstname || !this.state.lastname || !this.state.address || !this.state.state ||!this.state.zipcode) &&
                <Button variant="outline-primary" style={{marginTop: '1rem'}} disabled>Ship to this address</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_created &&
          <div className="d-flex justify-content-center">
            <p>Error setting shipping information.</p>
          </div>
        }
        {/* {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Saving new card.</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        } */}
        {/* {!this.state.errors && this.state.successfully_created &&
          <div className="d-flex justify-content-center">
            <p>New card saved successfully!</p>
          </div>
        } */}
      </React.Fragment>
    )
  }
}

export default ShippingForm
