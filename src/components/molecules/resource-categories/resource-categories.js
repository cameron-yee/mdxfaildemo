import React, { Component } from 'react';
import Category from './category';
import Col from 'react-bootstrap/Col'

const ResourceCategories = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        category01: { title: `Classroom`, path: `/educator-resource-center#classroom`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid classroom` },
        category02: { title: `Professional Learning`, path: `/educator-resource-center#professional-learning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid professional-learning` },
        category03: { title: `District Planning`, path: `/educator-resource-center#district-planning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid district-planning` },
        category04: { title: `Citizen Science`, path: `/educator-resource-center#citizen-science`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid citizen-science` }
      }
    }
  }

  categoryFilter = (e, title) => {
    e.preventDefault();
    let id = '';
    try {
      if(e.target.getAttribute('href')) {
        if(this.props.navigate) {
          window.location.href = e.target.getAttribute('href');
        } else if(window.history.pushState) {
          window.history.pushState(null, null, e.target.getAttribute('href'));
        } else {
          window.location.hash = e.target.getAttribute('href');
        }
        // window.location.href = e.target.getAttribute('href');
        id = e.target.getAttribute('id');
      } else{
        if(this.props.navigate) {
          window.location.href = e.target.parentElement.getAttribute('href');
        } else if(window.history.pushState) {
          window.history.pushState(null, null, e.target.parentElement.getAttribute('href'));
        } else {
          window.location.hash = e.target.parentElement.getAttribute('href');
        }
        // window.location.href = e.target.parentElement.getAttribute('href');
        id = e.target.parentElement.getAttribute('id');
      }
    } catch(e) {
      console.log(e);
    }

    document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"});
    
    let courses = document.getElementsByClassName('card');
    for(let i = 0; i < courses.length; i++) {
      if(courses[i].getAttributeNames().includes('data-type')) {
        if(courses[i].getAttribute('data-type').toLowerCase() !== title) {
          courses[i].style.display = 'none';
          courses[i].parentElement.style.display = 'none';
        } else {
          courses[i].style.display = '';
          courses[i].parentElement.style.display = '';
        }
      }
    }

  }

  render() {
    return (
      Object.keys(this.state.categories).map((category, index) => {
        return (
          <Col md={3} key={index}>
            <Category category={this.state.categories[category]} runCategoryFilter={(e, title) => this.categoryFilter(e, title)}/>
            {/* <Link id={state.categories[category].title.toLowerCase().replace(/ /g, "-")} to={state.categories[category].path} className={state.categories[category].boxImageClass} onClick={(e) => categoryFilter(e, state.categories[category].title.toLowerCase())}>
              <h4 className="title is-4">{state.categories[category].title.split(" ")[0]}<br />{state.categories[category].title.split(" ")[1]}</h4>
            </Link> */}
          </Col>
        )
      })
    )
  }
}

export default ResourceCategories
