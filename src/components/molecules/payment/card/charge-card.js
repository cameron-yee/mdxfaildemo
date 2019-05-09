import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'

import DonationFrequencyDropdown from '../donation/donation-frequency-dropdown'
import DonationSelectFundDropdown from '../donation/donation-select-fund-dropdown'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'
import createDonationSubscription from '../../../../queries/bscsapi/stripe/create-donation-subscription';

/* Charge Card functions
  *
  * constructor(props) {...}
  * componentWillUnmount() {...}
  * blurDonateAmount = (e) => {...}
  * handleCharge = (e) => {...}
  * handleDonation = (e) => {...}
  * setDonateAmount = (e) => {...}
  * render() {...}
  *
*/

const ChargeCard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      donate_amount: 0,
      donate_amount_touched: false,
      frequency: 'Monthly',
      fund_code: 'af',
      loading: false,
      successfully_charged: false
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

  blurDonateAmount = (e) => {
    e.preventDefault()
    this.setState({donate_amount_touched: true})
  }

  handleCharge = (e) => {
    e.preventDefault()

    this.setState({loading: true})

    createCharge(this.cancelToken, this.props.amount, this.props.card_id, this.props.description).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({successfully_charged: true, loading: false})
      } else {
        this.setState({errors: true, loading: false })
      }
    })
  }

  handleDonation = (e) => {
    e.preventDefault()

    this.setState({loading: true})

    if(this.state.frequency === 'Monthly' || this.state.frequency === 'Yearly') {
      createDonationSubscription(
        this.cancelToken,
        this.state.donate_amount,
        this.state.frequency,
        this.state.fund_code,
        this.props.card_id
      ).then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfully_charged: true, loading: false})
        } else {
          this.setState({errors: true, loading: false })
        }
      })
    } else if(this.state.frequency === 'Once') {
      const donation_description = `BSCS Science Learning one time donation for the ${this.state.fund}`
      createCharge(this.cancelToken, this.state.donate_amount*100, this.props.card_id, donation_description).then(response => {
        if(response.status === 200 && !response.data.errors) {
          this.setState({successfully_charged: true, loading: false})
        } else {
          this.setState({errors: true, loading: false })
        }
      })
    }
  }

  setDonateAmount = (e) => {
    let input_elem_number
    e.preventDefault()

    input_elem_number = parseInt(document.getElementById('donate-amount-input').value, 10);

    (isNaN(input_elem_number) || input_elem_number > 20000 || input_elem_number < 1)
    ?
    this.setState({donate_amount: 0})
    :
    this.setState({donate_amount: input_elem_number})
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.errors && !this.state.successfully_charged && !this.props.donate &&
          <div className="d-flex justify-content-center flex-wrap mt-3">
            <Button variant="outline-primary" onClick={(e) => this.handleCharge(e)}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
          </div>
        }
        {!this.state.errors && !this.state.successfully_charged && this.props.donate &&
          <React.Fragment>
            <div className="d-flex justify-content-center flex-wrap mt-3">
              <Form.Control
                id="donate-amount-input"
                className="w-100 mb-3"
                type="number"
                step="1"
                min="0"
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
              <Button className="m-3" variant="outline-primary" onClick={(e) => this.handleDonation(e)}>Donate ${(this.state.donate_amount).toFixed(2)}</Button>
              <DonationFrequencyDropdown setFrequency={(frequency) => {this.setState({frequency: frequency})}} />
              <DonationSelectFundDropdown setFund={(fund, fund_code) => this.setState({fund: fund, fund_code: fund_code})} />
            </div>
          </React.Fragment>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Payment Processing</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {this.state.errors && !this.state.successfully_charged &&
          <p>Error during charge.</p>
        }
        {!this.state.errors && this.state.successfully_charged &&
          <p>Charge Successful!</p>
        }
      </React.Fragment>
    )
  }
}

export default ChargeCard