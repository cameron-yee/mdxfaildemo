import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'

import DeleteBank from '../../../components/molecules/payment/bank/delete-bank'
import DeleteCard from '../../../components/molecules/payment/card/delete-card'
import UpdateCard from '../../../components/molecules/payment/card/update-card'

import '../../../global-scss/index.scss'

const ActionModal = class extends Component {
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
                <span>Payment method change confirmation</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.source_id.includes('card_') && this.props.action === 'update' &&
              <UpdateCard card_id={this.props.source_id} />
            }
            {this.props.source_id.includes('card_') && this.props.action === 'delete' &&
              <DeleteCard card_id={this.props.source_id} />
            }
            {this.props.source_id.includes('ba_') && this.props.action === 'update' &&
              <p>Bank account info cannot be updated due to the verification process. Please delete the bank account and create a new bank account instead.</p>
            }
            {this.props.source_id.includes('ba_') && this.props.action === 'delete' &&
              <DeleteBank bank_id={this.props.source_id} />
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