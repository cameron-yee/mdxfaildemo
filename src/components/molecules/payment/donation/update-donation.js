import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import DonationFrequencyDropdown from './donation-frequency-dropdown'
import DonationSelectFundDropdown from './donation-select-fund-dropdown'

import updateCustomerDonationSubscription from '../../../../queries/bscsapi/stripe/update-customer-donation-subscription';

// import './charge-new-card.scss'

/* UpdateDonation functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* blurAddress = (e) => {...}
* blurCity = (e) => {...}
* blurCustomerState = (e) => {...}
* blurExpMonth = (e) => {...}
* blurExpYear = (e) => {...}
* blurFirstName = (e) => {...}
* blurLastName = (e) => {...}
* blurZipcode = (e) => {...}
* setAddress = (e) => {...}
* setCity = (e) => {...}
* setCustomerState = (e) => {...}
* setExpMonth = (e) => {...}
* setExpYear = (e) => {...}
* setFirstName = (e) => {...}
* setLastName = (e) => {...}
* setZipcode = (e) => {...}
* submit = async (e) => {...}
*
*/

const UpdateDonation = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donate_amount: 1,
      donate_amount_touched: false,
      frequency: 'Monthly',
      fund_code: 'af',

      errors: false,
      loading: false,
      successfully_updated: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  blurDonateAmount = (e) => {
    e.preventDefault()
    this.setState({donate_amount_touched: true})
  }

  setDonateAmount = (e) => {
    let input_elem_number
    e.preventDefault()

    input_elem_number = parseInt(document.getElementById('ud-donate-amount-input').value, 10);

    (isNaN(input_elem_number) || input_elem_number > 20000 || input_elem_number < 1)
    ?
    this.setState({donate_amount: 0})
    :
    this.setState({donate_amount: input_elem_number})
  }

  submit = async (e) => {
    e.preventDefault()

    this.setState({loading: true})

    updateCustomerDonationSubscription(
      this.cancelToken,
      this.state.donate_amount,
      `${this.state.frequency.toLowerCase()}-donation-${this.state.fund_code}`,
      // this.state.fund,
      this.props.source_id,
      this.props.donation_id
    )
      .then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfully_updated: true, loading: false})
          console.log(response)
        } else {
          this.setState({errors: true, loading: false })
          console.log(response)
        }
      }).catch(error => {
        axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
      })
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfully_updated && !this.state.errors &&
          <div className="checkout">
            <p>Update donation info</p>
            <Form>
              {!this.state.errors && !this.state.successfully_charged &&
                <React.Fragment>
                  <div className="d-flex justify-content-center flex-wrap mt-3">
                    <Form.Control
                      id="ud-donate-amount-input"
                      className="w-100 mb-3"
                      type="number"
                      step="1"
                      min="1"
                      placeholder="Donation amount"
                      onKeyUp={this.setDonateAmount}
                      onBlur={this.blurDonateAmount}
                      isInvalid={this.state.donate_amount_touched && (!this.state.donate_amount || this.state.donate_amount === 0)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid amount.
                    </Form.Control.Feedback>
                  </div>
                  <p>Choose from one of three funds to support:</p>
                  <ul>
                    <li><strong>Annual Fund:</strong> supports current priorities and the mission of BSCS</li>
                    <li><strong>Endowment Fund:</strong> provides BSCS with a stable source of income to sustain key programs over the long-term</li>
                    <li><strong>Susan Loucks-Horsley Memorial Fund:</strong> supports staff development for BSCS employees as a tribute to the memory of Susan Loucks-Horsley</li>
                  </ul>
                  <div className="d-flex justify-content-center flex-wrap mt-3">
                    <DonationFrequencyDropdown setFrequency={(frequency) => {this.setState({frequency: frequency})}} only_recurring={true} />
                    <DonationSelectFundDropdown setFund={(fund, fund_code) => this.setState({fund_code: fund_code})} />
                  </div>
                </React.Fragment>
              }
            </Form>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfully_updated && this.state.donate_amount &&
                <Button
                  onClick={this.submit}
                  style={{marginTop: '1rem'}}
                  variant="outline-primary"
                >
                  Update Donation
                </Button>
              }
              {!this.state.loading && !this.state.errors && !this.state.successfully_updated && !this.state.donate_amount &&
                <Button
                  style={{marginTop: '1rem'}}
                  disabled
                  variant="outline-primary"
                >
                  Update Donation
                </Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfully_updated &&
          <div className="d-flex justify-content-center">
            <p>Error during update.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Updating</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfully_updated &&
          <div className="d-flex justify-content-center">
            <p>Donation updated!</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default UpdateDonation
