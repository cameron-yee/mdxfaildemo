import React, { Component } from 'react'
import { Link } from 'gatsby'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tagline from './tagline/tagline'
import JoinModal from '../../atoms/join-email-list/join-modal/join-modal'

import MobileNavigation from './navigation/mobile/navigation'
import DesktopNavigation from './navigation/desktop/navigation'

import './header.scss'

import bscsLogo from '../../../images/bscs_logo.svg'

import '../../../global-scss/index.scss'


export default class Header extends Component {
    constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
    }

    this.launch = this.launch.bind(this)
    this.close = this.close.bind(this)
  }

  launch = () => { this.setState({modalShow: true}) }
  close = () => { this.setState({modalShow: false}) }

  render() {
    return (
      <>
        <Container fluid>
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <Link to="/">
                <img
                  className="bscsLogo img-fluid"
                  src={bscsLogo}
                  alt="BSCS Science Learning logo"
                  style={{
                    width: "300px"
                  }}
                />
              </Link>
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
        <Container className="d-none d-lg-block" fluid>
          <Row>
            <Col>
              <hr className="d-sm-none" style={{ marginBottom: '0', marginTop: '3.5rem' }} />
              <DesktopNavigation
                location={this.props.location}
                launch={this.launch}
              />
            </Col>
          </Row>
        </Container>
        <Container className="d-lg-none" fluid>
          <Row>
            <Col>
              <hr className="d-sm-none" style={{ marginBottom: '0', marginTop: '3.5rem' }} />
              <MobileNavigation
                location={this.props.location}
                launch={this.launch}
              />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <hr className="" style={{ margin: '0' }} />
        </Container>
        <JoinModal show={this.state.modalShow} onHide={this.close} />
      </>
    )
  }
}
