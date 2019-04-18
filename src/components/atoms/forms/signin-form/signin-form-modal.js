import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import SigninForm from './signin-form'

const SigninFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: undefined,
      email_touched: false,
      password: undefined,
      password_touched: undefined,

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

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="login-form"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="login-form">
            Sign In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SigninForm />
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default SigninFormModal

