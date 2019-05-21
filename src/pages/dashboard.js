import React, { Component } from 'react'
import SEO from '../components/seo'

import axios from 'axios'
import Scrollspy from 'react-scrollspy'
// import ReactPlaceholder from 'react-placeholder'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

import ActionModal from '../components/molecules/payment/action-modal'
import DeleteDonationModal from '../components/molecules/payment/donation/delete-donation-modal'
import LaunchPaymentModal from '../components/molecules/payment/launch-payment-modal'
import LaunchDeleteDonationModal from '../components/molecules/payment/donation/launch-delete-donation-modal'
import LaunchUpdateDonationModal from '../components/molecules/payment/donation/launch-update-donation-modal'
import RegistrationForm from '../components/atoms/forms/signin-form/registration-form'
import SelectCardOrBank from '../components/molecules/payment/select-card-or-bank'
import SigninForm from '../components/atoms/forms/signin-form/signin-form'
import UpdateDonationModal from '../components/molecules/payment/donation/update-donation-modal'
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'

import retrieveStripeCustomer from '../queries/bscsapi/stripe/retrieve-stripe-customer'
import retrieveStripeCustomerCharges from '../queries/bscsapi/stripe/retrieve-stripe-customer-charges'
import retrieveStripeCustomerDonationSubscriptions from '../queries/bscsapi/stripe/retrieve-stripe-customer-donation-subscriptions'
import retrieveStripeCustomerOrders from '../queries/bscsapi/stripe/retrieve-stripe-customer-orders'

