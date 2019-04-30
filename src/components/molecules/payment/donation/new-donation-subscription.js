import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'

import createDonationSubscription from '../../../../queries/bscsapi/stripe/create-donation-subscription'

/* NewDonationSubscription functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* submit = (e) => {...}
* render() {...}
*
*/

const NewDonationSubscription = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      successfully_created_donation_subscription: false
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

  submit = (e) => {
    e.preventDefault()
    createDonationSubscription(this.cancelToken, this.props.amount, this.props.source_id).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({successfully_created_donation_subscription: true})
      } else {
        this.setState({errors: true })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.errors && !this.state.successfully_created_donation_subscription &&
          <div className="d-flex justify-content-center flex-wrap mt-3">
            <Button
              variant="outline-primary"
              onClick={(e) => this.submit(e)}
            >
              Donate ${(this.props.amount/100).toFixed(2)} ${this.props.frequency}
            </Button>
          </div>
        }
        {this.state.errors && !this.state.successfully_created_donation_subscription &&
          <p>Error during charge.</p>
        }
        {!this.state.errors && this.state.successfully_created_donation_subscription &&
          <p>Donation Subscription Successful!</p>
        }
      </React.Fragment>
    )
  }
}

export default NewDonationSubscription