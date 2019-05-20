import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import createAndPayOrder from '../../../../queries/bscsapi/stripe/create-and-pay-order'

/* ChargeAndPayOrder functions
  *
  * constructor(props) {...}
  * componentWillUnmount() {...}
  * handleCharge = (e) => {...}
  * render() {...}
  *
*/

const CreateAndPayOrder = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
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

  handleCharge = (e) => {
    e.preventDefault()

    this.setState({loading: true})

    createAndPayOrder(this.cancelToken, this.props.source_id, this.props.sku, this.props.metadata).then(response => {
      if(response.status === 200 && !response.data.errors && response.data.data.createAndPayStripeCustomerOrder.charge) {
        this.setState({successfully_charged: true, loading: false})
      } else {
        this.setState({errors: true, loading: false })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.errors && !this.state.successfully_charged &&
          <div className="d-flex justify-content-center flex-wrap mt-3">
            <p className="w-100">Order amount: ${(this.props.price/100).toFixed(2)}</p>
            <Button variant="outline-primary" onClick={(e) => this.handleCharge(e)}>Place Order</Button>
          </div>
        }
        {this.state.loading &&
          <div className="d-flex justify-content-center">
            <p>Order Placement Processing</p>
            <Spinner animation="grow" variant="primary" />
          </div>
        }
        {this.state.errors && !this.state.successfully_charged &&
          <p>Error during order.</p>
        }
        {!this.state.errors && this.state.successfully_charged &&
          <p>Order placed successfully!</p>
        }
      </React.Fragment>
    )
  }
}

export default CreateAndPayOrder