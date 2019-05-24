import React, { Component } from 'react'

const LaunchDonateModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchDonate} className={this.props.childrenclass}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default LaunchDonateModal

