import React, { Component } from 'react'

import { Elements, StripeProvider } from 'react-stripe-elements'

import Modal from 'react-bootstrap/Modal'

import CreateNewBank from './bank/create-new-bank'
import CreateNewCard from './card/create-new-card'
import DeleteBank from './bank/delete-bank'
import DeleteCard from './card/delete-card'
import UpdateCard from './card/update-card'
import VerifyBank from './bank/verify-bank'

import '../../../global-scss/index.scss'

const ActionModal = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripe: null
    }
  }

  componentDidMount() {
    this.setStripeScript()
  }

  setStripeScript = () => {
    try {
      if('Stripe' in window) {
        // this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')}) //TESTING
        this.setState({stripe: window.Stripe('pk_live_HDeMFcHo2Gc2UM9Plqoku55j')}) //LIVE
      } else {
        setTimeout(this.setStripeScript, 200)
      }
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    if(this.props.source_id && this.props.action) {
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="action-modal"
        >
          <Modal.Header closeButton style={{background: '#e6e6e6'}}>
            <Modal.Title id="action-modal-title">
                { this.props.action === 'update' &&
                  <span>Confirm payment method update</span>
                }
                { this.props.action === 'delete' &&
                  <span>Confirm payment method deletion</span>
                }
                { this.props.action === 'verify' &&
                  <span>Verify Bank</span>
                }
                { this.props.action === 'new-bank' &&
                  <span>Add bank account</span>
                }
                { this.props.action === 'new-card' &&
                  <span>Add payment card</span>
                }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.source_id.includes('card_') && this.props.action === 'update' &&
              <UpdateCard
                card_id={this.props.source_id}
                refreshPaymentMethods={this.props.refreshPaymentMethods}
              />
            }
            {this.props.source_id.includes('card_') && this.props.action === 'delete' &&
              <DeleteCard
                card_id={this.props.source_id}
                refreshPaymentMethods={this.props.refreshPaymentMethods}
              />
            }
            {this.props.source_id.includes('ba_') && this.props.action === 'update' &&
              <p>Bank account info cannot be updated due to the verification process. Please delete the bank account and create a new bank account instead.</p>
            }
            {this.props.source_id.includes('ba_') && this.props.action === 'delete' &&
              <DeleteBank
                bank_id={this.props.source_id}
                refreshPaymentMethods={this.props.refreshPaymentMethods}
              />
            }
            {this.props.source_id.includes('ba_') && this.props.action === 'verify' &&
              <VerifyBank
                bank_id={this.props.source_id}
                refreshPaymentMethods={this.props.refreshPaymentMethods}
              />
            }
            {this.props.source_id.includes('card_') && this.props.action === 'verify' &&
              <p>Please select a bank account to verify.</p>
            }
            {this.props.action === 'new-bank' &&
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewBank
                    refreshPaymentMethods={this.props.refreshPaymentMethods}
                  />
                </Elements>
              </StripeProvider>
            }
            {this.props.action === 'new-card' &&
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CreateNewCard
                    refreshPaymentMethods={this.props.refreshPaymentMethods}
                  />
                </Elements>
              </StripeProvider>
            }
          </Modal.Body>
        </Modal>
      )
    } else {
      return (<></>)
    }
  }
}

export default ActionModal