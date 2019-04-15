import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import SpinDropdown from '../../../../atoms/spin-dropdown/spin-dropdown'

import '../../header.scss'
import './navigation.scss'
import '../../../../../global-scss/index.scss'


export default class DesktopNavigation extends Component {
  render() {
    return (
      <StaticQuery query={
        graphql`
          query desktopNavigationQuery {
            allNavigationJson {
              edges {
                node {
                  title
                  footerOnly
                  iconClass
                  items {
                    itemTitle
                    iconClass
                    path
                    onClick
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <SpinDropdown>
              <Navbar
                bg="transparent"
                expand="lg"
              >
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" style={{ border: 0, outline: 'none' }} />
                <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
                  <Nav className="m-auto">
                    {
                      data.allNavigationJson.edges.map((edge, index) => {
                        return (
                          <React.Fragment key={`menu-${index}`}>
                            { "items" in edge.node && !edge.node.footerOnly &&
                              <NavDropdown
                                title={edge.node.title}
                                className={
                                  edge.node.items.map((item, index) => {
                                    return(
                                      this.props.location.pathname.includes(item.path) && item.path !== "/join/" ? "active fadeMe" : "fadeMe"
                                    )
                                  })
                                }
                              >
                                {
                                  edge.node.items.map((item, index) => {
                                    return(
                                      <React.Fragment key={`item-${index}`}>
                                        {
                                          !item.onClick
                                          ?
                                          <Link
                                            className="dropdown-item"
                                            to={item.path}
                                          >
                                            {item.itemTitle}
                                            { item.iconClass
                                              ? <>&nbsp; <i className={item.iconClass}></i></>
                                              : null
                                            }
                                          </Link>
                                          :
                                          item.onClick === "this.props.launchJoinEmail"
                                          ?
                                          <div
                                            className="dropdown-item"
                                            onClick={this.props.launchJoinEmail}
                                            style={{
                                              cursor: "pointer"
                                            }}
                                          >
                                            {item.itemTitle}
                                            { item.iconClass
                                              ? <>&nbsp; <i className={item.iconClass}></i></>
                                              : null
                                            }
                                          </div>
                                          :
                                          <div
                                            className="dropdown-item"
                                            onClick={this.props.launchGeneral}
                                            style={{
                                              cursor: "pointer"
                                            }}
                                          >
                                            {item.itemTitle}
                                            { item.iconClass
                                              ? <>&nbsp; <i className={item.iconClass}></i></>
                                              : null
                                            }
                                          </div>
                                        }
                                      </React.Fragment>
                                    )
                                  })
                                }
                              </NavDropdown>
                            }
                            { !("items" in edge.node) && !edge.node.footerOnly &&
                              <Link
                                className={this.props.location.pathname.includes(edge.node.path) ? "nav-link active" : "nav-link"}
                                to={edge.node.path}
                              >
                                {edge.node.title}
                                {
                                  edge.node.iconClass ? <>&nbsp; <i className={edge.node.iconClass}></i></> : null
                                }
                              </Link>
                            }
                          </React.Fragment>
                        )
                      })
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </SpinDropdown>
          )
        }}
      />
    )
  }
}
