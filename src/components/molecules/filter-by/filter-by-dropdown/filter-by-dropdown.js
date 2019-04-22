import React, { Component } from 'react'
import { Location } from '@reach/router'

import PropTypes from 'prop-types'

//React-Bootstrap imports
import Dropdown from 'react-bootstrap/Dropdown'

import './filter-by-dropdown.scss'

/*
*
*
* NOTE: Don't name filter by field "type".  "type" is specific to ERC categories.
*
*
*/
const FilterByDropdown = class extends Component {
  constructor(props) {
    super(props);
    this.search_items = [];
  }

  componentDidMount = () => {
    if(document) {
      let searchable_elements = document.querySelectorAll('[data-filter]');
      for(let i = 0; i < searchable_elements.length; i++) {
        let id = searchable_elements[i].getAttribute('id');
        let search_values = JSON.parse(searchable_elements[i].getAttribute('data-filter'));
        let new_array = [id, search_values];
        this.search_items.push(new_array);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.activeFilters !== prevProps.activeFilters) {
      this.setUpdatedFilters(this.props.activeFilters)
      const active_filters = this.checkIfFiltersActive(this.props.activeFilters)
      if(active_filters) {
        this.handleDisplay(this.props.activeFilters)
      }
    }
  }

  setUpdatedFilters = (updated_filters) => {
      this.props.setActiveFilters(updated_filters)
      return updated_filters
  }

  handleDisplay = (updated_filters) => {
    const displayElement = (elem) => {
      elem.style.display = '';
      elem.parentElement.style.display = ''
      return true
    }

    const hideElement = (elem) => {
      elem.style.display = 'none'
      elem.parentElement.style.display = 'none'
      return false
    }

    let activeCategoryFilter = false
    const category_filters = ['Classroom Instruction','Professional Learning','District Planning','Citizen Science']
    for(let i = 0; i < category_filters.length; i++) {
      if(updated_filters.includes(category_filters[i])) {
        activeCategoryFilter = category_filters[i]
        break;
      }
    }

    //Loops through searchable elements in DOM
    for(let i = 0; i < this.search_items.length; i++) {
      const resource_json = this.search_items[i][1]
      let elem = document.getElementById(this.search_items[i][0]);
      let show = false

      //If a category filter exists, only show elements that have that filter as a type
      if(
        'type' in resource_json
        && activeCategoryFilter
        && activeCategoryFilter !== resource_json['type']
      ) {
        hideElement(elem)
      //If only a category filter exists since if length is 1 and activeCategory exists the updated_filters list must only be a category filter
      } else if(
        'type' in resource_json
        && activeCategoryFilter
        && activeCategoryFilter === resource_json['type']
        && updated_filters.length === 1
      ) {
        show = displayElement(elem)
      //After category filter checks, decide if elements should be displayed if there are multiple filters
      //Elements should only display if they meet the category filter and at least one additional filter
      } else {
        //Loops through matchable values for each DOM element
        for(var key in resource_json) {
          const current_filter = resource_json[key]
          if(Array.isArray(current_filter) && current_filter.length && key !== 'type') {
            //Loops through each matchable value in a category of matchable values for each DOM element
            for(let x = 0; x < current_filter.length; x++) {
              if(updated_filters.includes(current_filter[x])) {
                show = displayElement(elem) // show = true
                break;
              } else if(updated_filters.includes(current_filter[x])) {
                show = displayElement(elem) // show = true
                break;
              }
            }
          } else if(typeof(current_filter) === 'string' && updated_filters.includes(current_filter) && key !== 'type') {
            show = displayElement(elem) // show = true
            break;
          }
        }
        if(!show) {
          hideElement(elem)
        }
      }
    }
  }

  //Displays all and stops execution if there are no filters
  checkIfFiltersActive = (updated_filters) => {
    if(Array.isArray(updated_filters) && updated_filters.length === 0) {
      for(let i = 0; i < this.search_items.length; i++) {
        let elem = document.getElementById(this.search_items[i][0]);
        elem.style.display = ''
        elem.parentElement.style.display = ''
      }
      return false;
    } else {
      return true
    }
  }

  handleFilter = (e, key, filter) => {
    if(e !== undefined) {
      e.preventDefault()
    }

    const removeFilter = (filter) => {
      let index = this.props.activeFilters.indexOf(filter)
      let updated_filters = this.props.activeFilters.slice(0)
      updated_filters.splice(index, 1) //Splice indexing starts at 1
      return this.setUpdatedFilters(updated_filters)
    }

    if(this.props.activeFilters.includes(filter)) {
      removeFilter(filter)
    } else {
      let updated_filters;
      if(this.props.items[key][1] === true) {
        updated_filters = this.props.activeFilters.concat(filter)
        return this.setUpdatedFilters(updated_filters)
      } else {
        updated_filters = this.props.activeFilters.concat(filter)
        for(let i = 0; i < updated_filters.length; i++) {
          //Removes any other filters in the same category if multiple is false
          updated_filters = this.props.activeFilters.filter(filter => this.props.items[key][2].indexOf(filter) === -1).concat(filter)
          return this.setUpdatedFilters(updated_filters)
        }
      }
    }
  }

  renderFilterMenu = (items) => {
    let menu = []
    for(let key in items) {
      let category_title_elem =
        <Dropdown.Item
          key={`category-title-${key}`}
          className="category-title-elem"
          disabled
        >
          {items[key][0]}
        </Dropdown.Item>
      let category_item_elems = []
      for(let i = 0; i < items[key][2].length; i++) {
        let item =
          <Dropdown.Item
            key={`filter-item-${key}-${i}`}
            onClick={(e) => this.handleFilter(e, key, items[key][2][i])}
            className="filter-item"
          >
            {items[key][2][i]}
          </Dropdown.Item>

        category_item_elems.push(item)
      }

      menu.push(category_title_elem, category_item_elems)
    }

    return menu
  }

  render() {
    if(this.props.items) {
      return (
        <div id="filter">
          <Dropdown id="dropdown" alignRight={true} drop={'down'}>
            <Dropdown.Toggle variant="outline-primary" id="filter-by-dropdown" style={{width: '100%'}}>Filter by...</Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-menu3" flip={false}>{this.renderFilterMenu(this.props.items)}</Dropdown.Menu>
          </Dropdown>
        </div>
      )
    } else {
      return null;
    }
  }
}

FilterByDropdown.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  filterHash: PropTypes.string,
  setActiveFilters: PropTypes.func.isRequired
}

export default props => (
  <Location>
    {locationProps => <FilterByDropdown {...locationProps} {...props} />}
  </Location>
)
