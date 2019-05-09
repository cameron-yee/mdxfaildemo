import React, { Component } from 'react'

const LaunchDeleteDonationSubscriptionModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={this.props.launchDeleteDonationSubscription}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchDeleteDonationSubscriptionModal

