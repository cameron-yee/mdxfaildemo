import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

/* DonationFrequencyDropdown functions
*
* handleSelection = (e, frequency) => {...}
* setValue = (frequency) => {...}
* render() {...}
*
*/

const DonationFrequencyDropdown = class extends Component {
  handleSelection = (e, frequency) => {
    e.preventDefault()
    this.setValue(frequency)
    this.props.setFrequency(frequency)
  }

  setValue = (frequency) => {
    document.getElementById('donation-frequency-text').innerHTML = frequency
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
          <span id="donation-frequency-text">Monthly</span>
        </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown-menu3" flip={false} style={{overflow: 'scroll'}}>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Once')} >
            Once
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Monthly')} >
            Monthly
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Yearly')} >
            Yearly
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default DonationFrequencyDropdown