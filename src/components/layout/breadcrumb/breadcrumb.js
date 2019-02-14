import React, { Component } from 'react'
import { Link } from 'gatsby'

import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BSCSBreadcrumb = class extends Component {
  constructor(props) {
    super(props)
    this.pathlist = this.props.pathname.split('/').slice(1) 
  }

  format = (string) => {
    let words = string.replace(/-/g, ' ')
    let formatted = words.charAt(0).toUpperCase()
    for(let i = 1; i < words.length; i++) {
      if(words[i] === ' ') {
        formatted = formatted + words[i] + words[i+1].toUpperCase()
        i++
      } else {
        formatted = formatted + words[i]
      }
    }

    return formatted
  }

  render() {
    return (
      <Breadcrumb>
        <Link to='/' className="breadcrumb-item">Home</Link>
        {/* <p>{this.pathlist.toString()}</p> */}
        {this.pathlist.map((path,index) => {
          // for(let i = 1; i <= this.props.activeDepth; i++) {
            // if(this.pathlist[this.pathlist.length - 1] === path) {
            if(index < this.pathlist.length - this.props.activeDepth) {
              return(<Link className="breadcrumb-item" to={`/${path}`}>{this.format(path)}</Link>)
            } else {
              return (
                <div className="breadcrumb-item active">{this.format(path)}</div>
              )
            }
          // }
        })}
      </Breadcrumb>
    )
  }
}

export default BSCSBreadcrumb


