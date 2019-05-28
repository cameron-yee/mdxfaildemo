import React, { Component } from 'react'
import SEO from '../components/seo'

import axios from 'axios'
// import Scrollspy from 'react-scrollspy'
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
import DashboardBottomMenu from '../components/layout/dashboard-menus/dashboard-bottom-menu'
import DashboardSideMenu from '../components/layout/dashboard-menus/dashboard-side-menu'
import DeleteDonationModal from '../components/molecules/payment/donation/delete-donation-modal'
import LaunchPaymentModal from '../components/molecules/payment/launch-payment-modal'
import LaunchDeleteDonationModal from '../components/molecules/payment/donation/launch-delete-donation-modal'
import LaunchRestartDonationModal from '../components/molecules/payment/donation/launch-restart-donation-modal'
import LaunchUpdateDonationModal from '../components/molecules/payment/donation/launch-update-donation-modal'
import RegistrationForm from '../components/atoms/forms/signin-form/registration-form'
import RestartDonationModal from '../components/molecules/payment/donation/restart-donation-modal'
// import SelectCardOrBank from '../components/molecules/payment/select-card-or-bank'
import SigninForm from '../components/atoms/forms/signin-form/signin-form'
import UpdateDonationModal from '../components/molecules/payment/donation/update-donation-modal'
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'

import retrieveStripeCustomer from '../queries/bscsapi/stripe/retrieve-stripe-customer'
import retrieveStripeCustomerBanks from '../queries/bscsapi/stripe/retrieve-stripe-customer-banks'
import retrieveStripeCustomerCharges from '../queries/bscsapi/stripe/retrieve-stripe-customer-charges'
import retrieveStripeCustomerCards from '../queries/bscsapi/stripe/retrieve-stripe-customer-cards'
import retrieveStripeCustomerDonationSubscriptions from '../queries/bscsapi/stripe/retrieve-stripe-customer-donation-subscriptions'
import retrieveStripeCustomerOrders from '../queries/bscsapi/stripe/retrieve-stripe-customer-orders'
import updateCustomerDefaultSource from '../queries/bscsapi/stripe/update-customer-default-source'

import './dashboard.scss'
// import retrieveStripeCustomerCard from '../queries/bscsapi/stripe/retrieve-stripe-customer-card'

