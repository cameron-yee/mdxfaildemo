import React, { Component } from 'react'

const SigninFormLaunchModal = class extends Component {
  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchSignin} className={this.props.childrenclass}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default SigninFormLaunchModal
