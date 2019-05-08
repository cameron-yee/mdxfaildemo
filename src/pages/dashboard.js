import React, { Component } from 'react'
import SEO from '../components/seo'

import axios from 'axios'
import { navigate } from '@reach/router'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

import DeleteBankModal from '../components/molecules/payment/bank/delete-bank-modal'
import DeleteCardModal from '../components/molecules/payment/card/delete-card-modal'
import LaunchDeleteBankModal from '../components/molecules/payment/bank/launch-delete-bank-modal'
import LaunchDeleteCardModal from '../components/molecules/payment/card/launch-delete-card-modal'
import LaunchUpdateCardModal from '../components/molecules/payment/card/launch-update-card-modal'
import LaunchUpdateDonationModal from '../components/molecules/payment/donation/launch-update-donation-modal'
import UpdateCardModal from '../components/molecules/payment/card/update-card-modal'
import UpdateDonationModal from '../components/molecules/payment/donation/update-donation-modal'

import retrieveStripeCustomerDonationSubscriptions from '../queries/bscsapi/stripe/retrieve-stripe-customer-donation-subscriptions'
// import retrieveStripeCustomerCard from '../queries/bscsapi/stripe/retrieve-stripe-customer-card'

/* Dashboard functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentDidUpdate(prevProps, prevState) {...}
  * componentWillUnmount() {...}
  * closeDeleteCardModal = () => {...}
  * closeUpdateCardModal = () => {...}
  * launchDeleteCardModal = () => {...}
  * launchUpdateCardModal = () => {...}
  * render() {...}
  *
*/

const Dashboard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signed_in: undefined,
      show_delete_bank_modal: false,
      show_delete_card_modal: false,
      show_update_card_modal: false,
      show_update_donation_modal: false,
      subscriptions: []
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.getUserRecurringDonations()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.signed_in !== prevState.signed_in && !this.state.signed_in) {
      navigate('/')
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
  // closeDeleteBankModal = () => {
  //   this.setState({show_delete_bank_modal: false})
  //   if(this.props.closePayment) {
  //     this.props.closePayment()
  //   }
  // }

  // closeDeleteCardModal = () => {
  //   this.setState({show_delete_card_modal: false})
  //   if(this.props.closePayment) {
  //     this.props.closePayment()
  //   }
  // }

  // closeUpdateCardModal = () => {
  //   this.setState({show_update_card_modal: false})
  //   if(this.props.closePayment) {
  //     this.props.closePayment()
  //   }
  // }

  // closeUpdateDonationModal = () => {
  //   this.setState({show_update_donation_modal: false})
  //   if(this.props.closePayment) {
  //     this.props.closePayment()
  //   }
  // }

  closeModal = (crud, type) => {
    this.setState({[`show_${crud}_${type}_modal`]: false})
    if(this.props.closePayment) {
      this.props.closePayment()
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

  launchDeleteBankModal = () => { this.setState({show_delete_bank_modal: true}) }
  launchDeleteCardModal = () => { this.setState({show_delete_card_modal: true}) }
  launchUpdateCardModal = () => { this.setState({show_update_card_modal: true}) }
  launchUpdateDonationModal = () => { this.setState({show_update_donation_modal: true}) }
//End custom functions

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Dashboard"
          description=""
          canonical="https://bscs.org/dashboard"
        />
        <Layout location={this.props.location} setSignedIn={(state) => this.setState({signed_in: state})}>
          <Container>
            <PageTitle title="Dashboard" />
            <h2>Recurring Donations</h2>
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Payment Type</th>
                      <th>Next scheduled payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
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
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr />
            <h2>Card Settings</h2>
            <Row style={{marginBottom: '3rem', height: '100px'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2 h-100">
                <LaunchUpdateCardModal launchUpdateCard={this.launchUpdateCardModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Update Payment Card</Button>
                </LaunchUpdateCardModal>
                <UpdateCardModal
                  show={this.state.show_update_card_modal}
                  onHide={() => this.closeModal('update', 'card')}
                  signed_in={this.state.signed_in}
                />
                <LaunchDeleteCardModal launchDeleteCard={this.launchDeleteCardModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Delete Payment Card</Button>
                </LaunchDeleteCardModal>
                <DeleteCardModal
                  show={this.state.show_delete_card_modal}
                  onHide={() => this.closeModal('delete', 'card')}
                  signed_in={this.state.signed_in}
                />
              </Col>
            </Row>
            <hr />
            <h2>Bank Settings</h2>
            <Row style={{marginBottom: '3rem', height: '100px'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2 h-100">
                {/* <LaunchUpdateCardModal launchUpdateCard={this.launchUpdateCardModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Update Payment Card</Button>
                </LaunchUpdateCardModal>
                <UpdateCardModal show={this.state.show_update_card_modal} onHide={this.closeUpdateCardModal} signed_in={this.state.signed_in} /> */}
                <LaunchDeleteBankModal launchDeleteBank={this.launchDeleteBankModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Delete Payment Bank Account</Button>
                </LaunchDeleteBankModal>
                <DeleteBankModal
                  show={this.state.show_delete_bank_modal}
                  onHide={() => this.closeModal('delete', 'bank')}
                  signed_in={this.state.signed_in}
                />
              </Col>
            </Row>
            <hr />
            <h2>Donation Settings</h2>
            <Row style={{marginBottom: '3rem', height: '100px'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2 h-100">
                <LaunchUpdateDonationModal launchUpdateDonation={this.launchUpdateDonationModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Update Donation</Button>
                </LaunchUpdateDonationModal>
                <UpdateDonationModal
                  show={this.state.show_update_donation_modal}
                  onHide={() => this.closeModal('update', 'donation')}
                  signed_in={this.state.signed_in}
                />
                {/* <LaunchDeleteBankModal launchDeleteBank={this.launchDeleteBankModal}>
                  <Button className="h-100 m-3" variant="outline-secondary">Delete Payment Bank Account</Button>
                </LaunchDeleteBankModal>
                <DeleteBankModal show={this.state.show_delete_bank_modal} onHide={this.closeDeleteBankModal} signed_in={this.state.signed_in} /> */}
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default Dashboard