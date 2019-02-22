import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SpinDropdown from '../../atoms/spin-dropdown/spin-dropdown'
import Tagline from './tagline/tagline'

import './header.scss'

import bscsLogo from '../../../images/bscs_logo.svg'

import '../../../global-scss/index.scss'


export default class Header extends Component {
  render() {
    const navigation =
      (<StaticQuery query={graphql`
        query headerNavigationQuery {
          allNavigationJson {
            edges {
              node {
                title
                footerOnly
                iconClass
                # path
                items {
                  itemTitle
                  iconClass
                  path
                }
              }
            }
          }
        }
      `}
      render={data => (
        data.allNavigationJson.edges.map((edge, index) => {
          return (
            <div key={`menu-${index}`}>
              { "items" in edge.node && !edge.node.footerOnly &&
                
                <NavDropdown
                  title={edge.node.title}
                  id="basic-nav-dropdown"
                  className={
                    edge.node.items.map((item, index) => {
                      return(
                        this.props.location.pathname.includes(item.path) ? "active" : null
                      )
                    })
                  }
                >
                  {
                    edge.node.items.map((item, index) => {
                      return(
                        <AniLink className="dropdown-item" to={item.path} key={`item-${index}`} >
                          {item.itemTitle}
                          { item.iconClass
                            ? <React.Fragment>&nbsp; <i className={item.iconClass}></i></React.Fragment>
                            : null
                          }
                        </AniLink>
                      )
                    })
                  }
                </NavDropdown>
              }
              { !("items" in edge.node) && !edge.node.footerOnly &&
                <AniLink
                  className={this.props.location.pathname.includes(edge.node.path) ? "nav-link active" : "nav-link"} 
                  to={edge.node.path}
                >
                  {edge.node.title}
                  {
                    edge.node.iconClass ? <React.Fragment>&nbsp; <i className={edge.node.iconClass}></i></React.Fragment> : null
                  }
                </AniLink>
              }
            </div>
          )
        })
      )}
    />)

    return (
      <div>
        <Container fluid>
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <AniLink to="/">
                <img
                  className="bscsLogo"
                  src={bscsLogo}
                  alt="BSCS Science Learning logo"
                  style={{
                    width: "300px"
                  }}
                />
              </AniLink>
            </div>
            <div className="p-2 align-self-center d-none d-sm-inline-block">
              <Button variant="outline-primary btn-sm"><i className="fas fa-donate"></i>&nbsp; Donate</Button>
            </div>
            <div className="p-2 align-self-center d-none d-sm-inline-block">
              <Button variant="outline-primary btn-sm" className="slide">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
            </div>
          </div>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <div className="tagline-wrapper">
                <Tagline />
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <hr className="d-sm-none" style={{ marginBottom: '0', marginTop: '3.5rem' }} />
              <SpinDropdown>
                <Navbar
                  bg="transparent"
                  expand="lg"
                >
                  <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" style={{ border: 0, outline: 'none' }} />
                  <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
                    <Nav className="m-auto">
                      {navigation}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </SpinDropdown>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <hr className="" style={{ margin: '0' }} />
        </Container>
      </div>
    )
  }
}