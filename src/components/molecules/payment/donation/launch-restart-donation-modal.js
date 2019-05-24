import React, { Component } from 'react'

const LaunchRestartDonationModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={this.props.launchRestartDonation}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchRestartDonationModal

