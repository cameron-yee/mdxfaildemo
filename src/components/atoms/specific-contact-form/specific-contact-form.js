import React, { Component } from 'react'
import SpecificContactFormModal from './specific-contact-form-modal/specific-contact-form-modal'

import './specific-contact-form.scss'

const SpecificContactForm = class extends Component {
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
      <>
        <span id="submit-button" variant="outline-primary" onClick={this.launch}>{this.props.children}</span>
        <SpecificContactFormModal show={this.state.modalShow} onHide={this.close} sendto={this.props.sendto} />
      </>
    )
  }
}

export default SpecificContactForm
