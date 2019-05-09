import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import axios from 'axios'

import retrieveStripeCustomerBanks from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer-banks'
import Spinner from 'react-bootstrap/Spinner'

const SelectBank = class extends Component {
  constructor(props) {
    super(props)
    this.cancelToken = axios.CancelToken.source()
    this.state = {
      banks: null
    }
  }

  componentDidMount() {
    this.getUserBanks()
  }

  getUserBanks = async () => {
    let banks = await retrieveStripeCustomerBanks(this.cancelToken)
    this.setState({banks: banks})
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  // getCardInfo = () => {
  getSelectedBankInfo = () => {
    let banks = document.getElementsByName('customer-banks')
    for(let i = 0; i < banks.length; i++) {
      if(banks[i].checked) {
        return banks[i].id
      }
    }
  }

  // setCardInfo = (e) => {
  setBankInfo = (e) => {
    e.preventDefault()

    let bank = this.getSelectedBankInfo()
    let bank_info = bank.split(',')
    console.log(bank)
    this.props.setBankInfo(bank_info[0], bank_info[1])
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.banks &&
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {this.state.banks &&
          <React.Fragment>
            <Form onSubmit={(e) => this.setBankInfo(e)}>
              <Form.Group>
                {
                  this.state.banks.data.data.retrieveStripeCustomerBanks.data.map((bank, index) => {
                    if(index === 0) {
                      return(
                        <React.Fragment key={`bank-${index}`}>
                          <Form.Check
                            custom
                            type="radio"
                            id={`${bank.id},${bank.status}`}
                            label={`${bank.bank_name}: •••• ${bank.last4}`}
                            defaultChecked
                            name="customer-banks"
                          />
                          {/* <span className="badge badge-pill badge-primary">DEFAULT</span> */}
                        </React.Fragment>
                      )
                    } else {
                      return(
                        <React.Fragment key={`bank-${index}`}>
                          <Form.Check
                            custom
                            type="radio"
                            id={`${bank.id},${bank.status}`}
                            label={`${bank.bank_name}: •••• ${bank.last4}`}
                            name="customer-banks"
                          />
                        </React.Fragment>
                      )
                    }
                  })
                }
                {this.props.allow_new &&
                  <Form.Check
                    custom
                    type="radio"
                    id="new-bank"
                    label="New Bank Account"
                    name="customer-banks"
                  />
                }
              </Form.Group>
              {this.props.delete &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Delete this bank account.</Button>
                </div>
              }
              {!this.props.delete &&
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" type="submit">Use this bank</Button>
                </div>
              }
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
      )
    }
}

export default SelectBank
