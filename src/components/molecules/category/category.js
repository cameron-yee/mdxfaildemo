import React, { Component } from 'react';

import { Link } from 'gatsby';

const Category = class extends Component {
  setCategoryFilter = (e, title) => {
    this.props.runCategoryFilter(e, title);
  }

  render() {
    return (
      <Link id={this.props.category.title.toLowerCase().replace(/ /g, "-")} to={this.props.category.path} className={this.props.category.boxImageClass} onClick={(e) => this.setCategoryFilter(e, this.props.category.title.toLowerCase())}>
        <h4 className="title is-4">{this.props.category.title.split(" ")[0]}<br />{this.props.category.title.split(" ")[1]}</h4>
      </Link>
    )
  }
}

export default Category
