import React, { Component } from 'react'

const LaunchOrderModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          variant="outline-primary"
          onClick={() => this.props.launchOrder(this.props.sku)}
          className={this.props.childrenclass}
        >{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default LaunchOrderModal

