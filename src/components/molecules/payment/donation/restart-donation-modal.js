import React, { Component } from 'react'

// import axios from 'axios'

import Modal from 'react-bootstrap/Modal'

import RestartDonation from './restart-donation'
// import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'
// import SelectDonation from './select-donation'
// import SigninForm from '../../../atoms/forms/signin-form/signin-form'
// import Stepper from '../stepper'

import '../stepper.scss'

/* RestartDonationModal functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* next = (e) => {...}
* previous = (e) => {...}
* render() {...}
*
*/

const RestartDonationModal = class extends Component {
  render() {
    return (
      <Modal
        // {...this.props}
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="delete-donation-modal"
      >
        <Modal.Header closeButton style={{background: '#e6e6e6'}}>
          <Modal.Title id="restart-donation-modal-title">
              <span>Restart Donation</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RestartDonation
            donation_id={this.props.donation_id}
            refreshDonations={this.props.refreshDonations}
            />
        </Modal.Body>
      </Modal>
    )
  }
}

export default RestartDonationModal