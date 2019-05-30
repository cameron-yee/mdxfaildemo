import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'

import CountryDropdown from './country-dropdown'

import updateCustomerCard from '../../../../queries/bscsapi/stripe/update-customer-card';

import './charge-new-card.scss'

/* UpdateCard functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* blurAddress = (e) => {...}
* blurCity = (e) => {...}
* blurCustomerState = (e) => {...}
* blurExpMonth = (e) => {...}
* blurExpYear = (e) => {...}
* blurFirstName = (e) => {...}
* blurLastName = (e) => {...}
* blurZipcode = (e) => {...}
* setAddress = (e) => {...}
* setCity = (e) => {...}
* setCustomerState = (e) => {...}
* setExpMonth = (e) => {...}
* setExpYear = (e) => {...}
* setFirstName = (e) => {...}
* setLastName = (e) => {...}
* setZipcode = (e) => {...}
* submit = async (e) => {...}
*
*/

const UpdateCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: undefined,
      address_touched: false,
      city: undefined,
      city_touched: false,
      country: 'US',
      exp_month: undefined,
      exp_month_touched: false,
      exp_year: undefined,
      exp_year_touched: false,
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
      successfully_updated: false
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

  blurExpMonth = (e) => {
    e.preventDefault()
    this.setState({exp_month_touched: true})
  }

  blurExpYear = (e) => {
    e.preventDefault()
    this.setState({exp_year_touched: true})
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

  setAddress = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-address-input');
    input_elem.value === '' ? this.setState({address: undefined}) : this.setState({address: input_elem.value})
  }

  setCity = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-city-input');
    input_elem.value === '' ? this.setState({city: undefined}) : this.setState({city: input_elem.value})
  }

  setCustomerState = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-state-input');
    input_elem.value === '' ? this.setState({state: undefined}) : this.setState({state: input_elem.value})
  }

  setExpMonth = (e) => {
    e.preventDefault()
    let input_elem_number = parseInt(document.getElementById('uc-exp-month-input').value, 10);
    (isNaN(input_elem_number) || input_elem_number > 12 || input_elem_number < 1)
    ?
    this.setState({exp_month: undefined})
    :
    this.setState({exp_month: input_elem_number})
  }

  setExpYear = (e) => {
    e.preventDefault()
    let input_elem_number = parseInt(document.getElementById('uc-exp-year-input').value, 10);
    (isNaN(input_elem_number) || input_elem_number < 2019) ? this.setState({exp_year: undefined}) : this.setState({exp_year: input_elem_number})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  setZipcode = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('uc-zipcode-input');
    input_elem.value === '' ? this.setState({zipcode: undefined}) : this.setState({zipcode: input_elem.value})
  }

  submit = async (e) => {
    let name

    e.preventDefault()

    this.setState({loading: true})

    name = this.state.firstname + ' ' + this.state.lastname

    updateCustomerCard(
      this.cancelToken,
      this.props.card_id,
      this.state.city,
      this.state.country,
      this.state.address,
      this.state.state,
      this.state.zipcode,
      this.state.exp_month,
      this.state.exp_year,
      name
    )
      .then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfully_updated: true, loading: false})
          this.props.refreshPaymentMethods()
          console.log(response)
        } else {
          this.setState({errors: true, loading: false })
          console.log(response)
        }
      }).catch(error => {
        axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
      })
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_updated && !this.state.errors &&
          <div className="checkout">
            <p>Refill out card form to update card info.</p>
            <Form>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="uc-first-name-input"
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
                      id="uc-last-name-input"
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
                          id="uc-address-input"
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
                          id="uc-city-input"
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
                          id="uc-state-input"
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
                          id="uc-zipcode-input"
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
                    <Col xs={12} md={6}>
                      <Form.Group>
                        {/* <Form.Label>Zipcode</Form.Label> */}
                        <Form.Control
                          className="form-control"
                          id="uc-exp-month-input"
                          type="text"
                          placeholder="Exp Month"
                          maxLength="50"
                          onKeyUp={this.setExpMonth}
                          onBlur={this.blurExpMonth}
                          isInvalid={this.state.exp_month_touched && (!this.state.exp_month || this.state.exp_month === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid expiration month.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group>
                        {/* <Form.Label>Zipcode</Form.Label> */}
                        <Form.Control
                          className="form-control"
                          id="uc-exp-year-input"
                          type="text"
                          placeholder="Exp Year"
                          maxLength="50"
                          onKeyUp={this.setExpYear}
                          onBlur={this.blurExpYear}
                          isInvalid={this.state.exp_year_touched && (!this.state.exp_year || this.state.exp_year === '')}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide an expiration year. The expiration year cannot before the current year.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </React.Fragment>
                }
              </Row>
            </Form>
            <div className="d-flex justify-content-center mt-3">
              {this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_updated && this.state.firstname && this.state.lastname && this.state.address && this.state.state &&this.state.zipcode && this.state.country &&
                <Button
                  onClick={this.submit}
                  style={{marginTop: '1rem'}}
                  variant="outline-primary"
                >
                  Update Card
                </Button>
              }
              {this.state.country === 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_updated && (!this.state.firstname || !this.state.lastname || !this.state.address || !this.state.state ||!this.state.zipcode || !this.state.country) &&
                <Button
                  style={{marginTop: '1rem'}}
                  disabled
                  variant="outline-primary"
                >
                  Update Card
                </Button>
              }
              {this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_updated && this.state.firstname && this.state.lastname && this.state.country &&
                <Button
                  onClick={this.submit}
                  style={{marginTop: '1rem'}}
                  variant="outline-primary"
                >
                  Update Card
                </Button>
              }
              {this.state.country !== 'US' && !this.state.loading && !this.state.errors && !this.state.successfully_updated && (!this.state.firstname || !this.state.lastname || !this.state.country) &&
                <Button
                  style={{marginTop: '1rem'}}
                  disabled
                  variant="outline-primary"
                >
                  Update Card
                </Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_updated &&
          <div className="d-flex justify-content-center">
            <p>Error during update.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Updating</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_updated &&
          <div className="d-flex justify-content-center">
            <p>Card updated!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default UpdateCard
