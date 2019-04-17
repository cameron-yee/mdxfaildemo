import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'


const JoinEmailListButton = class extends Component {
  render() {
    return (
      <>
        <Button
          id="submit-button"
          variant="outline-primary"
          onClick={this.props.launch}
        >
          Join E-mail List
        </Button>
      </>
    )
  }
}

export default JoinEmailListButton
