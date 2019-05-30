import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

const SpecificContactFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      email_touched: false,
      firstname: undefined,
      firstname_touched: false,
      lastname: undefined,
      lastname_touched: false,
      phone: undefined,
      phone_touched: false,
      message: undefined,
      message_touched: false,
      loading: false,
      notificationShow: false,
      sent: false,
      showErrorNotification: false,
      errors: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }

  showNotification = () => {
    this.setState({notificationShow: true})
  }

  hideNotification = () => {
    this.setState({notificationShow: false})
  }

  showErrorNotification = () => {
    this.setState({showErrorNotification: true})
  }

  hideErrorNotification = () => {
    this.setState({showErrorNotification: false})
  }

  setEmail = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-email-input');

    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  setPhone = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-phone-input');
    (((/[A-Za-z~!#@$%^&*{}|?<>`=\s]+/.test(input_elem.value) === true) //None of these characters are in the phone #
    ||
    (/\d{2,}/.test(input_elem.value) === false) //There are at least 2 digits in a row at some point
    ||
    // eslint-disable-next-line
    (/^[^-][\d\(\)\-\+]{7,}[^-+]$/.test(input_elem.value) === false)) //The input is at least 7 characters long. Can't start with '-', can't end with '-' or '+'
    &&
    (input_elem.value !== (undefined || ''))) //Phone # may be omitted
    ?
    this.setState({phone: 'errors'})
    :
    this.setState({phone: input_elem.value})
  }

  blurPhone = (e) => {
    e.preventDefault()
    this.setState({phone_touched: true})
  }

  setMessage = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('sc-message-input');
    input_elem.value === '' ? this.setState({message: undefined}) : this.setState({message: input_elem.value})
  }

  blurMessage = (e) => {
    e.preventDefault()
    this.setState({message_touched: true})
  }

  postSpecificForm = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    let page
    try {
      page = window.location.href
    } catch(err) {
      console.log(err)
    }

    let data = {"email": this.state.email, "firstname": this.state.firstname, "lastname": this.state.lastname, "phone": this.state.phone, "message": this.state.message, "sendto": this.props.sendto, "page": page}

    if(this.props.infoat) {
      data["infoat"] = this.props.infoat === "true"
    }

    if(this.props.forgot_password) {
      data["message"] = `Forgot password. New password: ${this.state.message}`
    }

    console.log(data)
    axios({
      // url: 'http://127.0.0.1:8888/post-specific-form',
      url: 'https://pymail.bscs.org/post-specific-form',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
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

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="specific-contact-form-modal"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="specific-contact-form-modal">
          {/* Contact: {this.props.sendto} */}
          Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form onSubmit={(e) => this.postSpecificForm(e)}> */}
        {this.props.forgot_password &&
          <p>Fill out this form with the password that you want for your account and we'll reset it for you.  You will receive an email once your password is reset.</p>
        }
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.props.sendto}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> First name</Form.Label>
                <Form.Control
                  id="sc-first-name-input"
                  type="text"
                  placeholder=""
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
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> Last name</Form.Label>
                <Form.Control
                  id="sc-last-name-input"
                  type="text"
                  placeholder=""
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
                <Form.Label><span style={{color: 'red'}}>*</span> Email</Form.Label>
                <Form.Control
                  id="sc-email-input"
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
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  id="sc-phone-input"
                  type="text"
                  placeholder=""
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
            <Col xs={12}>
              <Form.Group>
                <Form.Label><span style={{color: 'red'}}>*</span> Message</Form.Label>
                <Form.Control
                  as="textarea"
                  id="sc-message-input"
                  placeholder=""
                  maxLength="2000"
                  onKeyUp={this.setMessage}
                  onBlur={this.blurMessage}
                  isInvalid={this.state.message_touched && (!this.state.message || this.state.message === '')}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a message.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* {this.props.allowfiles &&
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Upload Files</Form.Label>
                  <Form.Control
                    id="sc-file-input"
                    type="file"
                    multiple={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a message.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            } */}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col xs={12}>
              <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
                Your message has been sent to {this.props.sendto}.
              </Alert>
              <Alert show={this.state.showErrorNotification} onClose={this.hideErrorNotification} dismissible variant="danger">
                We are having problems with our servers right now.  Please try again later.  Sorry for the inconvenience.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-end">
                { !this.state.errors && !this.state.loading && !this.state.sent
                  && (!this.state.firstname
                  || !this.state.lastname
                  || !this.state.email
                  || this.state.phone === 'errors'
                  || !this.state.message)
                  &&
                  <Button variant="outline-primary" disabled>Contact {this.props.sendto}</Button>
                }
                { !this.state.errors && !this.state.loading && !this.state.sent
                  && this.state.firstname
                  && this.state.lastname
                  && this.state.email
                  && this.state.phone !== 'errors'
                  && this.state.message
                  &&
                  <Button variant="outline-primary" onClick={this.postSpecificForm}>Contact {this.props.sendto}</Button>
                }
                { !this.state.errors && this.state.loading &&
                  <Button variant="outline-success" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Sending...
                  </Button>
                }
                { !this.state.errors && !this.state.loading && this.state.sent &&
                  <Button variant="outline-success" disabled>Message sent to {this.props.sendto}</Button>
                }
                { this.state.errors &&
                  <Button variant="outline-danger" disabled>Error</Button>
                }
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
    )
  }
}

export default SpecificContactFormModal