/* Dashboard functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentDidUpdate(prevProps, prevState) {...}
  * componentWillUnmount() {...}
  * closeActionModal = () => {...}
  * closeDeleteDonationModal = () => {...}
  * collapseSideMenu = () => {...}
  * closeUpdateDonationModal = () => {...}
  * expandSideMenu = () => {...}
  * getCustomerDefaultSource = (cancelToken) => {...}
  * getUserCharges = async () => {...}
  * getUserRecurringDonations = async () => {...}
  * launchActionModal = () => {...}
  * launchDeleteDonationModal = () => {...}
  * launchUpdateDonationModal = () => {...}
  * toggleSideMenu = (state) => {...}
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
      payment_methods: [],
      register: false,
      selected_source: undefined,
      set_default_loading: false,
      show_action_modal: false,
      show_delete_donation_modal: false,
      show_restart_donation_modal: false,
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
      this.setUserPaymentMethods()
      this.getUserCharges()
      this.getUserRecurringDonations()
      retrieveStripeCustomerOrders(this.cancelToken).then(response => {
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

  closeRestartDonationModal = () => {
    this.setState({show_restart_donation_modal: false})
  }

  closeUpdateDonationModal = () => {
    this.setState({show_update_donation_modal: false})
  }

  collapseSideMenu = () => {
    document.getElementById('dashboard-content').setAttribute('data-state', 'content-expanded')
  }

  expandSideMenu = () => {
    document.getElementById('dashboard-content').setAttribute('data-state', 'content-collapsed')
  }

  getCustomerDefaultSource = (cancelToken) => {
    retrieveStripeCustomer(cancelToken).then(response => {
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

  getUserBanks = async () => {
    let banks

    banks = await retrieveStripeCustomerBanks(this.cancelToken)

    if(banks && !banks.data.data.retrieveStripeCustomerBanks.data.errors) {
      return banks.data.data.retrieveStripeCustomerBanks.data
    } else {
      return null
    }
  }

  getUserCards = async () => {
    let cards

    cards = await retrieveStripeCustomerCards(this.cancelToken)

    if(cards && !cards.data.data.retrieveStripeCustomerCards.data.errors) {
      return cards.data.data.retrieveStripeCustomerCards.data
    } else {
      return null
    }
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

  launchActionModal = (e, source_id, action_type) => {
    e.preventDefault()

    this.setState({selected_source: source_id, action_type: action_type, show_action_modal: true})
  }

  launchDeleteDonationModal = (e) => {
    let subscription_id

    subscription_id = e.target.getAttribute('data-donation-id')

    e.preventDefault()
    this.setState({show_delete_donation_modal: true, donation_id: subscription_id})
  }

  launchRestartDonationModal = (e) => {
    let subscription_id

    subscription_id = e.target.getAttribute('data-donation-id')

    e.preventDefault()
    this.setState({show_restart_donation_modal: true, donation_id: subscription_id})
  }

  launchUpdateDonationModal = (e) => {
    let subscription_id

    subscription_id = e.target.getAttribute('data-donation-id')

    e.preventDefault()
    this.setState({show_update_donation_modal: true, donation_id: subscription_id})
  }

  setUserPaymentMethods = async () => {
    let cards, banks, payment_methods

    banks = await this.getUserBanks()
    cards = await this.getUserCards()

    payment_methods = []

    if(banks !== null && cards !== null) {
      payment_methods.push(...banks, ...cards)
      this.setState({payment_methods: payment_methods})
    } else {
      this.setState({errors: true})
    }
  }

  toggleSideMenu = (state) => {
    if (state === 'expand') {
      this.expandSideMenu()
    } else if (state === 'collapse') {
      this.collapseSideMenu()
    }
  }

  updateCustomerDefaultSource = async (e, source_id) => {
    let response, new_default_source

    this.setState({set_default_loading: true})

    e.preventDefault()

    response = await updateCustomerDefaultSource(this.cancelToken, source_id)

    if(response && response.data.data.updateStripeCustomerDefaultSource.default_source) {
      new_default_source = response.data.data.updateStripeCustomerDefaultSource.default_source
      this.setState({customer_default_source: new_default_source, set_default_loading: false})
    }
    //TODO: set error alert above table if this fails
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
                  <DashboardSideMenu
                    id="side-menu"
                    items={[['account', 'fa-user-cog'], ['donations', 'fa-donate'], ['payment-methods', 'fa-credit-card'], ['previous-purchases', 'fa-store'], ['upcoming-events', 'fa-clock']]}
                    toggleSideMenu={(state) => {this.toggleSideMenu(state)}}
                  />
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
                <Col id="dashboard-content" xs={12} data-state="content-collapsed" className="pl-2">
                  <Container className="pl-5">
                    <PageTitle title="Dashboard" />
                    <React.Fragment>
                      <section id="account" className="mb-5" >
                        <h2>Account</h2>
                        <Row style={{marginBottom: '1rem'}}>
                          <Col>
                            <div
                              className="p-3"
                              style={{border: '1px solid #cdcdcd', borderRadius: '4px'}}
                            >
                              <RegistrationForm update={true} />
                            </div>
                          </Col>
                        </Row>
                      </section>
                      <hr />
                      <section id="donations" className="my-5" >
                        <Row style={{marginBottom: '1rem'}}>
                          <Col xs={12} className="mb-2">
                            <h2>Donations</h2>
                            <LaunchPaymentModal
                              launchPayment={(donate) => this.setState({launch_payment: true, donate: donate})}
                              donate={true}
                            >
                              <Button
                                variant="outline-success"
                                size="sm"
                                // style={{width: '200px', minHeight: '6rem', height: '100%'}}
                              >
                                <i className="fa fa-donate"></i>&nbsp;New Donation
                              </Button>
                            </LaunchPaymentModal>
                          </Col>
                          <Col xs={12}>
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
                                        <td align="center">
                                          <LaunchUpdateDonationModal
                                            launchUpdateDonation={this.launchUpdateDonationModal}
                                           >
                                            <Button
                                              data-donation-id={subscription.id}
                                              variant="outline-primary"
                                              size="sm"
                                            >
                                              Update
                                            </Button>
                                          </LaunchUpdateDonationModal>
                                        </td>
                                        <td align="center">
                                          {!subscription.cancel_at_period_end &&
                                            <LaunchDeleteDonationModal
                                              launchDeleteDonation={this.launchDeleteDonationModal}
                                            >
                                              <Button
                                                data-donation-id={subscription.id}
                                                variant="outline-primary"
                                                size="sm"
                                              >
                                                Cancel
                                              </Button>
                                            </LaunchDeleteDonationModal>
                                          }
                                          {subscription.cancel_at_period_end &&
                                            <div className="d-flex flex-wrap justify-content-center text-left">
                                              <span className="mb-2">Donation will cancel at end of period.</span>
                                              <LaunchRestartDonationModal
                                                launchRestartDonation={this.launchRestartDonationModal}
                                              >
                                                <Button
                                                  data-donation-id={subscription.id}
                                                  variant="outline-primary"
                                                  size="sm"
                                                >
                                                  Restart
                                                </Button>
                                              </LaunchRestartDonationModal>
                                            </div>
                                          }
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
                          customer_default_source={this.state.customer_default_source}
                          donation_id={this.state.donation_id}
                          onHide={this.closeUpdateDonationModal}
                          refreshDonations={this.getUserRecurringDonations}
                          show={this.state.show_update_donation_modal}
                        />
                        <DeleteDonationModal
                          donation_id={this.state.donation_id}
                          onHide={this.closeDeleteDonationModal}
                          refreshDonations={this.getUserRecurringDonations}
                          show={this.state.show_delete_donation_modal}
                        />
                        <RestartDonationModal
                          donation_id={this.state.donation_id}
                          onHide={this.closeRestartDonationModal}
                          refreshDonations={this.getUserRecurringDonations}
                          show={this.state.show_restart_donation_modal}
                        />
                      </section>
                      <hr />
                      <section id="payment-methods" className="my-5" >
                        <h2>Payment Methods</h2>
                        {/* <Row style={{marginBottom: '3rem'}} className="d-flex flex-wrap-reverse"> */}
                          {/* <Col className="p-2 ml-3" xs={12} md={8}>
                            <SelectCardOrBank
                              default_source={this.state.customer_default_source}
                              selected_source={this.state.selected_source}
                              setSelectedSource={(source_id, action_type) => this.launchActionModal(source_id, action_type)}
                              dashboard={true}
                            /> */}
                        <Row style={{marginBottom: '1rem'}}>
                          <Col xs={12} className="mb-2">
                            <Button
                              onClick={(e) => {this.launchActionModal(e, 'none', 'new-bank')}}
                              data-action-type="new-bank"
                              className="mr-3"
                              variant="outline-primary"
                              type="submit"
                              // style={{height: '100px'}}
                              // style={{width: '200px', minHeight: '6rem', height: '100%'}}
                              size="sm"
                            >
                              <i className="fa fa-university"></i>&nbsp;New Bank
                            </Button>
                            <Button
                              onClick={(e) => {this.launchActionModal(e, 'none', 'new-card')}}
                              data-action-type="new-card"
                              variant="outline-primary"
                              type="submit"
                              // style={{width: '200px', minHeight: '6rem', height: '100%'}}
                              size="sm"
                            >
                              <i className="fa fa-credit-card"></i>&nbsp;New Card
                            </Button>
                          </Col>
                          <Col xs={12}>
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Payment Method</th>
                                  <th>Default</th>
                                  <th colSpan={2}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.payment_methods.map((source, index) => {
                                  return (
                                    <tr key={`payment-method-${index}`}>
                                      {source.id.includes('ba_') &&
                                        <td>
                                          <span>{source.bank_name}: ••••••••{source.last4}</span>
                                          {/* <br /> */}
                                          {(source.status === 'new' || source.status === 'validated') &&
                                            <Button
                                              className="m-3"
                                              onClick={(e) => {this.launchActionModal(e, source.id, 'verify')}}
                                              size="sm"
                                              variant="outline-primary"
                                            >
                                              Verify Bank
                                            </Button>
                                          }
                                          {(source.status === 'verification_failed' || source.status === 'errored') &&
                                            <Button
                                              className="m-3"
                                              size="sm"
                                              variant="warning"
                                            >
                                              Bank error.
                                            </Button>
                                          }
                                          {source.status === 'verified' &&
                                            <Button
                                              className="m-3"
                                              size="sm"
                                              variant="outline-success"
                                              disabled
                                            >
                                              Bank verified
                                            </Button>
                                          }
                                        </td>
                                      }
                                      {source.id.includes('card') &&
                                        <td>•••• •••• •••• {source.last4}</td>
                                      }
                                      <td align="center" style={{ verticalAlign: 'middle' }}>
                                        {source.id === this.state.customer_default_source &&
                                          <span className="badge badge-pill badge-primary">DEFAULT</span>
                                        }
                                        {source.id !== this.state.customer_default_source &&
                                          <React.Fragment>
                                          {this.state.set_default_loading &&
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                          }
                                          {!this.state.set_default_loading &&
                                            <Button
                                              className="m-3"
                                              onClick={(e) => {this.updateCustomerDefaultSource(e, source.id)}}
                                              size="sm"
                                              variant="outline-primary"
                                            >
                                              Set as DEFAULT
                                            </Button>
                                          }
                                          </React.Fragment>}
                                      </td>
                                      <td align="center">
                                        {source.id.includes('card_') &&
                                          <Button
                                            className="m-3"
                                            onClick={(e) => {this.launchActionModal(e, source.id, 'update')}}
                                            size="sm"
                                            variant="outline-primary"
                                          >
                                            Update
                                          </Button>
                                        }
                                      </td>
                                      <td align="center">
                                        <Button
                                          className="m-3"
                                          onClick={(e) => {this.launchActionModal(e, source.id, 'delete')}}
                                          size="sm"
                                          variant="outline-primary"
                                        >
                                          Delete
                                        </Button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <ActionModal
                          show={this.state.show_action_modal}
                          onHide={this.closeActionModal}
                          action={this.state.action_type}
                          refreshPaymentMethods={this.setUserPaymentMethods}
                          source_id={this.state.selected_source}
                        />
                      </section>
                      <hr />
                      <section id="previous-purchases" className="my-5" >
                        <h2>Previous Purchases</h2>
                        <Row style={{marginBottom: '1rem'}}>
                          <Col>
                            <Table striped bordered hover responsive>
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
        <div style={{height: '10rem'}} className="d-block d-sm-none bg-light"></div>
        <div style={{height: '6rem'}} className="d-none d-sm-block d-lg-none bg-light"></div>
        {this.state.signed_in &&
          <DashboardBottomMenu
            items={[['account', 'fa-user-cog'], ['donations', 'fa-donate'], ['payment-methods', 'fa-credit-card'], ['previous-purchases', 'fa-store'], ['upcoming-events', 'fa-clock']]}
          />
        }
      </React.Fragment>
    )
  }
}

export default Dashboard