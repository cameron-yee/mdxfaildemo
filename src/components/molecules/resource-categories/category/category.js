import React, { Component } from 'react'

import { Link } from 'gatsby'

import './category.scss'


const Category = class extends Component {
  setCategoryFilter = (e, title) => {
    this.props.runCategoryFilter(e, title)
  }

  render() {
    return (
      <Link
        id={this.props.category.title.toLowerCase().replace(/ /g, "-")}
        to={this.props.category.path}
        onClick={(e) => this.setCategoryFilter(e, this.props.category.title)}
      >
        <div className={`categoryImageParent ${this.props.category.title.toLowerCase().replace(/ /g, "-")}`}>
          <div
            className="d-flex flex-row justify-content-center"
          >
              <div
                className={`rounded-circle p-3 categoryImageChild ${this.props.category.title.toLowerCase().replace(/ /g, "-")}`}
              >
                <img
                  className="categoryImageGrandChild"
                  src={this.props.category.image}
                  alt={this.props.category.alt}
                />
              </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <p className="mt-3 mt-md-3 mt-lg-3 mb-md-0" style={{textAlign: 'center', fontSize: '1.5rem', lineHeight: '1.1'}}>{this.props.category.title.split(" ")[0]}<br />{this.props.category.title.split(" ")[1]}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default Category
