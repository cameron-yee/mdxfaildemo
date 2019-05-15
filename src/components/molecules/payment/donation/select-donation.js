import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import retrieveStripeCustomerDonationSubscriptions from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer-donation-subscriptions'

/* SelectDonation functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * getUserCards = async () => {
  * getDonationId = () => {...}
  * setDonationId = (e) => {...}
  * render() {...}
  *
*/

const SelectDonation = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donations: undefined,
      donation_selected: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.getUserDonations()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  getUserDonations = async () => {
    let donations

    donations = await retrieveStripeCustomerDonationSubscriptions(this.cancelToken)
    console.log(donations)
    if(donations && donations.data.data.retrieveStripeCustomerDonationSubscriptions !== null) {
      this.setState({donations: donations})
    } else {
      this.setState({donations: null})
    }
  }

  getDonationId = () => {
    let donations

    donations = document.getElementsByName('customer-donations');
    for(let i = 0; i < donations.length; i++) {
      if(donations[i].checked) {
        return donations[i].id
      }
    }
  }

  setDonationId = (e) => {
    let donation_id

    e.preventDefault()

    donation_id = this.getDonationId()
    this.props.setDonationId(donation_id)
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.donations && this.state.donations !== null &&
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {(this.state.donations || this.state.donations === null) &&
          <React.Fragment>
            <Form onSubmit={(e) => this.setDonationId(e)}>
              <Form.Group>
                { this.state.donations !== null &&
                  this.state.donations.data.data.retrieveStripeCustomerDonationSubscriptions.data.map((donation, index) => {
                    let type = /^[^_]+/.exec(donation.default_source)

                    if(type[0] === 'card') {
                      type = 'Card'
                      // last4 = await retrieveStripeCustomerCard(this.cancelToken, donation.default_source)
                    } else {
                      type = 'Bank'
                    }

                    let amount = donation.items.data[0].quantity

                    let next_payment_day = new Date(donation.items.data[0].created * 1000).getDate()
                    let current = new Date()
                    let next_payment_month
                    let next_payment_year
                    if(donation.items.data[0].plan.interval === 'month') {
                      next_payment_month = current.getMonth() + 1
                      next_payment_year = current.getFullYear()
                    } else {
                      next_payment_month = current.getMonth()
                      next_payment_year = current.getFullYear() + 1
                    }

                    if(this.props.selected_donation && this.props.selected_donation === donation.id) {
                      return(
                        <React.Fragment key={`donation-${index}`}>
                          <Form.Check
                            custom
                            type="radio"
                            id={`${donation.id}`}
                            label={`${type} Donation for $${amount}. Next scheduled payment: ${next_payment_month}/${next_payment_day}/${next_payment_year}`}
                            name="customer-donations"
                            defaultChecked
                            onClick={() => this.setState({donation_selected: true})}
                            style={{color: '#637375'}}
                          />
                        </React.Fragment>
                      )
                    } else {
                      return(
                        <React.Fragment key={`donation-${index}`}>
                          <Form.Check
                            custom
                            type="radio"
                            id={`${donation.id}`}
                            label={`${type} Donation for $${amount}. Next scheduled payment: ${next_payment_month}/${next_payment_day}/${next_payment_year}`}
                            name="customer-donations"
                            onClick={() => this.setState({donation_selected: true})}
                            style={{color: '#7c8c8e'}}
                          />
                        </React.Fragment>
                      )

                    }
                  })
                }
                {this.state.donations === null && !this.props.allow_new &&
                  <p>No saved donations.</p>
                }
              </Form.Group>
              {!this.props.delete && this.state.donations && (this.state.donation_selected || this.props.selected_donation) && (this.state.donations.data.data.retrieveStripeCustomerDonationSubscriptions.data.length !== 0 || this.props.allow_new) &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Update this donation.</Button>
                </div>
              }
              {!this.props.delete && this.state.donations && !this.state.donation_selected && !this.props.selected_donation && (this.state.donations.data.data.retrieveStripeCustomerDonationSubscriptions.data.length !== 0 || this.props.allow_new) &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" disabled>Update this donation.</Button>
                </div>
              }
              {this.props.delete && this.state.donations && (this.state.donation_selected || this.props.selected_donation) && this.state.donations.data.data.retrieveStripeCustomerDonationSubscriptions.data.length !== 0 &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Cancel donation</Button>
                </div>
              }
              {this.props.delete && this.state.donations && !this.state.donation_selected && !this.props.selected_donation && (this.state.donations.data.data.retrieveStripeCustomerDonationSubscriptions.data.length !== 0 || this.props.allow_new) &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" disabled>Cancel donation.</Button>
                </div>
              }
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectDonation
