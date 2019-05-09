import React, { Component } from 'react'

import axios from 'axios'

import Modal from 'react-bootstrap/Modal'

import RegistrationForm from './registration-form'
import SigninForm from './signin-form'
import Stepper from '../../../molecules/payment/stepper'

const SigninFormModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      loading: false,
      max_stage: 1,
      notificationShow: false,
      register: false,
      sent: false,
      showErrorNotification: false,
      stage: 0
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
        <Stepper
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage})}
          stage={this.state.stage}
          max_stage={this.state.max_stage}
          number_of_steps={2}
          signed_in={this.props.signed_in}
          steps={["Sign in", "Register"]}
          no_checks={true}
          // credit_or_bank={this.state.credit_or_bank}
          // bank_status={this.state.bank_status}
        />
        <Modal.Body>
          {(!this.state.register || this.state.stage === 0) &&
            <SigninForm
              setSignedIn={this.props.setSignedIn}
              register={(state) => this.setState({register: state, stage: 1})}
            />
          }
          {(this.state.register || this.state.stage === 1) &&
            <RegistrationForm
              setSignedIn={this.props.setSignedIn}
              register={(state) => this.setState({register: state, stage: 0})}
            />
          }
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default SigninFormModal

