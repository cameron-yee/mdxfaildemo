import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'

import verifyCustomerBank from '../../../../queries/bscsapi/stripe/verify-customer-bank'

import retrieveStripeCustomerBank from '../../../../queries/bscsapi/stripe/retrieve-stripe-customer-bank'

/* VerifyBank functions
*
* constructor(props) {...}
* componentDidMount() {...}
* componentWillUnmount() {...}
* checkBankStatus = async () => {...}
* verify = async (e) => {...}
* render() {...}
*
*/

const VerifyBank = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,

      deposit_one_amount: undefined,
      deposit_one_amount_touched: false,
      deposit_two_amount: undefined,
      deposit_two_amount_touched: false,

      loading: false,
      errors: false,
      successfullyVerified: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  componentDidMount() {
    this.checkBankStatus()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  checkBankStatus = async () => {
    let status

    this.setState({ loading: true })

    await retrieveStripeCustomerBank(this.cancelToken, this.props.bank_id).then(response => {
      if(response && !response.data.errors) {
        status = response.data.data.retrieveStripeCustomerBank.status
      }
    })

    if(status === 'verified') {
      this.setState({loading: false, successfullyVerified: true })
    } else if(status === 'verification_failed' || status === 'errored') {
      this.setState({errors: true, loading: false, successfullyVerified: false })
    } else {
      this.setState({loading: false})
    }
  }

  verify = async (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    verifyCustomerBank(this.cancelToken, this.props.bank_id, (this.state.deposit_one_amount).toString(), (this.state.deposit_two_amount).toString()).then(response => {
      if(response.status === 200 && !response.data.errors) {
        if(response.data.data.verifyStripeCustomerBank.status === 'verified') {
          this.setState({errors: false, loading: false, successfullyVerified: true })
          // this.props.setVerified(true)
        } else {
          this.setState({errors: false, loading: false, successfullyVerified: false })
          // this.props.setVerified(false)
        }
      } else {
        this.setState({errors: true, loading: false, successfullyVerified: false })
        console.log(response)
      }
    }).catch(error => {
      axios.isCancel(error) ? console.log(`Request canceled: ${error}`) : console.log(error)
    })
  }

  setDepositOneAmount = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('verify-deposit-one-amount-input');
    input_elem.value === '' ? this.setState({deposit_one_amount: undefined}) : this.setState({deposit_one_amount: input_elem.value})
  }

  blurDepositOneAmount = (e) => {
    e.preventDefault()
    this.setState({deposit_one_amount_touched: true})
  }

  setDepositTwoAmount = (e) => {
    e.preventDefault()
    let input_elem = document.getElementById('verify-deposit-two-amount-input');
    input_elem.value === '' ? this.setState({deposit_two_amount: undefined}) : this.setState({deposit_two_amount: input_elem.value})
  }

  blurDepositTowAmount = (e) => {
    e.preventDefault()
    this.setState({deposit_two_amount_touched: true})
  }


  render() {
    return (
      <React.Fragment>
        {!this.state.loading && !this.state.successfullyVerified && !this.state.errors &&
          <div className="checkout">
            <Form>
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="verify-deposit-one-amount-input"
                      type="number"
                      placeholder="Deposit One Amount"
                      step="1"
                      min="01"
                      max="99"
                      onKeyUp={this.setDepositOneAmount}
                      onBlur={this.blurDepositOneAmount}
                      isInvalid={this.state.deposit_one_amount_touched && (!this.state.deposit_one_amount || this.state.deposit_one_amount === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the amount for the first micro deposit.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      className="form-control"
                      id="verify-deposit-two-amount-input"
                      type="number"
                      step="1"
                      min="01"
                      max="99"
                      placeholder="Deposit Two Amount"
                      onKeyUp={this.setDepositTwoAmount}
                      onBlur={this.blurDepositTwoAmount}
                      isInvalid={this.state.deposit_two_amount_touched && (!this.state.deposit_two_amount || this.state.deposit_two_amount === '')}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the amount for the second micro deposit.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="d-flex justify-content-center mt-3">
              {!this.state.loading && !this.state.errors && !this.state.successfullyVerified && this.state.deposit_one_amount && this.state.deposit_two_amount &&
                <Button
                  onClick={(e) => this.verify(e)}
                  style={{marginTop: '1rem'}}
                  variant="outline-primary"
                >
                  Verify Bank Account
                </Button>
              }
              {!this.state.loading && !this.state.errors && !this.state.successfullyVerified && (!this.state.deposit_one_amount || !this.state.deposit_two_amount) &&
                <Button
                  style={{marginTop: '1rem'}}
                  disabled
                  variant="outline-primary"
                >
                  Verify Bank Account
                </Button>
              }
            </div>
          </div>
        }
        {this.state.errors && !this.state.successfullyVerified &&
          <div className="d-flex justify-content-center">
            <p>Error during verification.</p>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Verifying bank info</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {!this.state.errors && this.state.successfullyVerified &&
          <div className="d-flex justify-content-center">
            <p>Bank successfully verified! Your bank account can now be used for payments.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default VerifyBank