import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'typeface-open-sans'
import 'typeface-lora'
import './layout.scss'

const Layout = class extends Component {
  render() {
    // const children_with_props = React.Children.map(this.props.children, child => {
    //   React.cloneElement(child, { signed_in: this.state.signed_in})
    // })

    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
