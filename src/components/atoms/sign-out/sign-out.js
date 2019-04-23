import React, { Component } from 'react'
import signout from '../../../queries/bscsapi/signout'
import axios from 'axios'

class SignOut extends Component {
  constructor(props) {
    super(props)
    this.cancelToken = axios.CancelToken.source()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }

  handleSignout = () => {
    signout(this.cancelToken)
    this.props.signOut()
  }

  render() {
    return (
      <React.Fragment>
        <span onClick={this.handleSignout}>{this.props.children}</span>
      </React.Fragment>
    )
  }
}

export default SignOut
