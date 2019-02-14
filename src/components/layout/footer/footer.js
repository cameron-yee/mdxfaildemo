import React, { Component } from 'react'
import AniLink from 'gatsby-plugin-transition-link'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'
import JoinEmailList from '../../atoms/join-email-list/join-email-list'

// import nsfLogo from '../images/nsf_logo.svg'
// import osuLogo from '../images/osu_logo.svg'
// import spencerLogo from '../images/spencer_logo.png'


export default class Footer extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      families: {
        parent01: { title: `About`,
          children: {
            child01: { title: `Our Story`, path: `/about/our-story/` },
            // child02: { title: `Staff`, path: `/about/staff/` },
            // child03: { title: `Board Members`, path: `/about/board-members/` },
            child02: { title: `Leadership`, path: `/about/leadership/` },
            child03: { title: `Financials`, path: `/about/financials/` },
            child04: { title: `Brand Materials`, path: `/about/brand-materials/` }
          }
        },
        parent02: { title: `Our Work`,
          children: {
            child01: { title: `What We Do`, path: `/our-work/what-we-do/` },
            child02: { title: `Strategic Initiatives`, path: `/our-work/strategic-initiatives/` },
            child03: { title: `R&D Programs`, path: `/our-work/rd-programs/` },
            child04: { title: `News`, path: `/our-work/news/` }
          }
        },
        parent03: { title: `Resources`,
          children: {
            child01: { title: `Educator Resource Center`, path: `/resources/educator-resource-center/` },
            child02: { title: `Research Resource Center`, path: `/resources/research-resource-center/` }
          }
        },
        parent04: { title: `Upcoming Programs`,
          children: {
            child01: { title: `Teacher Professional Learning`, path: `/upcoming-programs/teacher-professional-learning/` },
            child02: { title: `Leadership Development`, path: `/upcoming-programs/leadership-development/` },
            child03: { title: `Field-Test Opportunities`, path: `/upcoming-programs/field-test-opportunities/` }
          }
        },
        parent05: { title: `Connect`,
          children: {
            child01: { title: `Contact Us`, path: `/connect/contact-us/` },
            child02: { title: `Join E-mail List`, path: `/connect/join-email-list/` },
            child03: { title: `Work with Us`, path: `/connect/work-with-us/` },
            child04: { title: `Employment Opportunities`, path: `/connect/employment-opportunities/` }
          }
        }
      }
    }
  }

  render() {
    return (
      <footer className="bg-light" style={{ paddingTop: "3rem" }}>
        <Container fluid>
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              {/* <Button variant="primary">Join Email List</Button> */}
              <JoinEmailList />
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://www.facebook.com/BSCSORG/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square" style={{ fontSize: '2.6rem' }}></i>
              </a>
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://twitter.com/BSCSorg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter-square" style={{ fontSize: '2.6rem' }}></i>
              </a>
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://www.linkedin.com/company/bscs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin" style={{ fontSize: '2.6rem' }}></i>
              </a>
            </div>
          </div>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <hr style={{ margin: '2.5rem 0 4.5rem' }} />
            </Col>
          </Row>
        </Container>
        <Container >
          <Row className="justify-content-center">
            {
              Object.keys(this.state.families).map((parent, index) => {
                return (
                  <Col key={index}>
                    <h4>{this.state.families[parent].title}</h4>
                    <Nav className="flex-column">
                      {
                        Object.keys(this.state.families[parent].children).map((child, key) => {
                          return (
                            <AniLink
                              to={this.state.families[parent].children[child].path}
                              key={key}
                              className="nav-link"
                            >
                              {this.state.families[parent].children[child].title}
                            </AniLink>
                          )
                        })
                      }
                    </Nav>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <hr style={{ margin: '3.5rem 0 2.5rem' }} />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Container>
              <Row>
                <Col>
                  <p style={{ textAlign: "center" }}>
                    Copyright © BSCS Science Learning, {new Date().getFullYear()}. All rights reserved.
                  </p>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </footer>
    )
  }
}
