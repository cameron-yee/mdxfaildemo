import React, { Component } from 'react';
import Category from './category';
import Col from 'react-bootstrap/Col'

const ResourceCategories = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        category01: { title: `Classroom`, path: `/resources/educator-resource-center#classroom`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid classroom` },
        category02: { title: `Professional Learning`, path: `/resources/educator-resource-center#professional-learning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid professional-learning` },
        category03: { title: `District Planning`, path: `/resources/educator-resource-center#district-planning`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid district-planning` },
        category04: { title: `Citizen Science`, path: `/resources/educator-resource-center#citizen-science`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, alt: `Placeholder Image.`, boxImageClass: `box aspect-ratio-box mid citizen-science` }
      }
    }
  }

  componentDidUpdate() {
    if(this.props.filterHash) {
      this.categoryFilter(undefined, this.props.filterHash)
    }
  }

  categoryFilter = (e, title) => {
    if(e !== undefined) {
      e.preventDefault();
    }
    try {
      let id, elem;
      e !== undefined ? elem = e.target : elem = document.getElementById(title.slice(1)) 
      // if(elem.getAttribute('href')) {
        if(this.props.navigate) {
          window.location.href = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
        } else if(window.history.pushState) {
          window.history.pushState(null, null, elem.getAttribute('href') || elem.parentElement.getAttribute('href'))
        } else {
          window.location.hash = elem.getAttribute('href') || elem.parentElement.getAttribute('href')
        }
        // window.location.href = elem.getAttribute('href');
        id = elem.getAttribute('id') || elem.parentElement.getAttribute('id');
      // } else {
      //   if(this.props.navigate) {
      //     window.location.href = elem.parentElement.getAttribute('href');
      //   } else if(window.history.pushState) {
      //     window.history.pushState(null, null, elem.parentElement.getAttribute('href'));
      //   } else {
      //     window.location.hash = elem.parentElement.getAttribute('href');
      //   }
      //   // window.location.href = elem.parentElement.getAttribute('href');
      //   id = elem.parentElement.getAttribute('id');
      // }

      document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start"});

    } catch(e) {
      console.log(e);
    }
    
    let courses = document.getElementsByClassName('card');
    for(let i = 0; i < courses.length; i++) {
      if(courses[i].getAttributeNames().includes('data-type')) {
        if(courses[i].getAttribute('data-type').toLowerCase().replace(' ', '-') !== title.replace('#', '').replace(' ', '-')) {
          courses[i].style.display = 'none';
          courses[i].parentElement.style.display = 'none';
          // courses[i].style.width = '0px';
          // courses[i].style.height = '0px';
          // courses[i].style.border = 'none';
          // courses[i].style.transition = 'all .3s';
          // for(let x = 0; x < courses[i].children.length; x++) {
          //   courses[i].children[x].style.display = 'none';
          // }
          // courses[i].parentElement.classList.remove('col-md-4')
          // courses[i].parentElement.style.width = '0px';
          // courses[i].parentElement.style.height = '0px';
          // courses[i].parentElement.style.transition = 'all .3s';
        } else {
          // courses[i].parentElement.classList.add('col-md-4')
          // courses[i].style.width = '';
          // courses[i].style.height = '';
          // courses[i].style.border = '1px solid rgba(0,0,0,0.125)';
          // courses[i].style.transition = 'all .3s';
          // for(let x = 0; x < courses[i].children.length; x++) {
          //   courses[i].children[x].style.display = '';
          // }
          // courses[i].parentElement.style.width = '';
          // courses[i].parentElement.style.height = '';
          // courses[i].parentElement.style.transition = 'all .3s';
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
