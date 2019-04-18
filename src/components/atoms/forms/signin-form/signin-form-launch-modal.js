import React, { Component } from 'react'

// import LoginFormModal from './signin-form-modal'

// import './specific-contact-form-button.scss'

const SigninFormLaunchModal = class extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     modalShow: false,
  //   }

  //   this.launch = this.launch.bind(this)
  //   this.close = this.close.bind(this)
  // }

  // launch = () => { this.setState({modalShow: true}) }
  // close = () => { this.setState({modalShow: false}) }

  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.props.launchSignin} className={this.props.childrenclass}>{this.props.children}</span>
        {/* <SpecificContactFormModal show={this.state.modalShow} onHide={this.close} sendto={this.props.sendto} allowfiles={this.props.allowfiles} /> */}
        {/* <LoginFormModal show={this.state.modalShow} onHide={this.close} /> */}
      </React.Fragment>
    )
  }
}

export default SigninFormLaunchModal
