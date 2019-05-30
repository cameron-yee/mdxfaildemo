import React, { Component } from 'react'

import SpecificContactFormModal from '../specific-contact-form-modal/specific-contact-form-modal'

import './specific-contact-form-button.scss'

const SpecificContactFormButton = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
    }

    this.launch = this.launch.bind(this)
    this.close = this.close.bind(this)
  }

  launch = () => { this.setState({modalShow: true}) }
  close = () => { this.setState({modalShow: false}) }

  render() {
    return (
      <React.Fragment>
        <span variant="outline-primary" onClick={this.launch} className={this.props.childrenclass}>{this.props.children}</span>
        {/* <SpecificContactFormModal show={this.state.modalShow} onHide={this.close} sendto={this.props.sendto} allowfiles={this.props.allowfiles} /> */}
        <SpecificContactFormModal
          forgot_password={this.props.forgot_password}
          show={this.state.modalShow}
          onHide={this.close}
          sendto={this.props.sendto}
          infoat={this.props.infoat}
        />
      </React.Fragment>
    )
  }
}

export default SpecificContactFormButton
