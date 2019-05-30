import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

/* BSCSBreadcrumb functions
  *
  * constructor(props) {...}
  * format = (path) => {...}
  * render() {...}
  *
*/

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)

    if (this.props.pathname[this.props.pathname.length - 1] === '/') {
      this.pathlist = this.props.pathname.split('/').slice(1, -1)
    } else {
      this.pathlist = this.props.pathname.split('/').slice(1)
    }
  }

  // Returns string with all the first letters capitalized after spaces
  format = (path) => {
    let formatted

    formatted = path.charAt(0).toUpperCase()

    for (let i = 1; i < path.length; i++) {
      if (path[i] === '-') {
        formatted = formatted + ' ' + path[i+1].toUpperCase()
        i++
      } else {
        formatted = formatted + path[i]
      }
    }

    return formatted
  }

  render() {
    let current_path, null_paths;

    current_path = ''
    null_paths = ['resources', 'teacher-professional-learning', 'leadership-development', 'field-test-opportunities', 'connect', 'our-work', 'about', 'openscied']

    return (
        <Breadcrumb className={this.props.className}>
          <Link to='/' className="breadcrumb-item">Home</Link>
          {this.pathlist.map((path,index) => {
            if (
              this.pathlist[this.pathlist.length - 1] === path
              || null_paths.indexOf(path) > -1
            ) { //If path is the last element in pathlist or a null path
              current_path !== '' ? current_path = `${current_path}/${path}` : current_path = `/${path}`
              if (this.props.title && path === this.props.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()) {
                return (
                  <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.props.title}</div>
                )
              } else if (this.props.replace && path === this.props.replace[0]) {
                return (
                  <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.props.replace[1]}</div>
                )
              } else {
                return (
                  <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.format(path)}</div>
                )
              }
            } else {
              current_path !== '' ? current_path = `${current_path}/${path}` : current_path = `/${path}`
              if (this.props.replace && path === this.props.replace[0]) {
                return (<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`${current_path}`}>{this.props.replace[1]}</Link>)
              } else {
                return (<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`${current_path}`}>{this.format(path)}</Link>)
              }
            }
          })}
        </Breadcrumb>
    )
  }
}

BSCSBreadcrumb.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  replace: PropTypes.array
}

export default BSCSBreadcrumb


