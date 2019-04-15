import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header'
import Footer from './footer/footer'
import GeneralContactFormModal from '../atoms/forms/general-contact-form/general-contact-form-modal/general-contact-form-modal'
import JoinEmailFormModal from '../atoms/forms/join-email-form/join-email-form-modal/join-email-form-modal'

import 'typeface-open-sans'
import 'typeface-lora'
import './layout.scss'


const Layout = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShowGeneral: false,
      modalShowJoinEmail: false
    }
  }

  launchGeneral = () => { this.setState({modalShowGeneral: true}) }
  closeGeneral = () => {
    this.setState({modalShowGeneral: false})
    if(this.props.closeGeneral) {
      this.props.closeGeneral()
    }
  }

  launchJoinEmail = () => { this.setState({modalShowJoinEmail: true}) }
  closeJoinEmail = () => {
    this.setState({modalShowJoinEmail: false})
    if(this.props.closeJoinEmail) {
      this.props.closeJoinEmail()
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.launchGeneral && prevProps.launchGeneral !== this.props.launchGeneral) {
      this.setState({modalShowGeneral: true})
    }

    if(this.props.launchJoinEmail && prevProps.launchJoinEmail !== this.props.launchJoinEmail) {
      this.setState({modalShowJoinEmail: true})
    }
  }

  render() {
    return (
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
          <React.Fragment>
            <Header
              launchGeneral={this.launchGeneral}
              launchJoinEmail={this.launchJoinEmail}
              location={this.props.location}
            />
            {this.props.children}
            <Footer
              launchGeneral={this.launchGeneral}
              launchJoinEmail={this.launchJoinEmail}
              location={this.props.location}
            />
            <GeneralContactFormModal
              show={this.state.modalShowGeneral}
              onHide={this.closeGeneral}
            />
            <JoinEmailFormModal
              show={this.state.modalShowJoinEmail}
              onHide={this.closeJoinEmail}
            />
          </React.Fragment>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
