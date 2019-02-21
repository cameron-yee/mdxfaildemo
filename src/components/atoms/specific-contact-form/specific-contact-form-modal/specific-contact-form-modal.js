import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'

import './specific-contact-form-modal.scss'

const SpecificContactFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      phone: undefined,
      message: undefined,
      loading: false,
      notificationShow: false,
      sent: false
    }
    
    this.cancelToken = axios.CancelToken.source()

    this.postSpecificForm = this.postSpecificForm.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setPhone = this.setPhone.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.showNotification = this.showNotification.bind(this)
    this.hideNotification = this.hideNotification.bind(this)
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

  setEmail = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('scfm-email-input');
    /[\w]+[@][\w]+[.][\w]+/.test(input_elem.value) === false ? this.setState({email: undefined}) : this.setState({email: input_elem.value})
  }

  setFirstName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('scfm-first-name-input');
    input_elem.value === '' ? this.setState({firstname: undefined}) : this.setState({firstname: input_elem.value})
  }

  setLastName = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('scfm-last-name-input');
    input_elem.value === '' ? this.setState({lastname: undefined}) : this.setState({lastname: input_elem.value})
  }

  setPhone = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('scfm-phone-input');
    console.log(input_elem.value)
    input_elem.value === '' ? this.setState({phone: undefined}) : this.setState({phone: input_elem.value})
  }

  setMessage = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('scfm-message-input');
    input_elem.value === '' ? this.setState({message: undefined}) : this.setState({message: input_elem.value})
  }

  postSpecificForm = (e) => {
    e.preventDefault()
    this.setState({loading: true})

    let data = {"email": this.state.email, "firstname": this.state.firstname, "lastname": this.state.lastname, "phone": this.state.phone, "message": this.state.message, "sendto": this.props.sendto}

    console.log(data)
    axios({
      url: 'http://127.0.0.1:8888/post-specific-form',
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
      aria-labelledby="specific-contact-form-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="specific-contact-form-modal">
          Contact {this.props.sendto}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert show={this.state.notificationShow} onClose={this.hideNotification} dismissible variant="success">
          Your message has been sent to {this.props.sendto}.
        </Alert>
        <Form onSubmit={(e) => this.postSpecificForm(e)}>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="scfm-first-name-input" type="text" placeholder="First Name" onKeyUp={this.setFirstName} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="scfm-last-name-input" type="text" placeholder="Last Name" onKeyUp={this.setLastName} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="scfm-email-input" type="email" placeholder="Email" onKeyUp={this.setEmail} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control id="scfm-phone-input" type="text" placeholder="Phone Number" onKeyUp={this.setPhone} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control id="scfm-message-input" as="textarea" placeholder="Message" onKeyUp={this.setMessage} />
              </Form.Group>
            </Col>
          </Row>
          { !this.state.loading && !this.state.sent && 
            <Button variant="primary" type="submit">Contact {this.props.sendto}</Button>
          }
          { this.state.loading &&
            <Button variant="secondary" className="is-loading" />
          }
          { !this.state.loading && this.state.sent &&
            <Button variant="primary" disabled>Contact {this.props.sendto}</Button>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

export default SpecificContactFormModal

