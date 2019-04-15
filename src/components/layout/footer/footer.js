import React, { Component } from 'react'
import {graphql, StaticQuery, Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import JoinEmailListFormButton from '../../atoms/forms/join-email-form/join-email-list-form-button/join-email-list-form-button'
import GeneralContactFormButton from '../../atoms/forms/general-contact-form/general-contact-form-button/general-contact-form-button'

import './footer.scss'


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
          <Container>
            <Row className="justify-content-center justify-content-md-start">
              { data.allNavigationJson.edges.map((edge, index) => {
                return (
                  <Col
                    xs={12}
                    md={6}
                    className="col-lg text-center text-md-left"
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
                            <React.Fragment key={`item-${index}`}>
                              {
                                !item.onClick
                                ?
                                <Link
                                  to={item.path}
                                  className={
                                    this.props.location.pathname.includes(item.path) && item.path !== "/join/" ? "nav-link footer-nl active" : "nav-link footer-nl"
                                  }
                                >
                                  {item.itemTitle}
                                </Link>
                                :
                                item.onClick === "this.props.launchJoinEmail"
                                ?
                                <div
                                  className="nav-link footer-nl"
                                  onClick={this.props.launchJoinEmail}
                                  style={{
                                    cursor: "pointer"
                                  }}
                                >
                                  {item.itemTitle}
                                </div>
                                :
                                <div
                                  className="nav-link footer-nl"
                                  onClick={this.props.launchGeneral}
                                  style={{
                                    cursor: "pointer"
                                  }}
                                >
                                  {item.itemTitle}
                                </div>
                              }
                            </React.Fragment>
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
          <Row className="d-sm-none justify-content-center">
            <Col xs={12} className="p-2 m-auto text-center">
              <JoinEmailListFormButton launch={this.props.launchJoinEmail} />
            </Col>
            <Col xs={12} className="p-2 m-auto text-center">
              <div className="d-flex justify-content-center">
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
            </Col>
          </Row>
          <div className="d-none d-sm-flex">
            <div className="p-2 flex-grow-1">
              <JoinEmailListFormButton launch={this.props.launchJoinEmail} />
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
              <hr style={{ margin: '2rem 0 2.5rem' }} />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="d-sm-none justify-content-center">
            <Col xs={12} className="p-2 m-auto text-center">
              <GeneralContactFormButton launch={this.props.launchGeneral}>Contact Us</GeneralContactFormButton>
            </Col>
            <Col xs={12} className="p-2 m-auto text-center">
              <a href="tel:719-531-5550">
                <div className="d-flex">
                  <div className="m-auto">
                    719-531-5550&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup>
                    <br />
                  </div>
                </div>
              </a>
              <a href="https://goo.gl/maps/y5uT65epu1E2" target="_blank" rel="noopener noreferrer">
                <div className="d-flex">
                  <div className="m-auto">
                      5415 Mark Dabling Blvd.&nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup><br />
                      Colorado Springs, CO 80918

                  </div>
                </div>
              </a>
            </Col>
          </Row>
          <div className="d-none d-sm-flex">
            <div className="p-2 mr-auto align-self-center">
              <GeneralContactFormButton launch={this.props.launchGeneral}>Contact Us</GeneralContactFormButton>
            </div>
            <div
              className="p-2 ml-auto align-self-center"
              style={{
                textAlign: 'right'
              }}
            >
              <a href="tel:719-531-5550">
                <div className="d-flex">
                  <div className="ml-auto">
                    719-531-5550<br />
                  </div>
                  <div>
                    &nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup>
                  </div>
                </div>
              </a>
              <a href="https://goo.gl/maps/y5uT65epu1E2" target="_blank" rel="noopener noreferrer">
                <div className="d-flex">
                  <div className="ml-auto">
                      5415 Mark Dabling Blvd.<br />
                      Colorado Springs, CO 80918
                  </div>
                  <div>
                    &nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <hr style={{ margin: '2rem 0 2.5rem' }} />
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
