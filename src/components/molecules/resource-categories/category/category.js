import React, { Component } from 'react'

import { Link } from 'gatsby'


const Category = class extends Component {
  setCategoryFilter = (e, title) => {
    this.props.runCategoryFilter(e, title)
  }

  render() {
    return (
      <Link
        className="d-flex flex-column justify-content-center"
        id={this.props.category.title.toLowerCase().replace(/ /g, "-")}
        to={this.props.category.path}
        onClick={(e) => this.setCategoryFilter(e, this.props.category.title.toLowerCase())}
      >
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-center">
            <img className="mb-3 mb-md-0 mb-lg-3 mt-lg-2" style={{ width: '100%' }} src={this.props.category.image} alt={this.props.category.alt} />
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div className="dot d-inline-flex mr-2"></div>
            <div className="dot d-inline-flex mr-2"></div>
            <div className="dot d-inline-flex"></div>
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
