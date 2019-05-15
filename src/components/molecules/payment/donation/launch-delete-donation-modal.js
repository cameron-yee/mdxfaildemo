import React, { Component } from 'react'

const LaunchDeleteDonationModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={this.props.launchDeleteDonation}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchDeleteDonationModal

