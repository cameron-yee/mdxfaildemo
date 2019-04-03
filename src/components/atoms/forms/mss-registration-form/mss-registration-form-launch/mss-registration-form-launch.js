import React, { Component } from 'react'

// import Button from 'react-bootstrap/Button'
// import JoinModal from './join-modal/join-modal'
import MssRegistrationFormModal from '../mss-registration-form-modal/mss-registration-form-modal'


const JoinEmailListButton = class extends Component {
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
        <span
          onClick={this.launch}
          className={this.props.childrenclass}
        >
          {this.props.children}
        </span>
        <MssRegistrationFormModal
          show={this.state.modalShow}
          onHide={this.close}
          sendto={this.props.sendto}
          infoat={this.props.infoat}
        />
      </React.Fragment>
    )
  }
}

export default JoinEmailListButton
