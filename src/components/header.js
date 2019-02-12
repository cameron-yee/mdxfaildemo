import React, { Component } from 'react'
import { Link } from 'gatsby'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tagline from './tagline'

import './header.scss'

import bscsLogo from '../images/bscs_logo.svg'


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
              path: `/what-we-do/`,
              iconClass: ``
            },
            child02: {
              title: `Strategic Initiatives`,
              path: `/strategic-initiatives/`,
              iconClass: ``
            },
            child03: {
              title: `R&D Programs`,
              path: `/rd-programs/`,
              iconClass: ``
            },
            child04: {
              title: `News`,
              path: `/news/`,
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
              path: `/educator-resource-center/`,
              iconClass: ``
            },
            child02: {
              title: `Research Resource Center`,
              path: `/research-resource-center/`,
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
              path: `/teacher-professional-learning/`,
              iconClass: ``
            },
            child02: {
              title: `Leadership Development`,
              path: `/leadership-development/`,
              iconClass: ``
            },
            child03: {
              title: `Field-Test Opportunities`,
              path: `/field-test-opportunities/`,
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
              path: `/contact-us/`,
              iconClass: ``
            },
            child02: {
              title: `Join E-mail List`,
              path: `/join-email-list/`,
              iconClass: ``
            },
            child03: {
              title: `Work with Us`,
              path: `/partner-with-us/`,
              iconClass: ``
            }
          }
        },
        page05: {
          title: `Sign In`,
          path: ``,
          iconClass: `fas fa-sign-in-alt`
        },
        page06: {
          title: ``,
          path: ``,
          iconClass: `fas fa-search`
        }
      }
    }
  }
  
  render() {
    return (
      <div>
        <Container fluid>
          <div class="d-flex">
            <div class="p-2 flex-grow-1">
              <img
                className="bscsLogo"
                src={bscsLogo}
                alt="BSCS Science Learning logo"
                style={{
                  width: "300px"
                }}
              />
            </div>
            <div class="p-2 align-self-center d-none d-sm-inline-block">
              <Button variant="outline-primary btn-sm"><i class="fas fa-donate"></i>&nbsp; Donate</Button>
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
                                      this.state.pages[page].children[child].path === this.props.location.pathname
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
                                      <Link
                                        className="dropdown-item"
                                        to={this.state.pages[page].children[child].path}
                                        key={index}
                                      >
                                        {this.state.pages[page].children[child].title}
                                        {
                                          this.state.pages[page].children[child].iconClass
                                          ?
                                          <>
                                            &nbsp; <i class={this.state.pages[page].children[child].iconClass}></i>
                                          </>
                                          :
                                          null
                                        }
                                      </Link>
                                    )
                                  })
                                }
                              </NavDropdown>
                              :
                              <Link
                                className={
                                  this.state.pages[page].path === this.props.location.pathname
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
                                    &nbsp; <i class={this.state.pages[page].iconClass}></i>
                                  </>
                                  :
                                  null
                                }
                              </Link>
                            }
                          </div>
                        )
                      })
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <hr className="d-lg-none" style={{ marginTop: '0' }} />
        </Container>
      </div>
    )
  }
}
