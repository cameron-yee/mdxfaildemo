import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

/* DonationSelectFundDropdown functions
*
* handleSelection = (e, frequency) => {...}
* setValue = (frequency) => {...}
* render() {...}
*
*/

const DonationSelectFundDropdown = class extends Component {
  handleSelection = (e, selection, fund_code) => {
    e.preventDefault()
    this.setValue(selection)
    this.props.setFund(selection, fund_code)
  }

  setValue = (selection) => {
    document.getElementById('donation-fund-text').innerHTML = selection
  }

  render() {
    return (
      <Dropdown id="dropdown" alignRight={true} drop={'down'} className="m-3">
        <Dropdown.Toggle
          variant="outline-primary"
          id="donation-fund-dropdown"
          style={{width: '100%'}}
        >
          {/* <span id="country-text" style={{fontSize: '.75rem'}}>United States of America</span> */}
          <span id="donation-fund-text">Annual Fund</span>
        </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown-menu3" flip={false} style={{overflow: 'scroll'}}>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Annual Fund', 'af')} >
            Annual Fund
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Endowment Fund', 'ef')} >
            Endowment Fund
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => this.handleSelection(e, 'Susan Loucks-Horsley Memorial Fund', 'sl')} >
            Susan Loucks-Horsley Memorial Fund
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default DonationSelectFundDropdown