import './dashboard.scss'
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
      donate: false,
      donation_id: undefined,
      launch_payment: false,
      orders: undefined,
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
      retrieveStripeCustomerOrders(this.cancelToken).then(response => {
        console.log(response)
        this.setState({orders: response.data.data.retrieveStripeCustomerOrders.data})
      })
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

  closeSideMenu = (e) => {
    e.preventDefault()
    document.getElementById('expanded-side-menu').setAttribute('data-state', 'closed')
    document.getElementById('closed-side-menu').setAttribute('data-state', 'expanded')
    document.getElementById('dashboard-content').classList.add('col-lg-11')
    document.getElementById('dashboard-content').classList.remove('col-lg-10')
  }

  closeUpdateDonationModal = () => {
    this.setState({show_update_donation_modal: false})
  }

  expandSideMenu = (e) => {
    e.preventDefault()
    document.getElementById('expanded-side-menu').setAttribute('data-state', 'expanded')
    document.getElementById('closed-side-menu').setAttribute('data-state', 'closed')
    document.getElementById('dashboard-content').classList.add('col-lg-10')
    document.getElementById('dashboard-content').classList.remove('col-lg-11')
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
//End custom functions

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Dashboard"
          description=""
          canonical="https://bscs.org/dashboard"
        />
        <Layout
          closePayment={() => this.setState({launch_payment: false})}
          donate={this.state.donate}
          launchPayment={this.state.launch_payment}
          location={this.props.location}
          setSignedIn={(state) => this.setState({signed_in: state})}
          signed_in={this.state.signed_in}
        >
          <Container>
            <Row>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////
* Sidemenu
///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              {this.state.signed_in &&
                <React.Fragment>
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
                        items={['account', 'donations', 'payment-methods', 'previous-purchases', 'upcoming-events']}
                        className="d-none d-lg-block h-100"
                        currentClassName="active"
                        componentTag="tbody"
                      >
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action first"
                          onClick={(e) => document.getElementById('account').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-user-cog mr-3"></i></td>
                          <td>Account</td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-donate mr-3"></i></td>
                          <td>Donations</td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-credit-card mr-3"></i></td>
                          <td>Payment Methods</td>
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
                          onClick={(e) => document.getElementById('upcoming-events').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-clock mr-3"></i></td>
                          <td>Upcoming Events</td>
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
                        items={['account', 'donations', 'payment-methods', 'previous-purchases', 'upcoming-events']}
                        className="d-none d-lg-block h-100"
                        currentClassName="active"
                        componentTag="tbody"
                      >
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action first"
                          onClick={(e) => document.getElementById('account').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-user-cog"></i></td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-donate"></i></td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-credit-card"></i></td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('previous-purchases').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-store"></i></td>
                        </tr>
                        <tr
                          className="dashboard-menu-link list-group-item list-group-item-action"
                          onClick={(e) => document.getElementById('upcoming-events').scrollIntoView({behavior: "smooth", block: "start"})}
                        >
                          <td><i className="fas fa-clock"></i></td>
                        </tr>
                      </Scrollspy>
                    </table>
                  </Col>
                </React.Fragment>
              }
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////
* Dashboard Content
///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              {!this.state.signed_in &&
                <Col id="dashboard-content" xs={12}>
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
                  </Container>
                </Col>
              }
              {this.state.signed_in &&
                <Col id="dashboard-content" xs={12} lg={10} className="pl-2">
                  <Container className="pl-5">
                    <PageTitle title="Dashboard" />
                    <React.Fragment>
                      <section id="account" className="mb-5" >
                        <h2>Account</h2>
                        <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
                          <Col className="p-2">
                            <RegistrationForm update={true} />
                          </Col>
                        </Row>
                      </section>
                      <hr />
                      <section id="donations" className="my-5" >
                        <h2>Donations</h2>
                        <Row style={{marginBottom: '1rem'}} className="d-flex">
                          <Col className="p-2">
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Amount</th>
                                  <th>Description</th>
                                  <th>Payment Method</th>
                                  <th>Next scheduled payment</th>
                                  <th>Update Donation</th>
                                  <th>Cancel Donation</th>
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
                                            <Button data-donation-id={subscription.id} variant="outline-primary">Cancel</Button>
                                          </LaunchDeleteDonationModal>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </Table>
                          </Col>
                          <Col xs={12} className="d-flex justify-content-center">
                            <LaunchPaymentModal
                              launchPayment={(donate) => this.setState({launch_payment: true, donate: donate})}
                              donate={true}
                            >
                              <Button variant="outline-primary">New Donation</Button>
                            </LaunchPaymentModal>
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
                      <section id="payment-methods" className="my-5" >
                        <h2>Payment Methods</h2>
                        <Row style={{marginBottom: '3rem'}} className="d-flex flex-wrap-reverse">
                          <Col className="p-2 ml-3" xs={12} md={8}>
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
                      <section id="upcoming-events" className="mt-5" >
                        <h2>Upcoming Events</h2>
                        <Row style={{marginBottom: '1rem'}}>
                          {this.state.orders &&
                            // eslint-disable-next-line
                            this.state.orders.map((order, index) => {
                              if(order.metadata.date && order.metadata.type === 'Workshop') {
                                let workshop = new Date(order.metadata.date)
                                let now = new Date()

                                //if workshop is within 1 month, show it under upcoming
                                if(workshop >= now && workshop < now.setMonth(now.getMonth() + 1)) {
                                  return (
                                    <Col xs={12} md={6} xl={4} key={`workshop-${index}`} className="pb-3">
                                      <Card className="h-100">
                                        <Card.Img
                                          className="erc-card-img"
                                          variant="top"
                                          src={order.metadata.image}
                                          alt={order.metadata.alt}
                                          // onLoad={this.loaded}
                                          // style={{display: 'none'}}
                                        />
                                        <Card.Body>
                                          <Card.Title
                                            style={{
                                              marginBottom: '1.5rem'
                                            }}
                                          >
                                            {order.metadata.title}
                                          </Card.Title>
                                          <p><strong><em>{order.metadata.date}</em></strong></p>
                                          <p>{order.metadata.description}</p>
                                        </Card.Body>
                                        <Card.Footer
                                          style={{
                                            background: 'white',
                                            borderTop: 'none',
                                            marginBottom: '.5rem',
                                          }}
                                        >
                                          <div className="d-flex">
                                            <div className="ml-auto align-self-end">
                                              <SpecificContactForm sendto={order.metadata.contact}>
                                                <Button variant="outline-primary">Contact {order.metadata.contact}</Button>
                                              </SpecificContactForm>
                                            </div>
                                          </div>
                                        </Card.Footer>
                                      </Card>
                                    </Col>
                                  )
                                }
                              }
                            })
                          }
                        </Row>
                      </section>
                    </React.Fragment>
                  </Container>
                </Col>
              }
            </Row>
          </Container>
        </Layout>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////
* Bottom menu
///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div style={{height: '200px'}} className="d-block d-md-none bg-light"></div>
        {this.state.signed_in &&
          <Container id="side-menu-bottom" className="d-block d-lg-none fixed-bottom p-0" fluid>
            <Scrollspy
              items={['account', 'donations', 'payment-methods', 'previous-purchases', 'upcoming-events']}
              currentClassName="active"
              componentTag="div"
              // className="row"
              className="d-flex justify-content-center"
              // style={{height: '116px'}}
              style={{height: '100%'}}
            >
              <div
                // xs={2}
                className="bottom-menu-link p-2 text-center flex-fill"
                onClick={(e) => document.getElementById('account').scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className="fas fa-user-cog"></i><br />Account
              </div>
              <div
                // xs={2}
                className="bottom-menu-link p-2 text-center flex-fill"
                onClick={(e) => document.getElementById('donations').scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className="fas fa-donate"></i><br />Donations
              </div>
              <div
                // xs={2}
                className="bottom-menu-link p-2 text-center flex-fill"
                onClick={(e) => document.getElementById('payment-methods').scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className="fas fa-credit-card"></i><br />Payment Methods
              </div>
              <div
                // xs={2}
                className="bottom-menu-link p-2 text-center flex-fill"
                onClick={(e) => document.getElementById('previous-purchases').scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className="fas fa-store"></i><br />Previous Purchases
              </div>
              <div
                // xs={2}
                className="bottom-menu-link p-2 text-center flex-fill"
                onClick={(e) => document.getElementById('upcoming-events').scrollIntoView({behavior: "smooth", block: "start"})}
                style={{fontSize: '1rem'}}
              >
                <i className="fas fa-clock"></i><br />Upcoming Events
              </div>
            </Scrollspy>
          </Container>
        }
      </React.Fragment>
    )
  }
}

export default Dashboard