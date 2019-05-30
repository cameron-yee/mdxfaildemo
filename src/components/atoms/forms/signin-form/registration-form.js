import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import register from '../../../../queries/bscsapi/register'
import getUserInfo from '../../../../queries/bscsapi/get-user-info';
import updateUserInfo from '../../../../queries/bscsapi/update-user-info';

const RegistrationForm = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      email_touched: false,
      password: undefined,
      password_touched: undefined,
      firstname: null,
      // firstname_touched: false,
      lastname: null,
      // lastname_touched: false,
      phone: null,
      phone_touched: false,
      address: null,
      // address_touched: false,
      city: null,
      // city_touched: false,
      state: null,
      // state_touched: false,
      zipcode: null,
      // zipcode_touched: false,

      loading: false,
      notificationShow: false,
      sent: false,
      showErrorNotification: false,
      errors: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    if(this.props.update) {
      this.setUserAccountInfo()
    }
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }
//End lifecycle hooks

//Custom functions
  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  blurPhone = (e) => {
    e.preventDefault()
    this.setState({phone_touched: true})
  }

  handleRegister = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    register(
      this.cancelToken,
      this.state.address,
      this.state.city,
      this.state.email,
      this.state.firstname,
      this.state.lastname,
      this.state.password,
      this.state.phone,
      this.state.state,
      this.state.zipcode
    )
      .then(response => {
        console.log(response);
        if(response.status === 200 && !response.data.errors) {
            this.setState({notificationShow: true, loading: false, sent: true});
            this.props.setSignedIn()
        }
      })
      .catch(error => {
        if(axios.isCancel(error)) {
          console.log(`Request canceled: ${error}`);
          this.setState({errors: true, showErrorNotification: true});
        } else {
          console.log(error);
          this.setState({errors: true, showErrorNotification: true});
        }
      })
  }

  handleUpdate = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    updateUserInfo(
      this.cancelToken,
      this.state.address,
      this.state.city,
      this.state.email,
      this.state.firstname,
      this.state.lastname,
      this.state.password,
      this.state.phone,
      this.state.state,
      this.state.zipcode
    )
      .then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({notificationShow: true, loading: false, sent: true});
        }
      })
      .catch(error => {
        if(axios.isCancel(error)) {
          console.log(`Request canceled: ${error}`);
          this.setState({errors: true, showErrorNotification: true});
        } else {
          console.log(error);
          this.setState({errors: true, showErrorNotification: true});
        }
      })

  }

  hideErrorNotification = () => {
    this.setState({showErrorNotification: false})
  }

  hideNotification = () => {
    this.setState({notificationShow: false})
  }

  showErrorNotification = () => {
    this.setState({showErrorNotification: true})
  }

  showNotification = () => {
    this.setState({notificationShow: true})
  }

  setAddress = (e=null, address=null) => {
    let input_elem = document.getElementById('rf-address-input');

    if(e && !address) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({address: null}) : this.setState({address: `"${input_elem.value}"`})
    } else {
      input_elem.value = address
      this.setState({address: `"${address}"`})
      // this.setState(prevState => {
      //   if(prevState.all_set < 7) {
      //     return {address: `"${address}"`, all_set: prevState.all_set + 1}
      //   } else {
      //     return {address: `"${address}"`}
      //   }
      // })
    }
  }

  setCity = (e=null, city=null) => {
    let input_elem = document.getElementById('rf-city-input');

    if(e && !city) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({city: null}) : this.setState({city: `"${input_elem.value}"`})
    } else {
      input_elem.value = city
      this.setState({city: `"${city}"`})
    }
  }

  setCustomerState = (e=null, state=null) => {
    let input_elem = document.getElementById('rf-state-input');

    if(e && !state) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({state: null}) : this.setState({state: `"${input_elem.value}"`})
    } else {
      input_elem.value = state
      this.setState({state: `"${state}"`})
    }
  }

  setEmail = (e=null, email=null) => {
    let input_elem = document.getElementById('rf-email-input');

    if(e && !email) {
      e.preventDefault();
      /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false
      ?
      this.setState({email: undefined})
      :
      this.setState({email: `"${input_elem.value}"`})
    } else {
      input_elem.value = email
      this.setState({email: `"${email}"`})
    }
  }

  setFirstName = (e=null, firstname=null) => {
    let input_elem = document.getElementById('rf-first-name-input');

    if(e && !firstname) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({firstname: null}) : this.setState({firstname: `"${input_elem.value}"`})
    } else {
      input_elem.value = firstname
      this.setState({firstname: `"${firstname}"`})
    }
  }

  setLastName = (e=null, lastname=null) => {
    let input_elem = document.getElementById('rf-last-name-input');

    if(e && !lastname) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({lastname: null}) : this.setState({lastname: `"${input_elem.value}"`})
    } else {
      input_elem.value = lastname
      this.setState({lastname: `"${lastname}"`})
    }
  }

  setPassword = (e=null, password=null) => {
    let input_elem = document.getElementById('rf-password-input');

    if (e && !password) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({password: null}) : this.setState({password: `"${input_elem.value}"`})
    } else {
      input_elem.value = password
      this.setState({password: `"${password}"`})
    }
  }

  setPhone = (e=null, phone=null) => {
    let input_elem = document.getElementById('rf-phone-input');

    if(e && !phone) {
      console.log(e)
      e.preventDefault();
      if (((/[A-Za-z~!#@$%^&*{}|?<>`=\s]+/.test(input_elem.value) === true) /* None of these characters are in the phone # */
        ||
        (/\d{2,}/.test(input_elem.value) === false) /* There are at least 2 digits in a row at some point */
        ||
        /* eslint-disable-next-line */
        (/^[^-][\d\(\)\-\+]{7,}[^-+]$/.test(input_elem.value) === false)) //The input is at least 7 characters long. Can't start with '-', can't end with '-' or '+'
        /* This next line seems wrong to me */
        /* eslint-disable-next-line */
        &&
        (input_elem.value !== (undefined || null || ''))) { //Phone # may be omitted
          this.setState({phone: 'errors'})
      } else {
        this.setState({phone: `"${input_elem.value}"`})
      }
    } else {
      input_elem.value = phone
      this.setState({phone: `"${phone}"`})
    }
  }

  setUserAccountInfo = () => {
    this.setState({account_loading: true})

    getUserInfo(this.cancelToken)
      .then(response => {
        if(response && !response.data.data.errors) {
          this.setAddress(null, response.data.data.me.address1)
          this.setCity(null, response.data.data.me.city)
          this.setCustomerState(null, response.data.data.me.state)
          // this.setEmail(null, response.data.data.me.email)
          this.setFirstName(null, response.data.data.me.firstName)
          this.setLastName(null, response.data.data.me.lastName)
          // this.setPassword(null, '')
          this.setPhone(null, response.data.data.me.phoneNumber)
          this.setZipcode(null, response.data.data.me.zipCode)
        }
      })
  }

  setZipcode = (e=null, zipcode=null) => {
    let input_elem = document.getElementById('rf-zipcode-input');

    if(e && !zipcode) {
      e.preventDefault()
      input_elem.value === '' ? this.setState({zipcode: null}) : this.setState({zipcode: `"${input_elem.value}"`})
    } else {
      input_elem.value = zipcode
      this.setState({zipcode: `"${zipcode}"`})
    }
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> Email</Form.Label>
                <Form.Control
                  className="form-control"
                  id="rf-email-input"
                  type="email"
                  placeholder=""
                  onKeyUp={this.setEmail}
                  onBlur={this.blurEmail}
                  isInvalid={this.state.email_touched && (!this.state.email || this.state.email === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                {!this.props.update &&
                  <Form.Label><span style={{color: 'red'}}>*</span> Password</Form.Label>
                }
                {this.props.update &&
                  <Form.Label><span style={{color: 'red'}}>*</span> Password (Re-enter password for no change)</Form.Label>
                }
                <Form.Control
                  className="form-control"
                  id="rf-password-input"
                  type="password"
                  placeholder=""
                  maxLength="50"
                  onKeyUp={this.setPassword}
                  onBlur={this.blurPassword}
                  isInvalid={this.state.password_touched && (!this.state.password || this.state.password === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Control
                  className="form-control"
                  id="rf-first-name-input"
                  type="text"
                  placeholder="First name"
                  maxLength="50"
                  onKeyUp={this.setFirstName}
                  onBlur={this.blurFirstName}
                  // isInvalid={this.state.firstname_touched && (!this.state.firstname || this.state.firstname === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Control
                  className="form-control"
                  id="rf-last-name-input"
                  type="text"
                  placeholder="Last Name"
                  maxLength="50"
                  onKeyUp={this.setLastName}
                  onBlur={this.blurLastName}
                  // isInvalid={this.state.lastname_touched && (!this.state.lastname || this.state.lastname === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Control
                  className="form-control"
                  id="rf-address-input"
                  type="text"
                  placeholder="Address"
                  maxLength="50"
                  onKeyUp={this.setAddress}
                  onBlur={this.blurAddress}
                  // isInvalid={this.state.address_touched && (!this.state.address || this.state.address === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide an address.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                {/* <Form.Label>City</Form.Label> */}
                <Form.Control
                  className="form-control"
                  id="rf-city-input"
                  type="text"
                  placeholder="City"
                  maxLength="50"
                  onKeyUp={this.setCity}
                  onBlur={this.blurCity}
                  // isInvalid={this.state.city_touched && (!this.state.city || this.state.city === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a city.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group>
                {/* <Form.Label>State</Form.Label> */}
                <Form.Control
                  className="form-control"
                  id="rf-state-input"
                  type="text"
                  placeholder="State"
                  maxLength="50"
                  onKeyUp={this.setCustomerState}
                  onBlur={this.blurCustomerState}
                  // isInvalid={this.state.state_touched && (!this.state.state || this.state.state === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a state.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group>
                {/* <Form.Label>Zipcode</Form.Label> */}
                <Form.Control
                  className="form-control"
                  id="rf-zipcode-input"
                  type="text"
                  placeholder="Zipcode"
                  maxLength="50"
                  onKeyUp={this.setZipcode}
                  onBlur={this.blurZipcode}
                  // isInvalid={this.state.zipcode_touched && (!this.state.zipcode || this.state.zipcode === '')}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a zipcode.
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group>
                {/* <Form.Label>Phone number</Form.Label> */}
                <Form.Control
                  className="form-control"
                  id="rf-phone-input"
                  type="text"
                  placeholder="Phone Number"
                  maxLength="20"
                  onKeyUp={this.setPhone}
                  onBlur={this.blurPhone}
                  isInvalid={this.state.phone_touched && this.state.phone === 'errors'}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Container>
          <Row>
            <Col xs={12}>
              {!this.props.update &&
                <React.Fragment>
                  <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
                    Registered!
                  </Alert>
                  <Alert show={this.state.showErrorNotification} onClose={this.hideErrorNotification} dismissible variant="danger">
                    Unable to register.
                  </Alert>
                </React.Fragment>
              }
              {this.props.update &&
                <React.Fragment>
                  <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
                    Saved!
                  </Alert>
                  <Alert show={this.state.showErrorNotification} onClose={this.hideErrorNotification} dismissible variant="danger">
                    Unable to update user information.
                  </Alert>
                </React.Fragment>
              }
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-end">
                { !this.state.errors && !this.state.loading && !this.state.sent
                  &&
                  (!this.state.email
                  || !this.state.password
                  || this.state.phone === 'errors')
                  &&
                  <div className="d-flex p-2">
                    {/* For non-modal signin or register */}
                    {this.props.register && !this.props.update &&
                      <Button className="m-2" variant="outline-primary" onClick={() => this.props.register(false)}>Sign In</Button>
                    }
                    {!this.props.update &&
                      <Button className="m-2" variant="outline-primary" disabled>Register</Button>
                    }
                    {this.props.update &&
                      <Button className="m-2" variant="outline-primary" disabled>Save</Button>
                    }
                  </div>
                }
                { !this.state.errors && !this.state.loading && !this.state.sent
                  && this.state.email
                  && this.state.password
                  && this.state.phone !== 'errors'
                  &&
                  <div className="d-flex p-2">
                    {/* For non-modal signin or register */}
                    {this.props.register && !this.props.update &&
                      <Button className="m-2" variant="outline-primary" onClick={() => this.props.register(false)}>Sign In</Button>
                    }
                    {!this.props.update &&
                      <Button className="m-2" variant="outline-primary" onClick={(e) => this.handleRegister(e)}>Register</Button>
                    }
                    {this.props.update &&
                      <Button className="m-2" variant="outline-primary" onClick={(e) => this.handleUpdate(e)}>Save</Button>
                    }
                  </div>
                }
                { !this.state.errors && this.state.loading &&
                  <Button variant="outline-success" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    {!this.props.update &&
                      <React.Fragment>Registering...</React.Fragment>
                    }
                    {this.props.update &&
                      <React.Fragment>Saving...</React.Fragment>
                    }
                  </Button>
                }
                { !this.state.errors && !this.state.loading && this.state.sent && !this.props.update &&
                  <Button variant="outline-success" disabled>Registered</Button>
                }
                { !this.state.errors && !this.state.loading && this.state.sent && this.props.update &&
                  <Button variant="outline-success" disabled>Saved</Button>
                }
                { this.state.errors &&
                  <Button variant="outline-danger" disabled>Error</Button>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default RegistrationForm
