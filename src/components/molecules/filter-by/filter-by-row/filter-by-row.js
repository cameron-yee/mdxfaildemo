import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';

import './filter-by-row.scss'

const FilterByRow = class extends Component {
  reset = () => {
    this.props.setActiveFilters([])
  }

  removeFilter = (filter) => {
    let index = this.props.activeFilters.indexOf(filter)
    let updated_filters = this.props.activeFilters.slice(0)
    updated_filters.splice(index, 1) //Splice indexing starts at 1
    this.props.setActiveFilters(updated_filters)
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <Row>
          <Col xs={12} md={10}>
            {
              this.props.activeFilters.map((filter, index) => {
                return(
                  <span key={`filter-${index}`} className="rd-pill badge badge-pill badge-primary filter-pill">
                    <i className="far fa-times-circle fa-lg remove-filter" onClick={() => this.removeFilter(filter)}></i>
                    {filter}
                  </span>
                )
              })
            }
          </Col> 
          <Col xs={12} md={2}>
            <Button size="sm" variant="outline-primary" onClick={this.reset} style={{float: 'right'}}>Reset Filters</Button>
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