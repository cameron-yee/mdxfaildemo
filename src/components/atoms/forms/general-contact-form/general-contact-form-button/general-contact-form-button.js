import React, { Component } from 'react'

import Button from 'react-bootstrap/Button'

const GeneralContactFormButton = class extends Component {
  render() {
    return (
      <>
        <Button
          id="submit-button"
          variant="outline-primary"
          onClick={this.props.launch}
        >
          {this.props.children}
        </Button>
      </>
    )
  }
}

export default GeneralContactFormButton
