import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import DeleteDonationSubscription from './delete-donation-subscription'
import RegistrationForm from '../../../atoms/forms/signin-form/registration-form'
import SelectDonation from './select-donation'
import SigninForm from '../../../atoms/forms/signin-form/signin-form'
import Stepper from '../stepper'

import '../stepper.scss'

/* DeleteDonationSubscriptionModal functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* next = (e) => {...}
* previous = (e) => {...}
* render() {...}
*
*/

const DeleteDonationSubscriptionModal = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      donation_id: undefined,
      max_stage: 0,
      register: false,
      stage: 0,
      stripe: null
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }
//End lifecycle hooks

//Custom functions
  // next = (e) => {
  //   e.preventDefault()
  //   let current_stage = this.state.stage
  //   if(current_stage < 2 && this.state.max_stage > current_stage) {
  //     let new_stage = ++current_stage
  //     console.log(new_stage)
  //     this.setState({stage: new_stage})
  //   }
  // }

  // previous = (e) => {
  //   e.preventDefault()
  //   let current_stage = this.state.stage
  //   if(current_stage !== 1) {
  //     let new_stage = --current_stage
  //     this.setState({stage: new_stage})
  //   }
  // }
//End custom functions

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
          max_stage={this.state.max_stage}
          number_of_steps={2}
          setStage={(stage) => this.setState({stage: stage})}
          setMaxStage={(max_stage) => this.setState({max_stage})}
          signed_in={this.props.signed_in}
          stage={this.state.stage}
          steps={["Select Donation", "Cancel Donation"]}
        />
        <Modal.Body>
          {this.state.stage === 0 && !this.props.signed_in && !this.state.register &&
            <SigninForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          {this.state.stage === 0 && !this.props.signed_in && this.state.register &&
            <RegistrationForm setSignedIn={this.props.setSignedIn} register={(state) => this.setState({register: state})} />
          }
          { this.state.stage === 0 && this.props.signed_in &&
            <SelectDonation
              delete={true}
              setDonationId={(donation_id) => this.setState({donation_id: donation_id, stage: 1, max_stage: 1})}
              selected_donation={this.state.donation_id}
            />
          }
          { this.state.stage === 1 && this.props.signed_in &&
            <DeleteDonationSubscription donation_id={this.state.donation_id} />
          }
        </Modal.Body>
        {/* <Modal.Footer>
            {this.state.stage > 0 &&
              <Button variant="outline-primary" onClick={(e) => this.previous(e)}>Previous</Button>
            }
            {this.state.stage < 1 && this.state.max_stage > this.state.stage &&
              <Button variant="outline-primary" onClick={(e) => this.next(e)}>Next</Button>
            }
        </Modal.Footer> */}
      </Modal>
    )
  }
}

export default DeleteDonationSubscriptionModal