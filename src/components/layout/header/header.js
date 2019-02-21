import React, { Component } from 'react'
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
  constructor(props, context) {
    super(props, context)

    this.state = {
      pages: {
        page01: {
          title: `Our Work`,
          iconClass: ``,
          children: {
            child01: {
              title: `What We Do`,
              path: `/our-work/what-we-do/`,
              iconClass: ``
            },
            child02: {
              title: `Strategic Initiatives`,
              path: `/our-work/strategic-initiatives/`,
              iconClass: ``
            },
            child03: {
              title: `R&D Programs`,
              path: `/our-work/rd-programs/`,
              iconClass: ``
            },
            child04: {
              title: `News`,
              path: `/our-work/news/`,
              iconClass: ``
            }
          }
        },
        page02: {
          title: `Resources`,
          iconClass: ``,
          children: {
            child01: {
              title: `Educator Resource Center`,
              path: `/resources/educator-resource-center/`,
              iconClass: ``
            },
            child02: {
              // title: `Research Resource Center`,
              // path: `/resources/research-resource-center/`,
              title: `Reports`,
              path: `resources/reports`,
              iconClass: ``
            }
          }
        },
        page03: {
          title: `Upcoming Programs`,
          iconClass: ``,
          children: {
            child01: {
              title: `Teacher Professional Learning`,
              path: `/upcoming-programs/teacher-professional-learning/`,
              iconClass: ``
            },
            child02: {
              title: `Leadership Development`,
              path: `/upcoming-programs/leadership-development/`,
              iconClass: ``
            },
            child03: {
              title: `Field-Test Opportunities`,
              path: `/upcoming-programs/field-test-opportunities/`,
              iconClass: ``
            }
          }
        },
        page04: {
          title: `Connect`,
          iconClass: ``,
          children: {
            child01: {
              title: `Contact Us`,
              path: `/connect/contact-us/`,
              iconClass: ``
            },
            child02: {
              title: `Join E-mail List`,
              path: `/connect/join-email-list/`,
              iconClass: ``
            },
            child03: {
              title: `Work with Us`,
              path: `/connect/work-with-us/`,
              iconClass: ``
            },
            child04: {
              title: `Employment Opportunities`,
              path: `/connect/employment-opportunities/`,
              iconClass: ``
            }
          }
        },
        // page05: {
        //   title: ``,
        //   path: ``,
        //   iconClass: `fas fa-search`
        // }
      }
    }
  }
  
  render() {
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
              {/* <Button variant="outline-primary btn-sm" className="hvr-sweep-to-right"><i className="fas fa-donate"></i>&nbsp; Donate</Button> */}
            </div>
            <div className="p-2 align-self-center d-none d-sm-inline-block">
              <Button variant="outline-primary btn-sm" className="slide">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
              {/* <Button variant="outline-primary btn-sm" className="hvr-sweep-to-right outline-primary">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button> */}
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
                      {
                        Object.keys(this.state.pages).map((page, key) => {
                          return (
                            <div key={key}>
                              {
                                this.state.pages[page].children
                                ?
                                <NavDropdown
                                  title={this.state.pages[page].title}
                                  id="basic-nav-dropdown"
                                  className={
                                    Object.keys(this.state.pages[page].children).map((child, index) => {
                                      return(
                                        this.props.location.pathname.includes(this.state.pages[page].children[child].path)
                                        ?
                                        "active"
                                        :
                                        null
                                      )
                                    })
                                  }
                                >
                                  {
                                    Object.keys(this.state.pages[page].children).map((child, index) => {
                                      console.log(this.state.pages[page].children[child].iconClass)
                                      return(
                                        <AniLink
                                          className="dropdown-item"
                                          to={this.state.pages[page].children[child].path}
                                          key={index}
                                        >
                                          {this.state.pages[page].children[child].title}
                                          {
                                            this.state.pages[page].children[child].iconClass
                                            ?
                                            <>
                                              &nbsp; <i className={this.state.pages[page].children[child].iconClass}></i>
                                            </>
                                            :
                                            null
                                          }
                                        </AniLink>
                                      )
                                    })
                                  }
                                </NavDropdown>
                                :
                                <AniLink
                                  className={
                                    this.props.location.pathname.includes(this.state.pages[page].path)
                                    ?
                                    "nav-link active"
                                    :
                                    "nav-link"
                                  }
                                  to={this.state.pages[page].path}
                                >
                                  {this.state.pages[page].title}
                                  {
                                    this.state.pages[page].iconClass
                                    ?
                                    <>
                                      &nbsp; <i className={this.state.pages[page].iconClass}></i>
                                    </>
                                    :
                                    null
                                  }
                                </AniLink>
                              }
                            </div>
                          )
                        })
                      }
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
