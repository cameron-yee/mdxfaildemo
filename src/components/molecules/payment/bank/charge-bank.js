import React, { Component } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'

/* ChargeBank functions
*
* constructor(props) {...}
* componentWillUnmount() {...}
* handleCharge = (e) => {...}
* render() {...}
*
*/

const ChargeBank = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
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
    createCharge(this.cancelToken, this.props.amount, this.props.bank_id, this.props.description).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({successfully_charged: true})
      } else {
        this.setState({errors: true })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.errors && !this.state.successfully_charged &&
          <div className="d-flex justify-content-center flex-wrap mt-3">
            <Button variant="outline-primary" onClick={(e) => this.handleCharge(e)}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
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

export default ChargeBank