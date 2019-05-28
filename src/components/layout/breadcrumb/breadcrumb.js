import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)
    if(this.props.pathname[this.props.pathname.length - 1] === '/') {
      this.pathlist = this.props.pathname.split('/').slice(1, -1)
    } else {
      this.pathlist = this.props.pathname.split('/').slice(1)
    }
    this.format = this.format.bind(this)
    this.replace = this.replace.bind(this)
  }

  format = (string) => {
    let formatted = string.charAt(0).toUpperCase()
    for(let i = 1; i < string.length; i++) {
      if(string[i] === '-') {
        formatted = formatted + ' ' + string[i+1].toUpperCase()
        i++
      } else {
        formatted = formatted + string[i]
      }
    }

    return formatted
  }

  replace = (string) => {
    if(this.props.replace && this.props.replace[0] === string) {
      return this.props.replace[1]
    } else {
      return string
    }
  }

  render() {
    let current_path = ''
    const null_paths = ['resources', 'teacher-professional-learning', 'leadership-development', 'field-test-opportunities', 'connect', 'our-work', 'about', 'openscied']
    return (
        <Breadcrumb className={this.props.className}>
          <Link to='/' className="breadcrumb-item">Home</Link>
          {this.pathlist.map((path,index) => {
            if(this.pathlist[this.pathlist.length - 1] === path || null_paths.indexOf(path) > -1) { //If path is the last element in pathlist of a null path
              current_path !== '' ? current_path = `${current_path}/${path}` : current_path = `/${path}`
              if(this.props.title && path === this.props.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()) {
                return (
                  <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.props.title}</div>
                )
              } else {
                return (
                  <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.format(path)}</div>
                )
              }
            } else {
              current_path !== '' ? current_path = `${current_path}/${path}` : current_path = `/${path}`
              if(this.props.replace !== undefined) {
                return(<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`${current_path}`}>{this.replace(path)}</Link>)
              } else {
                return(<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`${current_path}`}>{this.format(path)}</Link>)
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


