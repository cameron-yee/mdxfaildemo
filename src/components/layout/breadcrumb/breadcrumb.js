import React, { Component } from 'react'
import { Link } from 'gatsby'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)
    this.pathlist = this.props.pathname.split('/').slice(1) 
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    return (
      <Breadcrumb>
        <Link to='/' className="breadcrumb-item">Home</Link>
        {this.pathlist.map(path => {
          if(this.pathlist[this.pathlist.length - 1] === path) {
            return (
                <div className="breadcrumb-item active">Educator Resource Center</div>
            )
          } else {
            return(<Link className="breadcrumb-item" to={`/${path}`}>{this.capitalize(path)}</Link>)
          }
        })}
      </Breadcrumb>
    )
  }
}

export default BSCSBreadcrumb


