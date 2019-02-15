import React, { Component } from 'react'
import { Link } from 'gatsby'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)
    this.pathlist = this.props.pathname.split('/').slice(1) 
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

  render() {
    let current_path = ''
    const null_paths = ['resources', 'upcoming-programs', 'connect']
    return (
      <Breadcrumb>
        <Link to='/' className="breadcrumb-item">Home</Link>
        {this.pathlist.map((path,index) => {
          if(this.pathlist[this.pathlist.length - 1] === path || null_paths.indexOf(path) > -1) {
            current_path = `/${current_path}/${path}`
            if(path === this.props.title.replace(/\s/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()) {
              return (
                <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.props.title}</div>
              )
            } else {
              return (
                <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.format(path)}</div>
              )
            }
          } else {
            current_path = `/${current_path}/${path}`
            return(<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`${current_path}`}>{this.format(path)}</Link>)
          }
        })}
      </Breadcrumb>
    )
  }
}

export default BSCSBreadcrumb


