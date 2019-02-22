import React, { Component } from 'react'
import {graphql, StaticQuery } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link'

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
      render={data => (
          data.allNavigationJson.edges.map((edge, index) => {
            return (
              <Col key={`menu-${index}`}>
                <h4>{edge.node.title}</h4>
                <Nav className="flex-column">
                  {
                    edge.node.items.map((item, index) => {
                      return (
                        <AniLink
                          to={item.path}
                          key={`item-${index}`}
                          className="nav-link"
                        >
                          {item.itemTitle}
                        </AniLink>
                      )
                    })
                  }
                </Nav>
              </Col>
            )
          })
      )}
      />)

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
