import React, { Component } from 'react'

const LaunchUpdateDonationModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={this.props.launchUpdateDonation}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchUpdateDonationModal

