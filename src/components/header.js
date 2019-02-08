import React, { Component } from 'react'
import { Link } from 'gatsby'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tagline from './tagline'

import './header.scss'

import bscsLogo from '../images/bscs_logo.svg'


export default class Header extends Component {
  state = {
    pages: {
      page01: { title: `Agenda`, path: `/agenda/`, iconClass: `` },
      page02: { title: `Keynote`, path: `/keynote/`, iconClass: `` },
      page03: { title: `Summit Story`, path: `/summit-story/`, iconClass: `` },
      page04: { title: `Forums`, path: `/forums/`, iconClass: `` }
    }
  }
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Navbar
                bg="transparent"
                expand="lg"
                style={{
                  paddingTop: "1.5rem"
                }}
              >
                <Link to="/">
                  <Navbar.Brand>
                    <img
                      className="bscsLogo"
                      src={bscsLogo}
                      alt="BSCS Science Learning logo"
                      style={{
                        width: "300px"
                      }}
                    />
                  </Navbar.Brand>
                </Link>
                <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
                  <Nav className="ml-auto">
                    {
                      Object.keys(this.state.pages).map((page) => {
                        return (
                          <Link
                            className="nav-link"
                            to={this.state.pages[page].path}
                            key={page}
                          >
                            {this.state.pages[page].title}
                          </Link>
                        )
                      })
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        <Container fluid className="d-lg-none">
          <Row>
            <Col>
              <div className="tagline-wrapper">
                <Tagline />
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="d-lg-none">
          <Row>
            <Col>
              <hr className="d-sm-none" style={{ marginBottom: '0', marginTop: '3.5rem' }} />
              <Navbar
                bg="transparent"
                expand="lg"
              >
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" style={{ border: 0, outline: 'none' }} />
                {/* <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                    <span> </span>
                    <span> </span>
                    <span> </span>
                </button> */}
                <Navbar.Collapse id="basic-navbar-nav" className="navbarCollapse">
                  <Nav className="ml-auto">
                    {
                      Object.keys(this.state.pages).map((page) => {
                        return (
                          <Link
                            className="nav-link"
                            to={this.state.pages[page].path}
                            key={page}
                          >
                            {this.state.pages[page].title}
                          </Link>
                        )
                      })
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        <Container className="d-none d-lg-block" fluid>
          {/* <div style={{ padding: '1rem 0', marginBottom: '2rem' }}> */}
          <div style={{ margin: '2rem 0' }}>
            <Tagline />
          </div>
        </Container>
        <Container className="d-lg-none" fluid>
          <hr style={{ marginTop: '0' }} />
        </Container>
      </div>
    )
  }
}
