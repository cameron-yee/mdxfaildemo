import React, { Component } from 'react'
import {graphql, StaticQuery, Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'
import JoinEmailList from '../../atoms/join-email-list/join-email-list'
import './footer.scss'

// import nsfLogo from '../images/nsf_logo.svg'
// import osuLogo from '../images/osu_logo.svg'
// import spencerLogo from '../images/spencer_logo.png'


export default class Footer extends Component {
  // constructor(props, context) {
  //   super(props, context)
  // }

  render() {
    const navigation =
      (<StaticQuery query={graphql`
        query footerNavigationQuery {
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
      render={data => {
        return (
          <Container>
            <Row className="justify-content-center">
              { data.allNavigationJson.edges.map((edge, index) => {
                return (
                  <Col
                    xs={12}
                    className="col-lg text-center text-lg-left"
                    key={`menu-${index}`}
                    style={{
                      marginBottom: '2rem'
                    }}
                  >
                    <h4>{edge.node.title}</h4>
                    <Nav className="flex-column">
                      {
                        edge.node.items.map((item, index) => {
                          return (
                            <Link
                              to={item.path}
                              key={`item-${index}`}
                              className="nav-link"
                            >
                              {item.itemTitle}
                            </Link>
                          )
                        })
                      }
                    </Nav>
                  </Col>
                )
              })}
            </Row>
          </Container>
        )
      }}
      />)

    return (
      <footer className="bg-light" style={{ paddingTop: "3rem" }}>
        <Container fluid>
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <JoinEmailList />
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://www.facebook.com/BSCSORG/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square facebook-social-icon" style={{ fontSize: '2.6rem' }}></i>
              </a>
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://twitter.com/BSCSorg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter-square twitter-social-icon" style={{ fontSize: '2.6rem' }}></i>
              </a>
            </div>
            <div className="p-2 align-self-center">
              <a
                href="https://www.linkedin.com/company/bscs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin linkedin-social-icon" style={{ fontSize: '2.6rem' }}></i>
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
            {navigation}
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
