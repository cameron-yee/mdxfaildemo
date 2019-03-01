import React from 'react'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import '../../../global-scss/index.scss';

const SearchBy = class extends React.Component {
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

      // document.addEventListener('click', this.handleClick);
    }
  }

  handleFilter = (item) => {
    if(item === '') {
      return;
    }
    else if(item.toLowerCase() === 'reset') {
      for(let i = 0; i < this.search_items.length; i++) {
        console.log(this.search_items[i]);
        let elem = document.getElementById(this.search_items[i][0]);
        elem.style.display = '';
        elem.parentElement.style.display = '';
      }
    } else {
      for(let i = 0; i < this.search_items.length; i++) {
        let elem = document.getElementById(this.search_items[i][0]);
        for(var key in this.search_items[i][1]) {
          if(this.search_items[i][1][key] !== null) {
          //   console.log((this.search_items[i][1][key]).toString())
          // }
            let search_items = this.search_items[i][1][key].toString().toLowerCase().split()
            let item_as_array = item.toLowerCase().split()
            // if(this.search_items[i][1][key] && item && this.search_items[i][1][key].toString().toLowerCase().split().sort().toString().includes(item.toLowerCase().split().sort().toString())) {
            if(this.search_items[i][1][key] && item && [...search_items].sort().toString().toLowerCase().includes([...item_as_array].sort().toString().toLowerCase())) {
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
    }
  }

  render() {
    // return(<input id="search-by" className="input" type="text" onKeyUp={() => this.handleFilter(document.getElementById('search-by').value)} placeholder="Text input" />)
    return(
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="search-by" className="input" type="text" onKeyUp={() => this.handleFilter(document.getElementById('search-by').value)}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    )
  }
}

export default SearchBy
