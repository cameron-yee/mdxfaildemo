import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button';

import './filter-by-row.scss'

const FilterByRow = class extends Component {
  reset = () => {
    this.props.setActiveFilters([])
  }

  removeFilter = (filter) => {
    let index = this.props.activeFilters.indexOf(filter)
    let updated_filters = this.props.activeFilters.slice(0)
    updated_filters.splice(index, 1)
    this.props.setActiveFilters(updated_filters)
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-sm-flex">
          <div className="p-2">
            <Button size="sm" variant="outline-primary" onClick={this.reset}>Clear Filters</Button>
          </div>
          <div className="p-2">
            {
              this.props.activeFilters.map((filter, index) => {
                const category_filters = ['Classroom Instruction','Professional Learning','District Planning','Citizen Science']
                if(category_filters.indexOf(filter) > -1) {
                  return(
                    <span
                      key={`filter-${index}`}
                      className={`
                        rd-pill
                        badge
                        badge-pill
                        filter-pill
                        ${category_filters[category_filters.indexOf(filter)].toLowerCase().replace(/ /g, '-')}
                      `}
                    >
                      <i className="far fa-times-circle fa-lg remove-filter" onClick={() => this.removeFilter(filter)}></i>
                      {filter}
                    </span>
                  )
                } else {
                  return(
                    <span key={`filter-${index}`} className="rd-pill badge badge-pill filter-pill">
                      <i className="far fa-times-circle fa-lg remove-filter" onClick={() => this.removeFilter(filter)}></i>
                      {filter}
                    </span>
                  )
                }
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

FilterByRow.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  setActiveFilters: PropTypes.func.isRequired
}

export default FilterByRow
