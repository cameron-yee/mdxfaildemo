import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const AccountHolderTypeDropdown = class extends Component {
  setValue = (type) => {
    document.getElementById('type-text').innerHTML = type
  }

  handleSelection = (e, type) => {
    e.preventDefault()
    this.setValue(type)
    this.props.setType(type.toLowerCase())
  }

  render() {
    return (
      <Dropdown id="dropdown" alignRight={true} drop={'down'} className="mb-3">
        <Dropdown.Toggle
          variant="outline-primary"
          id="account-holder-type-dropdown"
          style={{width: '100%'}}
        >
          {/* <span id="country-text" style={{fontSize: '.75rem'}}>United States of America</span> */}
          <span id="type-text">Individual</span>
        </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown-menu3" flip={false} style={{overflow: 'scroll'}}>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Individual')} >
            Individual
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Company')} >
            Company
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AccountHolderTypeDropdown