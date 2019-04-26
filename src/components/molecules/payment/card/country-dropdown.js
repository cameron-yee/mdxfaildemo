import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Dropdown from 'react-bootstrap/Dropdown'

import './country-dropdown.scss'

const CountryDropdown = class extends Component {
  setValue = (country_name) => {
    document.getElementById('country-text').innerHTML = country_name
  }

  handleSelection = (e, country_name, country_code) => {
    e.preventDefault()
    this.setValue(country_name)
    this.props.setCountry(country_code)
  }

  render() {
    const country_dropdown_menu =
      (<StaticQuery query={graphql`
        query Query {
          allCountry2CodesJson {
            edges {
              node {
                name
                alpha_2
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        return (
          <React.Fragment>
            {
              data.allCountry2CodesJson.edges.map((edge, index) => {
                return (
                  <Dropdown.Item
                    key={`country-${index}`}
                    onClick={(e) => this.handleSelection(e, edge.node.name, edge.node.alpha_2)}
                  >
                    {edge.node.name}
                  </Dropdown.Item>
                )
              })
            }
          </React.Fragment>
        )
      }}
    />)

    return (
      <Dropdown id="dropdown" alignRight={true} drop={'down'} className="mb-3">
        <Dropdown.Toggle
          variant="outline-primary"
          id="country-dropdown"
          style={{width: '100%'}}
        >
          {/* <span id="country-text" style={{fontSize: '.75rem'}}>United States of America</span> */}
          <span id="country-text">United States of America</span>
        </Dropdown.Toggle>
        <Dropdown.Menu id="country-dropdown-menu" flip={false} style={{overflow: 'scroll'}}>{country_dropdown_menu}</Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default CountryDropdown