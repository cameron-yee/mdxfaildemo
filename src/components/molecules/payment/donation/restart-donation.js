import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import restartCustomerDonationSubscription from '../../../../queries/bscsapi/stripe/restart-customer-donation-subscription'

/* RestartDonation functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* handleDelete = async (e) => {...}
* render() {...}
*
*/

const RestartDonation = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      loading: false,
      successfully_restarted: false
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

  handleRestart = async (e) => {
    e.preventDefault()

    this.setState({loading: true})

    restartCustomerDonationSubscription(
      this.cancelToken,
      this.props.donation_id,
    )
      .then(response => {
        if(
          response.status === 200 &&
          !response.data.errors &&
          !response.data.data.restartStripeCustomerDonationSubscription.cancel_at_period_end
        ) {
          this.setState({successfully_restarted: true, loading: false})
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
        {!this.state.loading && !this.state.successfully_restarted && !this.state.errors &&
          <div className="checkout">
            <p>Are you sure you want to restart this donation?</p>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfully_restarted &&
                <Button variant="outline-primary" onClick={(e) => this.handleRestart(e)} style={{marginTop: '1rem'}}>Restart Donation</Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_restarted &&
          <div className="d-flex justify-content-center">
            <p>Error. Donation could not be restarted.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Restarting Donation</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_restarted &&
          <div className="d-flex justify-content-center">
            <p>Donation successfully restarted.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default RestartDonation
