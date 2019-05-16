import React, { Component } from 'react'
import SEO from '../components/seo'

import axios from 'axios'
import Scrollspy from 'react-scrollspy'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

import ActionModal from '../components/molecules/payment/action-modal'
import DeleteDonationModal from '../components/molecules/payment/donation/delete-donation-modal'
import LaunchDeleteDonationModal from '../components/molecules/payment/donation/launch-delete-donation-modal'
import LaunchUpdateDonationModal from '../components/molecules/payment/donation/launch-update-donation-modal'
import RegistrationForm from '../components/atoms/forms/signin-form/registration-form'
import SelectCardOrBank from '../components/molecules/payment/select-card-or-bank'
import SigninForm from '../components/atoms/forms/signin-form/signin-form'
import UpdateDonationModal from '../components/molecules/payment/donation/update-donation-modal'

import retrieveStripeCustomer from '../queries/bscsapi/stripe/retrieve-stripe-customer'
import retrieveStripeCustomerCharges from '../queries/bscsapi/stripe/retrieve-stripe-customer-charges'
import retrieveStripeCustomerDonationSubscriptions from '../queries/bscsapi/stripe/retrieve-stripe-customer-donation-subscriptions'

import './dashboard.scss'
import { element } from 'prop-types';
// import retrieveStripeCustomerCard from '../queries/bscsapi/stripe/retrieve-stripe-customer-card'

/* Dashboard functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentDidUpdate(prevProps, prevState) {...}
  * componentWillUnmount() {...}
  * closeModal = () => {...}
  * launchDeleteBankModal = () => {...}
  * launchDeleteCardModal = () => {...}
  * launchDeleteDonationSubscriptionModal = () => {...}
  * launchUpdateCardModal = () => {...}
  * launchUpdateDonationModal = () => {...}
  * render() {...}
  *
*/

const Dashboard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      action_type: undefined,
      customer_default_source: undefined,
      donation_id: undefined,
      register: false,
      selected_source: undefined,
      show_action_modal: false,
      show_delete_donation_modal: false,
      show_update_donation_modal: false,
      signed_in: undefined,
      subscriptions: [],
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    if(this.state.signed_in) {
      this.getCustomerDefaultCard(this.cancelToken)
      this.getUserCharges()
      this.getUserRecurringDonations()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // let menu, menu_top, menu_bottom, menu_nav

    if(prevState.signed_in !== this.state.signed_in && this.state.signed_in) {
      this.getCustomerDefaultSource(this.cancelToken)
      this.getUserCharges()
      this.getUserRecurringDonations()
    }

  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error);
    }
  }
//End lifecycle hooks

//Custom functions
  closeActionModal = () => {
    this.setState({show_action_modal: false})
  }

  closeDeleteDonationModal = () => {
    this.setState({show_delete_donation_modal: false})
  }

  closeUpdateDonationModal = () => {
    this.setState({show_update_donation_modal: false})
  }

  getCustomerDefaultSource = (cancelToken) => {
    retrieveStripeCustomer(cancelToken).then(response => {
      console.log(response)
      if(
        response !== undefined &&
        response.status === 200 &&
        !response.data.errors
      ) {
        if(response.data.data.retrieveStripeCustomer !== null) {
          this.setState({customer_default_source: response.data.data.retrieveStripeCustomer.default_source})
        } else {
          this.setState({customer_default_source: null})
        }
      }
    })
  }

  getUserCharges = async () => {
    let customer_charges

    customer_charges = await retrieveStripeCustomerCharges(this.cancelToken)

    if(customer_charges && customer_charges.data.data.retrieveStripeCustomerDonationSubscriptions !== null) {
      this.setState({customer_charges: customer_charges.data.data.retrieveStripeCustomerCharges.data})
    } else {
      this.setState({customer_charges: null})
    }
  }

  getUserRecurringDonations = async () => {
    let subscriptions

    subscriptions = await retrieveStripeCustomerDonationSubscriptions(this.cancelToken)
    if(subscriptions && subscriptions.data.data.retrieveStripeCustomerDonationSubscriptions !== null) {
      this.setState({subscriptions: subscriptions.data.data.retrieveStripeCustomerDonationSubscriptions.data})
    } else {
      this.setState({subscriptions: null})
    }
  }

  launchActionModal = (source_id, action_type) => {this.setState({selected_source: source_id, action_type: action_type, show_action_modal: true})}

  launchDeleteDonationModal = (e) => {
    let subscription_id

    subscription_id = e.target.getAttribute('data-donation-id')

    e.preventDefault()
    this.setState({show_delete_donation_modal: true, donation_id: subscription_id})
  }

  launchUpdateDonationModal = (e) => {
    let subscription_id

    subscription_id = e.target.getAttribute('data-donation-id')

    e.preventDefault()
    this.setState({show_update_donation_modal: true, donation_id: subscription_id})
  }

  closeSideMenu = (e) => {
    e.preventDefault()
    document.getElementById('expanded-side-menu').setAttribute('data-state', 'closed')
    document.getElementById('closed-side-menu').setAttribute('data-state', 'expanded')
    document.getElementById('dashboard-content').classList.add('col-lg-11')
    document.getElementById('dashboard-content').classList.remove('col-lg-10')
  }

  expandSideMenu = (e) => {
    e.preventDefault()
    document.getElementById('expanded-side-menu').setAttribute('data-state', 'expanded')
    document.getElementById('closed-side-menu').setAttribute('data-state', 'closed')
    document.getElementById('dashboard-content').classList.add('col-lg-10')
    document.getElementById('dashboard-content').classList.remove('col-lg-11')
  }
