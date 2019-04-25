import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import createCharge from '../../../../queries/bscsapi/stripe/create-charge'


const ChargeBank = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: false,
      successfullyCharged: false
    }
  }

  componentWillUnmount() {
    this.props.cancelAxios()
  }

  handleCharge = (e) => {
    e.preventDefault()
    createCharge(this.props.cancelToken, this.props.amount, this.props.bankId, this.props.description).then(response => {
      if(response.status === 200 && !response.data.errors) {
        this.setState({successfullyCharged: true})
      } else {
        this.setState({errors: true })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.errors && !this.state.successfullyCharged &&
          <div className="d-flex justify-content-center flex-wrap mt-3">
            <Button variant="outline-primary" onClick={(e) => this.handleCharge(e)}>Pay ${(this.props.amount/100).toFixed(2)}</Button>
          </div>
        }
        {this.state.errors && !this.state.successfullyCharged &&
          <p>Error during charge.</p>
        }
        {!this.state.errors && this.state.successfullyCharged &&
          <p>Charge Successful!</p>
        }
      </React.Fragment>
    )
  }
}

export default ChargeBank