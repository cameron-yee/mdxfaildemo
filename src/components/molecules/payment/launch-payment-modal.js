import React, { Component } from 'react'

const LaunchPaymentModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchPayment} className={this.props.childrenclass}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default LaunchPaymentModal

