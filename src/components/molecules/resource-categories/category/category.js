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
        <img classroom="p-2" src="/assets/sample-erc-icon.svg" alt="face and gear" />
        <p className="p-2" style={{textAlign: 'center', fontSize: '1.5rem'}}>{this.props.category.title.split(" ")[0]}<br />{this.props.category.title.split(" ")[1]}</p>
      </Link>
    )
  }
}

export default Category
