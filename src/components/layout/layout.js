import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header'
import Footer from './footer/footer'

import './layout.scss'


const Layout = ({ children, location }) => {
  return(
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
              description
            }
          }
        }
      `}
      render={data => (
        <>
          <Header location={location} />
          {children}
          <Footer location={location} />
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
