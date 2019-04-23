import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

const CreditOrBank = class extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        <Button variant="outline-primary" onClick={() => this.props.setCreditOrBank('Credit')}>Credit</Button>
        <Button variant="outline-primary" onClick={() => this.props.setCreditOrBank('Bank')}>Bank</Button>
      </div>
    )
  }
}

export default CreditOrBank