import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const FilterBy = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsActive: false,
      selected: 'Filter by...'
    };
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

      // document.addEventListener('click', this.handleClick);
    }
  }


  handleToggle = (e) => {
    e.preventDefault()
    const dropdownIsActive = this.state.dropdownIsActive
    const dropdown = document.getElementById('dropdown')
    // const dropdownmenu = document.getElementById('dropdown-menu3')
    // const dropdownarrow = document.getElementById('dropdown-arrow')
    if(dropdownIsActive) {
      this.setState({ dropdownIsActive: false })
      if(dropdown.classList.contains('is-active')) {
        dropdown.classList.remove('is-active')
      }
      // dropdownarrow.style.transform = 'rotate(0deg)' 
      // dropdownmenu.childNodes[0].style.maxHeight = '0px'
      // dropdownmenu.childNodes[0].style.visibility = 'hidden'
      // dropdownmenu.style.opacity = 0
      // dropdownmenu.style.visibility = 'hidden'
    } else {
      this.setState({ dropdownIsActive: true });
      if(dropdown.classList.contains('is-active') === false) {
        dropdown.classList.add('is-active');
      }
      // dropdownarrow.style.transform = 'rotate(270deg)' 
      // dropdownmenu.childNodes[0].style.maxHeight = '500px'
      // dropdownmenu.childNodes[0].style.visibility = 'visible'
      // dropdownmenu.style.opacity = 1
      // dropdownmenu.style.visibility = 'visible'
    }
  }

  handleBlur = (e) => {
    let dropdown = document.getElementById('dropdown')
    // const dropdownmenu = document.getElementById('dropdown-menu3')
    // const dropdownarrow = document.getElementById('dropdown-arrow')
    if(dropdown.classList.contains('is-active')) {
      dropdown.classList.remove('is-active');
    }
    // dropdownmenu.childNodes[0].style.maxHeight = '0px'
    // dropdownmenu.childNodes[0].style.visibility = 'hidden'
    // dropdownmenu.style.maxHeight = '0px'
    // dropdownmenu.style.opacity = 0
    // dropdownmenu.style.visibility = 'hidden'
    // dropdownarrow.style.transform = 'rotate(0deg)' 
    this.setState({ dropdownIsActive: false });
  }

  handleFilter = (item) => {
    if(item === 'reset') {
      for(let i = 0; i < this.search_items.length; i++) {
        let elem = document.getElementById(this.search_items[i][0]);
        elem.style.display = '';
        elem.parentElement.style.display = '';
      }
    } else {
      for(let i = 0; i < this.search_items.length; i++) {
        let elem = document.getElementById(this.search_items[i][0]);
        for(var key in this.search_items[i][1]) {
          if(this.search_items[i][1][key] && item && this.search_items[i][1][key].toString().toLowerCase().includes(item.toLowerCase())) {
            elem.style.display = '';
            elem.parentElement.style.display = '';
            break;
          } else {
            elem.style.display = 'none';
            elem.parentElement.style.display = 'none';
          }
        }
      }
    }
    document.getElementById('dropdown-basic').focus()
    document.getElementById('dropdown-basic').blur()
    item === 'reset' ? this.setState({selected: 'Filter by...'}) : this.setState({selected: item})
  }

  render() {
    if(this.props.items) {
      return (
        <div id="filter">
          <Dropdown id="dropdown" style={{float: 'right'}}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" style={{width: '100%'}}>{this.state.selected}</Dropdown.Toggle>

            <Dropdown.Menu id="dropdown-menu3">
              {this.props.items.map((item, index) => (
                // eslint-disable-next-line
                <Dropdown.Item key={`filter-item-${index}`} onClick={() => {this.handleFilter(item)}} className="dropdown-item">{item}</Dropdown.Item>
              ))}
              <hr className="dropdown-divider" />
                {/* eslint-disable-next-line */}
              <Dropdown.Item onClick={() => {this.handleFilter('reset')}} className="dropdown-item">Reset</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default FilterBy
