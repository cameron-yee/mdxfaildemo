import React, { Component } from 'react'
import { Link } from 'gatsby'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tagline from './tagline/tagline'
// import JoinModal from '../../atoms/forms/join-email-form/join-email-form-modal/join-email-form-modal'

import MobileNavigation from './navigation/mobile/navigation'
import DesktopNavigation from './navigation/desktop/navigation'

import './header.scss'

import bscsLogo from '../../../images/bscs_logo.svg'

import '../../../global-scss/index.scss'
import SigninFormLaunchModal from '../../atoms/forms/signin-form/signin-form-launch-modal';

import SignOut from '../../atoms/sign-out/sign-out'

/* Header functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * launch = () => {...}
  * close = () => {...}
  *
*/

export default class Header extends Component {
    constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
      on_dashboard: false
    }
  }

  //Don't want to show dashboard navigation button if on dashboard page already
  componentDidMount() {
    try {
      if(window.location.pathname === '/dashboard') {
        this.setState({on_dashboard: true})
      }
    } catch(error) {
      console.log(error)
    }
  }

  launch = () => { this.setState({modalShow: true}) }
  close = () => { this.setState({modalShow: false}) }

  render() {
    return (
      <>
        <Container fluid>
          <div className="d-flex">
            <div className="p-2 flex-grow-1 mt-4">
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
            {/* <div className="p-2 align-self-center d-none d-sm-inline-block">
              <Link to="/donate"><Button variant="outline-primary btn-sm"><i className="fas fa-donate"></i>&nbsp; Donate</Button></Link>
            </div> */}
            <div className="p-2 align-self-center d-none d-sm-inline-block">
              {!this.props.signed_in &&
                <SigninFormLaunchModal launchSignin={this.props.launchSignin}>
                  <Button variant="outline-primary btn-sm" className="slide m-2">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
                </SigninFormLaunchModal>
              }
              {this.props.signed_in &&
                <React.Fragment>
                  { !this.state.on_dashboard &&
                    <Link to="/dashboard"><Button variant="outline-primary btn-sm" className="slide m-2">Dashboard</Button></Link>
                  }
                  <SignOut signOut={this.props.signOut}>
                    <Button variant="outline-primary btn-sm" className="slide m-2">Sign Out&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
                  </SignOut>
                </React.Fragment>
              }
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
                launchGeneral={this.props.launchGeneral}
                launchJoinEmail={this.props.launchJoinEmail}
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
                launchGeneral={this.props.launchGeneral}
                launchJoinEmail={this.props.launchJoinEmail}
              />
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <hr className="" style={{ margin: '0' }} />
        </Container>
        {/* <JoinModal show={this.state.modalShow} onHide={this.close} /> */}
      </>
    )
  }
}
