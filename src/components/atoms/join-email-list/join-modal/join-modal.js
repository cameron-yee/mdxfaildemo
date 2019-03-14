import React, { Component } from 'react'

import axios from 'axios'
import * as BlueBirdPromise from 'bluebird'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

BlueBirdPromise.config({
  cancellation: true,
});

const JoinModal= class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      firstname_touched: false,
      lastname_touched: false,
      email_touched: false,
      signed_up: false,
      loading: false,
      notificationShow: false
    }
    
    this.cancelToken = axios.CancelToken.source()
    this.getContactId = undefined

    this.token = process.env.CONSTANT_CONTACT_TOKEN //import from .env (define in Netlify dashboard) }
    this.api_key = process.env.CONSTANT_CONTACT_API_KEY
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
      if(this.getContactId) {
        this.getContactId.cancel()
      }
    } catch(error) {
      console.log(error);
    }
  }

  showNotification = () => {
    this.setState({notificationShow: true})
  }

  hideNotification = () => {
    this.setState({notificationShow: false})
  }

  setEmail = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('email-list-input');
    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  blurEmail = (e) => {
    e.preventDefault()
    this.setState({email_touched: true})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  blurFirstName = (e) => {
    e.preventDefault()
    this.setState({firstname_touched: true})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  blurLastName = (e) => {
    e.preventDefault()
    this.setState({lastname_touched: true})
  }

  checkIfContactExists = (e) => {
    e.preventDefault()

    // let submit_button = document.getElementById('submit-button')
    // submit_button.classList.add('is-loading')
    this.setState({ loading: true })

    let data = {"email": this.state.email}

    axios({
      url: 'http://127.0.0.1:8888/check-if-contact-exists',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      this.getContactId = new BlueBirdPromise((resolve, reject, onCancel) => {
        //eslint-disable-next-line
        onCancel(() => {throw "Promise canceled."})
        if(!Array.isArray(response.data.data.results) || !response.data.data.results.length) {
          this.createContact()
          resolve(0)
        } else {
          if(!Array.isArray(response.data.data.results[0].lists) || !response.data.data.results[0].lists.length) {
            resolve(response.data.data.results[0].id)
          } else {
            for(let i = 0; i < response.data.data.results[0].lists.length; i++) {
              if(response.data.data.results[0].lists[i].id === '1613300557') { //Constant Contact email list id number
                // alert('You are already registered on the email list')
                this.showNotification()
                resolve(0)
              } else {
                if(response.data.data.results[0].lists.length - 1 === i) {
                  //Contact exists, but is not in eCommunity
                  resolve(response.data.data.results[0].id)
                }
              }
            }
          }
        } 
      })

      return this.getContactId
        .catch(error => {
          console.log(error)
        })
    })
    .then(contact_id => {
      if(contact_id !== 0) {
        this.addContactToEmailList(contact_id)
      } else {
          this.setState({signed_up: true, loading: false});
      }
    })
    .catch(error => {
      if(axios.isCancel(error)) {
        console.log(`Request canceled: ${error}`);
      } else {
        console.log(error);
      }
    })
  }

  createContact = () => {
    let data = {"email": this.state.email, "firstname": this.state.firstname, "lastname": this.state.lastname}

    axios({
      //Also enrolls them in eCommunity upon contact creation
      url: 'http://127.0.0.1:8888/create-contact',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        // let submit_button = document.getElementById('submit-button')
        // if(submit_button.classList.contains('is-loading')) {
        //   submit_button.classList.remove('is-loading')
          this.setState({signed_up: true, loading: false});
        // }
      }
    })
    .catch(error => {
      if(axios.isCancel(error)) {
        console.log(`Request canceled: ${error}`);
      } else {
        console.log(error);
      }
    })
  }

  addContactToEmailList = (contact_id) => {
    let data = {"email": this.state.email, "contact_id": contact_id}

    axios({
      url: 'http://127.0.0.1:8888/add-contact-to-email-list',
      method: 'post',
      data: data,
      cancelToken: this.cancelToken.token
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        // let submit_button = document.getElementById('submit-button')
        // if(submit_button.classList.contains('is-loading')) {
        //   submit_button.classList.remove('is-loading')
          this.setState({signed_up: true, loading: false});
        // }
      }
    })
    .catch(error => {
      if(axios.isCancel(error)) {
        console.log(`Request canceled: ${error}`);
      } else {
        console.log(error);
      }
    })
  }
  
  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="join-email-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="join-email-modal">
          Join E-mail List
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => this.checkIfContactExists(e)}>
        <Modal.Body>
          <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
            You are already enrolled in the email list.
          </Alert>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="first-name-input"
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
            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="last-name-input"
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
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email-list-input"
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
          </Row>
        </Modal.Body>
        <Modal.Footer>
          { !this.state.loading && this.state.signed_up &&
            <Button variant="outline-success" disabled>Signed up</Button>
          }
          { !this.state.signed_up && (!this.state.firstname || !this.state.lastname || !this.state.email) &&
            <Button variant="outline-primary" disabled>Sign up</Button>
          }
          { !this.state.signed_up && !this.state.loading && !this.state.signed_up && this.state.firstname && this.state.lastname && this.state.email &&
            <Button variant="outline-primary" type="submit">Sign up</Button>
          }
          { this.state.loading &&
            <Button variant="outline-success" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Sign up
            </Button>
          }
        </Modal.Footer>
      </Form>
    </Modal>
    )
  }
}

export default JoinModal
