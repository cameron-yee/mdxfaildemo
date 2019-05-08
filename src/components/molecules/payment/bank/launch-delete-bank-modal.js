import React, { Component } from 'react'

const LaunchDeleteBankModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchDeleteBank} className={this.props.childrenclass}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default LaunchDeleteBankModal

