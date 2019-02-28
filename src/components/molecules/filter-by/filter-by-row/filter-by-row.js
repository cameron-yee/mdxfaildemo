import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const FilterByRow = class extends Component {
  reset = () => {
    this.props.setActiveFilters([])
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <Row>
          <Col xs={12} md={11}>
            {
              this.props.activeFilters.map((filter, index) => {
                return(
                  <span key={`filter-${index}`} className="rd-pill badge badge-pill badge-primary">{filter}</span>
                )
              })
            }
          </Col> 
          <Col xs={12} md={1}>
            <span className="rd-pill badge badge-pill badge-warning" onClick={this.reset}>Reset Filters</span>
          </Col> 
        </Row>
      </React.Fragment>
    )
  }
}

FilterByRow.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  setActiveFilters: PropTypes.func.isRequired
}

export default FilterByRow