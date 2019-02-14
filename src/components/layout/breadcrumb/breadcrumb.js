import React, { Component } from 'react'
import { Link } from 'gatsby'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)
    this.pathlist = this.props.pathname.split('/').slice(1, -1) 
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
    return (
      <Breadcrumb>
        <Link to='/' className="breadcrumb-item">Home</Link>
        {this.pathlist.map((path,index) => {
            if(index < this.pathlist.length - this.props.activeDepth) {
              return(<Link key={`breadcrumb-${index}`} className="breadcrumb-item" to={`/${path}`}>{this.format(path)}</Link>)
            } else {
              return (
                <div key={`breadcrumb-${index}`} className="breadcrumb-item active">{this.format(path)}</div>
              )
            }
        })}
      </Breadcrumb>
    )
  }
}

export default BSCSBreadcrumb


