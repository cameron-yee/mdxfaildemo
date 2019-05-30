import React, { Component } from 'react'

const LaunchUpdateCardModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={this.props.launchUpdateCard}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
      </React.Fragment>
    )
  }
}

export default LaunchUpdateCardModal

