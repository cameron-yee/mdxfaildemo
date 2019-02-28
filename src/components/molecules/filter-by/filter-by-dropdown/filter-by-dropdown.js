import React, { Component } from 'react'
import { Location } from '@reach/router'

//React-Bootstrap imports
import Dropdown from 'react-bootstrap/Dropdown'

import './filter-by-dropdown.scss'

const FilterByDropdown = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsActive: false,
      // selected: 'Filter by...'
      filterHash: undefined,
      // activeFilters: [] //TODO: Refactor to be a prop
    };
    this.search_items = [];
    // this.setHref = this.setHref.bind(this)
  }

  componentDidMount = () => {
    if(this.props.activeFilters) {
      this.setState({activeFilters: this.props.activeFilters})
    }
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

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.setState({filterHash: this.props.filterHash.slice(1)})
    }
  }

  //For arrow spin
  handleToggle = (e) => {
    e.preventDefault()
    const dropdownIsActive = this.state.dropdownIsActive
    const dropdown = document.getElementById('dropdown')
    if(dropdownIsActive) {
      this.setState({ dropdownIsActive: false })
      if(dropdown.classList.contains('is-active')) {
        dropdown.classList.remove('is-active')
      }
    } else {
      this.setState({ dropdownIsActive: true });
      if(dropdown.classList.contains('is-active') === false) {
        dropdown.classList.add('is-active');
      }
    }
  }

  handleBlur = (e) => {
    e.preventDefault()
    let dropdown = document.getElementById('dropdown')
    if(dropdown.classList.contains('is-active')) {
      dropdown.classList.remove('is-active');
    }
    this.setState({ dropdownIsActive: false });
  }

  //Item will be string value that was clicked on
  handleFilter = (e, key, item) => {
    if(e !== undefined) {
      e.preventDefault()
      // if(item !== 'reset') { 
      //   this.setHref(item)        //THIS ISN'T QUITE WORKING RIGHT
      // }
    }

    const getUpdatedFilters = () => {
      let updated_filters;
      if(this.props.items[key][1] === true) {
        if(this.props.activeFilters.includes(item)) {
          let index = this.props.activeFilters.indexOf(item)
          updated_filters = this.props.activeFilters
          updated_filters.splice(index, 1) //Splice indexing starts at 1
          this.props.setActiveFilters(updated_filters)
          this.setState({activeFilters: updated_filters})
          return updated_filters
        } else {
          updated_filters = this.props.activeFilters.concat(item)
          this.props.setActiveFilters(updated_filters)
          this.setState({activeFilters: updated_filters})
          return updated_filters
        }
      } else {
        updated_filters = this.props.activeFilters.concat(item)
        for(let i = 0; i < updated_filters.length; i++) {
          //Removes any other filters in the same category if multiple is false
          updated_filters = this.props.activeFilters.filter(item => this.props.items[key][2].indexOf(item) === -1).concat(item)
          this.props.setActiveFilters(updated_filters)
          this.setState({activeFilters: updated_filters})
          return updated_filters
        }
      }

    }

    //Displays all and stops execution if there are no filters
    const checkNoFilters = (updated_filters) => {
      if(Array.isArray(updated_filters) && updated_filters.length === 0) {
        if(this.state.filterHash === undefined) {
          for(let i = 0; i < this.search_items.length; i++) {
            let elem = document.getElementById(this.search_items[i][0]);
            elem.style.display = ''
            elem.parentElement.style.display = ''
          }
        } else {
          for(let i = 0; i < this.search_items.length; i++) {
            let elem = document.getElementById(this.search_items[i][0]);
            if(elem.getAttribute('data-type').toLowerCase().replace(' ', '-') === this.state.filterHash) {
              elem.style.display = ''
              elem.parentElement.style.display = ''
            }
          }
        }
        return true;
      } else {
        return false
      }
    }

    const handleDisplay = (updated_filters) => {
      for(let i = 0; i < this.search_items.length; i++) {
        const resource_json = this.search_items[i][1] 
        let elem = document.getElementById(this.search_items[i][0]);
        let show = false

        for(var key in resource_json) {
          if(Array.isArray(resource_json[key]) && resource_json[key].length) {
            for(let x = 0; x < resource_json[key].length; x++) {
              if(updated_filters.includes(resource_json[key][x]) && (this.state.filterHash === undefined || this.state.filterHash === resource_json['type'].toLowerCase())) {
                elem.style.display = '';
                elem.parentElement.style.display = ''
                show = true
                break;
              }
            }
          } else if(typeof(resource_json[key]) === 'string' && updated_filters.includes(resource_json[key]) && (this.state.filterHash === undefined || this.state.filterHash === resource_json['type'].toLowerCase())) {
            elem.style.display = '';
            elem.parentElement.style.display = ''
            show = true
            break;
          }
        }
        if(!show) {
          elem.style.display = 'none';
          elem.parentElement.style.display = 'none';
        }
      }
    }

    const updated_filters = getUpdatedFilters() || []
    const no_filters = checkNoFilters(updated_filters)
    if(no_filters) {
      return;
    } else {
      handleDisplay(updated_filters)
    }

    document.getElementById('filter-by-dropdown').focus()
    document.getElementById('filter-by-dropdown').blur()
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
    const reset = 'reset'
    if(this.props.items) {
      return (
        <div id="filter">
          <Dropdown id="dropdown" style={{float: 'right'}}>
            {/* <Dropdown.Toggle variant="outline-primary" id="filter-by-dropdown" style={{width: '100%'}}>{this.state.selected}</Dropdown.Toggle> */}
            <Dropdown.Toggle variant="outline-primary" id="filter-by-dropdown" style={{width: '100%'}}>Filter by...</Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-menu3">{this.renderFilterMenu(this.props.items)}</Dropdown.Menu>
          </Dropdown>
          <p>{JSON.stringify(this.props.activeFilters)}</p>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default props => (
  <Location>
    {locationProps => <FilterByDropdown {...locationProps} {...props} />}
  </Location>
)
