import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Button from 'react-bootstrap/Button'

import SpinDropdown from '../../../../atoms/spin-dropdown/spin-dropdown'
import SigninFormLaunchModal from '../../../../atoms/forms/signin-form/signin-form-launch-modal'
import SignOut from '../../../../atoms/sign-out/sign-out'

// import JoinModal from '../../../../atoms/join-email-list/join-modal/join-modal'
// import ContactUsModal from '../../../../atoms/general-contact-form/general-contact-form-modal/general-contact-form-modal'

import '../../header.scss'
import './navigation.scss'

import '../../../../../global-scss/index.scss'


export default class MobileNavigation extends Component {
  //   constructor(props) {
  //   super(props)

  //   this.state = {
  //     joinEmailListModalShow: false,
  //     contactUsModalShow: false
  //   }

  //   this.launchJoinEmailList = this.launchJoinEmailList.bind(this)
  //   this.closeJoinEmailList = this.closeJoinEmailList.bind(this)

  //   this.launchContactUs = this.launchContactUs.bind(this)
  //   this.closeContactUs = this.closeContactUs.bind(this)
  // }

  // launchJoinEmailList = () => { console.log("Ive been clicked");this.setState({joinEmailListModalShow: true}) }
  // closeJoinEmailList = () => { this.setState({joinEmailListModalShow: false}) }

  // launchContactUs = () => { console.log("Ive been clicked");this.setState({contactUsModalShow: true}) }
  // closeContactUs = () => { this.setState({contactUsModalShow: false}) }

  render() {
    return (
      <StaticQuery query={
        graphql`
          query mobileNavigationQuery {
            allNavigationJson {
              edges {
                node {
                  title
                  footerOnly
                  iconClass
                  # path
                  # onClick
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
                                      this.props.location.pathname.includes(item.path) && item.path !== "/join/" ? "active mobile-menu" : "mobile-menu"
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
                  <div className="d-flex justify-content-end">
                    {/* <div className="p-2 align-self-center ml-auto d-sm-none">
                      <Button variant="outline-primary btn-sm"><i className="fas fa-donate"></i>&nbsp; Donate</Button>
                    </div> */}
                    <div className="p-2 d-sm-none">
                      {/* <Button variant="outline-primary btn-sm" className="slide">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button> */}
                      {!this.props.signed_in &&
                        <SigninFormLaunchModal launchSignin={this.props.launchSignin}>
                          <Button variant="outline-primary btn-sm" className="slide m-2">Sign In&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
                        </SigninFormLaunchModal>
                      }
                    </div>
                    <div className="p-2 d-sm-none">
                      {this.props.signed_in &&
                        <React.Fragment>
                          { !this.props.on_dashboard &&
                            <Link to="/dashboard"><Button variant="outline-primary btn-sm" className="slide m-2">Dashboard</Button></Link>
                          }
                          <SignOut signOut={this.props.signOut}>
                            <Button variant="outline-primary btn-sm" className="slide m-2">Sign Out&nbsp; <i className="fas fa-sign-in-alt"></i></Button>
                          </SignOut>
                        </React.Fragment>
                      }
                    </div>
                  </div>
                </Navbar.Collapse>
              </Navbar>
              {/* <JoinModal show={this.state.joinEmailListModalShow} onHide={this.closeJoinEmailList} />
              <ContactUsModal show={this.state.contactUsModalShow} onHide={this.closeContactUs} /> */}
            </SpinDropdown>
          )
        }}
      />
    )
  }
}
