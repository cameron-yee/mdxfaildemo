import React, { Component } from 'react'

const LaunchDeleteCardModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchDeleteCard} className={this.props.childrenclass}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default LaunchDeleteCardModal

