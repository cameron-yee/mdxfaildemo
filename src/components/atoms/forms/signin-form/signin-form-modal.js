import React, { Component } from 'react'

import axios from 'axios'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import SigninForm from './signin-form'
import RegistrationForm from './registration-form'

const SigninFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      loading: false,
      notificationShow: false,
      register: false,
      sent: false,
      showErrorNotification: false
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
        // {...this.props}
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="signin-form"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="signin-form">
            {!this.state.register &&
              <span>Sign In</span>
            }
            {this.state.register &&
              <span>Register</span>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default SigninFormModal