//End custom functions

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Dashboard"
          description=""
          canonical="https://bscs.org/dashboard"
        />
        <Layout location={this.props.location} setSignedIn={(state) => this.setState({signed_in: state})} signed_in={this.state.signed_in}>
          <Container>
            <Row>
              <Col id="expanded-side-menu" data-state="expanded" lg={2} className="d-none d-lg-block">
                <table id="side-menu-nav">
                  <thead>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action toggle d-flex"
                      onClick={(e) => this.closeSideMenu(e)}
                    >
                      <td><i className="fas fa-angle-double-left close-arrow"></i></td>
                    </tr>
                  </thead>
                  <Scrollspy
                    items={['donations', 'previous-purchases', 'payment-methods']}
                    className="d-none d-lg-block h-100"
                    currentClassName="active"
                    componentTag="tbody"
                  >
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action first"
                      onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-donate mr-3"></i></td>
                      <td>Donations</td>
                    </tr>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action"
                      onClick={(e) => document.getElementById('previous-purchases').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-store mr-3"></i></td>
                      <td>Previous Purchases</td>
                    </tr>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action"
                      onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-credit-card mr-3"></i></td>
                      <td>Payment Methods</td>
                    </tr>
                  </Scrollspy>
                </table>
              </Col>
              <Col id="closed-side-menu" lg={1} data-state="closed" className="d-none d-lg-block">
                <table id="side-menu-nav">
                  <thead>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action toggle"
                      onClick={(e) => this.expandSideMenu(e)}
                    >
                      <td><i className="fas fa-angle-double-right"></i></td>
                    </tr>
                  </thead>
                  <Scrollspy
                    items={['donations', 'previous-purchases', 'payment-methods']}
                    className="d-none d-lg-block h-100"
                    currentClassName="active"
                    componentTag="tbody"
                  >
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action first"
                      onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-donate"></i></td>
                    </tr>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action"
                      onClick={(e) => document.getElementById('previous-purchases').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-store"></i></td>
                    </tr>
                    <tr
                      className="dashboard-menu-link list-group-item list-group-item-action"
                      onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
                    >
                      <td><i className="fas fa-credit-card"></i></td>
                    </tr>
                  </Scrollspy>
                </table>
              </Col>
              <Col id="dashboard-content" xs={12} lg={10} className="pl-2">
                <Container className="pl-5">
                  <PageTitle title="Dashboard" />
                  {!this.state.signed_in && !this.state.register &&
                    <Col xs={12} md={{span: 6, offset: 3}}>
                      <SigninForm
                        register={(state) => this.setState({register: state})}
                        setSignedIn={() => this.setState({signed_in: true})}
                      />
                    </Col>
                  }
                  {!this.state.signed_in && this.state.register &&
                    <Col xs={12} md={{span: 6, offset: 3}}>
                      <RegistrationForm
                        register={(state) => this.setState({register: state})}
                        setSignedIn={() => this.setState({signed_in: true})}
                      />
                    </Col>
                  }
                  {this.state.signed_in &&
                    <React.Fragment>
                      <section id="donations" className="mb-5" >
                        <h2>Donations</h2>
                        <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
                          <Col className="p-2">
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Amount</th>
                                  <th>Description</th>
                                  <th>Payment Type</th>
                                  <th>Next scheduled payment</th>
                                  <th>Update Donation</th>
                                  <th>Delete Donation</th>
                                </tr>
                              </thead>
                              <tbody>
                                { this.state.subscriptions &&
                                  this.state.subscriptions.map((subscription, index) => {
                                    // let last4
                                    let type = /^[^_]+/.exec(subscription.default_source)

                                    if(type[0] === 'card') {
                                      type = 'Card'
                                      // last4 = await retrieveStripeCustomerCard(this.cancelToken, subscription.default_source)
                                    } else {
                                      type = 'Bank'
                                    }

                                    let next_payment_day = new Date(subscription.items.data[0].created * 1000).getDate()
                                    let current = new Date()
                                    let next_payment_month
                                    let next_payment_year
                                    if(subscription.items.data[0].plan.interval === 'month') {
                                      next_payment_month = current.getMonth() + 1
                                      next_payment_year = current.getFullYear()
                                    } else {
                                      next_payment_month = current.getMonth()
                                      next_payment_year = current.getFullYear() + 1
                                    }


                                    return(
                                      <tr key={`sub-row-${index}`}>
                                        <td>${subscription.items.data[0].quantity}</td>
                                        <td>{subscription.items.data[0].plan.nickname}</td>
                                        <td>{type}</td>
                                        <td>{next_payment_month}/{next_payment_day}/{next_payment_year}</td>
                                        <td>
                                          <LaunchUpdateDonationModal launchUpdateDonation={this.launchUpdateDonationModal}>
                                            <Button data-donation-id={subscription.id} variant="outline-primary">Update</Button>
                                          </LaunchUpdateDonationModal>
                                        </td>
                                        <td>
                                          <LaunchDeleteDonationModal launchDeleteDonation={this.launchDeleteDonationModal}>
                                            <Button data-donation-id={subscription.id} variant="outline-primary">Delete</Button>
                                          </LaunchDeleteDonationModal>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <UpdateDonationModal
                          onHide={this.closeUpdateDonationModal}
                          show={this.state.show_update_donation_modal}
                          donation_id={this.state.donation_id}
                          customer_default_source={this.state.customer_default_source}
                        />
                        <DeleteDonationModal
                          onHide={this.closeDeleteDonationModal}
                          show={this.state.show_delete_donation_modal}
                          donation_id={this.state.donation_id}
                        />
                      </section>
                      <hr />
                      <section id="previous-purchases" className="my-5" >
                        <h2>Previous Purchases</h2>
                        <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
                          <Col className="p-2">
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Amount</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                { this.state.customer_charges &&
                                  this.state.customer_charges.map((charge, index) => {
                                    return (
                                      <tr key={`charge-row-${index}`}>
                                        <td>${(charge.amount/100).toFixed(2)}</td>
                                        { charge.description.includes("Payment for invoice") &&
                                          <td>{charge.statement_descriptor}</td>
                                        }
                                        { !charge.description.includes("Payment for invoice") &&
                                          <td>{charge.description}</td>
                                        }
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </section>
                      <hr />
                      <section id="payment-methods" className="mt-5" >
                        <h2>Payment Methods</h2>
                        <Row style={{marginBottom: '3rem'}} className="d-flex flex-wrap-reverse">
                          <Col className="p-2 ml-3" xs={12} md={5}>
                            <SelectCardOrBank
                              default_source={this.state.customer_default_source}
                              selected_source={this.state.selected_source}
                              setSelectedSource={(source_id, action_type) => this.launchActionModal(source_id, action_type)}
                              dashboard={true}
                            />
                            <ActionModal
                              show={this.state.show_action_modal}
                              onHide={this.closeActionModal}
                              action={this.state.action_type}
                              source_id={this.state.selected_source}
                            />
                          </Col>
                        </Row>
                      </section>
                    </React.Fragment>
                  }
                </Container>
              </Col>
            </Row>
          </Container>
        </Layout>
        <div style={{height: '116px'}} className="d-block d-md-none bg-light"></div>
        {/* <div style={{height: '88px'}} className="d-none d-sm-block d-lg-none"></div> */}
        <Container id="side-menu-bottom" className="d-block d-lg-none fixed-bottom" fluid>
          <Scrollspy
            items={['donations', 'previous-purchases', 'payment-methods']}
            currentClassName="active"
            componentTag="div"
            className="row"
            style={{height: '116px'}}
          >
            <div
              className="bottom-menu-link col-4 p-3 text-center h-100"
              onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
            >
              <i className="fas fa-donate"></i><br />Donations
 {/* Donations */}
            </div>
            <div
              className="bottom-menu-link col-4 p-3 text-center h-100"
              onClick={(e) => document.getElementById('previous-purchases').scrollIntoView({behavior: "smooth", block: "start"})}
            >
              <i className="fas fa-store"></i><br />Previous Purchases
 {/* Previous Purchases */}
            </div>
            <div
              className="bottom-menu-link col-4 p-3 text-center h-100"
              onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
            >
              <i className="fas fa-credit-card"></i><br />Payment Methods
 {/* Payment Methods */}
            </div>
          </Scrollspy>
        </Container>
      </React.Fragment>
    )
  }
}

export default Dashboard