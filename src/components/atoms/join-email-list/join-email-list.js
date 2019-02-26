import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import JoinModal from './join-modal/join-modal'


const JoinEmailList = class extends Component {
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
      <ButtonToolbar>
        <Button id="submit-button" variant="outline-primary" onClick={this.launch}>Join E-mail List</Button>
        <JoinModal show={this.state.modalShow} onHide={this.close} />
      </ButtonToolbar>
    )
  }
}

export default JoinEmailList
