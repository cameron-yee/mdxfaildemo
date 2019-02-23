import React, { Component } from 'react'

import axios from 'axios'
import * as Promise from 'bluebird'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import './join-modal.scss'

Promise.config({
  cancellation: true,
});

const JoinModal= class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      signed_up: false,
      loading: false,
      notificationShow: false
    }
    
    this.cancelToken = axios.CancelToken.source()
    this.getContactId = Promise

    this.token = process.env.CONSTANT_CONTACT_TOKEN //import from .env (define in Netlify dashboard) }
    this.api_key = process.env.CONSTANT_CONTACT_API_KEY
    this.checkIfContactExists = this.checkIfContactExists.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.showNotification = this.showNotification.bind(this)
    this.hideNotification = this.hideNotification.bind(this)
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
      // this.getContactId.cancel()
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

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
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
      this.checkIfContactExists = new Promise((resolve, reject, onCancel) => {
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

      return this.checkIfContactExists
        .catch(error => {
          console.log(error)
        })
    })
    .then(contact_id => {
      console.log(contact_id)
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
          Join Email List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
          You are already enrolled in the email list.
        </Alert>
        <Form onSubmit={(e) => this.checkIfContactExists(e)}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="first-name-input" type="text" placeholder="" onKeyUp={this.setFirstName} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="last-name-input" type="text" placeholder="" onKeyUp={this.setLastName} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="email-list-input" type="email" placeholder="" onKeyUp={this.setEmail} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        { !this.state.loading && this.state.signed_up &&
          <Button variant="success" disabled>Signed up</Button>
        }
        { !this.state.loading && !this.state.signed_up &&
          <Button variant="primary" type="submit">Sign up</Button>
        }
        { this.state.loading &&
          <Button variant="secondary" className="is-loading" />
        }
      </Modal.Footer>
    </Modal>
    )
  }
}

export default JoinModal
