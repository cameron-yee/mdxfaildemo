import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import deleteCustomerDonationSubscription from '../../../../queries/bscsapi/stripe/delete-customer-donation-subscription'

// import './charge-new-card.scss'

/* DeleteDonation functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* handleDelete = async (e) => {...}
* render() {...}
*
*/

const DeleteDonation = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      loading: false,
      successfully_deleted: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  handleDelete = async (e) => {
    e.preventDefault()

    this.setState({loading: true})

    deleteCustomerDonationSubscription(
      this.cancelToken,
      this.props.donation_id,
    )
      .then(response => {
        if(
          response.status === 200 &&
          !response.data.errors &&
          response.data.data.deleteStripeCustomerDonationSubscription.status === 'canceled'
        ) {
          this.setState({successfully_deleted: true, loading: false})
          this.props.refreshDonations()
        } else {
          this.setState({errors: true, loading: false })
        }
      }).catch(error => {
        axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
      })
}

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_deleted && !this.state.errors &&
          <div className="checkout">
            <p>Are you sure you want to cancel this donation?</p>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfully_deleted &&
                <Button variant="danger" onClick={(e) => this.handleDelete(e)} style={{marginTop: '1rem'}}>Cancel Donation</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_deleted &&
          <div className="d-flex justify-content-center">
            <p>Error. Donation could not be canceled.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Canceling Donation</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_deleted &&
          <div className="d-flex justify-content-center">
            <p>Donation successfully cancelled.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default DeleteDonation
