import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Category from './category'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

const ResourceCategories = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        category01: { title: `Classroom Instruction`, path: `/resources/educator-resource-center#classroom-instruction`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid classroom` },
        category02: { title: `Professional Learning`, path: `/resources/educator-resource-center#professional-learning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid professional-learning` },
        category03: { title: `District Planning`, path: `/resources/educator-resource-center#district-planning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid district-planning` },
        category04: { title: `Citizen Science`, path: `/resources/educator-resource-center#citizen-science`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid citizen-science` }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.filterHash && prevProps.filterHash !== this.props.filterHash) {
      this.categoryFilter(undefined, this.props.filterHash)
    }
  }

  categoryFilter = (e, title) => {
    try {
      if(e !== undefined) {
        e.preventDefault();
      }

      this.props.setFilterHash(title)

      let id, elem;
      e !== undefined ? elem = e.target : elem = document.getElementById(title.replace('#','').replace(' ', '-')) 

      if(this.props.navigate) {
          window.location.href = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
      } else if(window.history.pushState) {
          window.history.pushState(null, null, (elem.getAttribute('href') || elem.parentElement.getAttribute('href')))
      } else {
          window.location.hash = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
      }

      if(e !== undefined) {
        id = elem.getAttribute('id') || elem.parentElement.getAttribute('id')
        console.log(true)
        document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"});
      }

    } catch(e) {
      console.log(e);
    }
    
    let courses = document.getElementsByClassName('card');
    for(let i = 0; i < courses.length; i++) {
      if(courses[i].getAttribute('data-type').toLowerCase().replace(' ', '-') !== title.replace('#', '').replace(' ', '-')) {
        courses[i].style.display = 'none';
        courses[i].parentElement.style.display = 'none';
      } else {
        courses[i].style.display = '';
        courses[i].parentElement.style.display = '';
      }
    }

  }

  render() {
    return (
      <Row>
        {
          Object.keys(this.state.categories).map((category, index) => {
            return (
              <Col md={3} key={index}>
                <Category category={this.state.categories[category]} runCategoryFilter={(e, title) => this.categoryFilter(e, title)}/>
              </Col>
            )
          })
        }
      </Row>
    )
  }
}

ResourceCategories.propTypes = {
  navigate: PropTypes.bool.isRequired,
  filterHash: PropTypes.string,
  setFilterHash: PropTypes.func.isRequired
}

export default ResourceCategories
