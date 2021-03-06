import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Category from './category'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import classroomInstruction from '../../../images/educator-resource-center/classroom-instruction.svg'
import professionalLearning from '../../../images/educator-resource-center/professional-learning.svg'
import districtPlanning from '../../../images/educator-resource-center/district-planning.svg'
import citizenScience from '../../../images/educator-resource-center/citizen-science.svg'

const ResourceCategories = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: {
        category01: {
          title: `Classroom Instruction`,
          path: `/resources/educator-resource-center#classroom-instruction`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          image: classroomInstruction,
          alt: `Placeholder Image.`,
          boxImageClass: `box aspect-ratio-box mid classroom`
        },
        category02: {
          title: `Professional Learning`,
          path: `/resources/educator-resource-center#professional-learning`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          image: professionalLearning,
          alt: `Placeholder Image.`,
          boxImageClass: `box aspect-ratio-box mid professional-learning`
        },
        category03: {
          title: `District Planning`,
          path: `/resources/educator-resource-center#district-planning`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          image: districtPlanning,
          alt: `Placeholder Image.`,
          boxImageClass: `box aspect-ratio-box mid district-planning`
        },
        category04: {
          title: `Citizen Science`,
          path: `/resources/educator-resource-center#citizen-science`,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          image: citizenScience,
          alt: `Placeholder Image.`,
          boxImageClass: `box aspect-ratio-box mid citizen-science`
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.filterHash && prevProps.filterHash !== this.props.filterHash) {
      this.categoryFilter(undefined, this.props.filterHash)
    }
  }

  setUpdatedFilters = (title, updated_filters) => {
    for(let key in this.state.categories) {
      if(updated_filters.includes(this.state.categories[key].title) && this.state.categories[key].title !== title) {
        updated_filters.splice(updated_filters.indexOf(this.state.categories[key].title), 1)
      }
    }

    this.props.setActiveFilters(updated_filters)
  }

  categoryFilter = (e, title) => {
    try {
      if(e !== undefined) {
        e.preventDefault()
      }

      if(this.props.activeFilters.includes(title) === false) {
        let updated_filters = this.props.activeFilters.concat(title)
        this.setUpdatedFilters(title, updated_filters)
      }

      let id, elem
      e !== undefined ? elem = e.target : elem = document.getElementById(title.replace('#','').replace(' ', '-')) 

      // if(this.props.navigate) {
      //     window.location.href = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
      // } else if(window.history.pushState) {
      //     window.history.pushState(null, null, (elem.getAttribute('href') || elem.parentElement.getAttribute('href')))
      // } else {
      //     window.location.hash = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
      // }

      if(e !== undefined) {
        // id = elem.getAttribute('id') || elem.parentElement.getAttribute('id')
        id = elem.closest('a').getAttribute('id')
        document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"})
      }

    } catch(e) {
      console.log(e)
    }
    
    // let courses = document.getElementsByClassName('card')
    // for(let i = 0; i < courses.length; i++) {
    //   if(courses[i].getAttribute('data-type').toLowerCase().replace(' ', '-') !== title.replace('#', '').replace(' ', '-')) {
    //     courses[i].style.display = 'none'
    //     courses[i].parentElement.style.display = 'none'
    //   } else {
    //     courses[i].style.display = ''
    //     courses[i].parentElement.style.display = ''
    //   }
    // }

  }

  render() {
    return (
      <Row className="justify-content-center">
        {
          Object.keys(this.state.categories).map((category, index) => {
            return (
              <Col xs={6} sm={5} md={3} key={index}>
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
  // navigate: PropTypes.bool.isRequired,
  // filterHash: PropTypes.string,
  // setFilterHash: PropTypes.func.isRequired
  activeFilters: PropTypes.array.isRequired,
  setActiveFilters: PropTypes.func.isRequired,
  // categoryFilter: PropTypes.func.isRequired
}

export default ResourceCategories
