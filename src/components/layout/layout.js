import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header'
import Footer from './footer/footer'
import DonateModal from '../molecules/payment/donate-modal'
import GeneralContactFormModal from '../atoms/forms/general-contact-form/general-contact-form-modal/general-contact-form-modal'
import JoinEmailFormModal from '../atoms/forms/join-email-form/join-email-form-modal/join-email-form-modal'
import SigninFormModal from '../atoms/forms/signin-form/signin-form-modal'
import OrderModal from '../molecules/payment/order-modal'
import PaymentModal from '../molecules/payment/payment-modal'

import 'typeface-open-sans'
import 'typeface-lora'
import './layout.scss'

import axios from 'axios'

import checkIfUserSignedIn from '../../utils/check-if-user-signed-in'

//TODO: Reduce same functions into one function
/* Layout functions
  *
  * constructor(props) {...}
  * componentDidMount() {...}
  * componentDidUpdate(prevProps) {...}
  * checkSignInStatus = async () => {...}
  * closeDonate = () => {...}
  * closeGeneral = () => {...}
  * closeJoinEmail = () => {...}
  * closePayment = () => {...}
  * closeSignin = () => {...}
  * launchDonate = () => {...}
  * launchGeneral = () => {...}
  * launchJoinEmail = () => {...}
  * launchPayment = () => {...}
  * launchSignin = () => {...}
  * setPaymentAmount = (amount) => {...}
  * setPaymentDescription = (description) => {...}
  * setPaymentProduct = (product) => {...}
  * setSignedIn = (user_state) => {...}
  * render() {...}
  *
*/

const Layout = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: null,
      description: null,
      modalShowDonate: false,
      modalShowGeneral: false,
      modalShowJoinEmail: false,
      modalShowSignin: false,
      modalShowOrder: false,
      modalShowPayment: false,
      product: null,
      signed_in: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

//Lifecycle hooks
  componentDidMount() {
    this.setStripeScript()
    if(this.props.product && this.props.amount && this.props.description) {
      this.setState({
        amount: this.props.amount,
        description: this.props.description,
        product: this.props.product,
      })
    }

    this.checkSignInStatus()
  }

  componentWillUnmount() {
    try {
      this.cancelToken.cancel()
    } catch(error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.launchDonate && prevProps.launchDonate !== this.props.launchDonate) {
      this.setState({modalShowDonate: true})
    }

    if(this.props.launchGeneral && prevProps.launchGeneral !== this.props.launchGeneral) {
      this.setState({modalShowGeneral: true})
    }

    if(this.props.launchJoinEmail && prevProps.launchJoinEmail !== this.props.launchJoinEmail) {
      this.setState({modalShowJoinEmail: true})
    }

    if(this.props.launchSignin && prevProps.launchSignin !== this.props.launchSignin) {
      this.setState({modalShowSignin: true})
    }

    if(this.props.launchOrder && prevProps.launchOrder !== this.props.launchOrder) {
      this.setState({modalShowOrder: true})
    }

    if(this.props.launchPayment && prevProps.launchPayment !== this.props.launchPayment) {
      this.setState({modalShowPayment: true})
    }

    if(this.props.signed_in && prevProps.signed_in !== this.props.signed_in) {
      this.setState({signed_in: this.props.signed_in})
    }
  }
//End lifecycle hooks

//Custom functions
  checkSignInStatus = async () => {
    let user_state = await checkIfUserSignedIn(this.cancelToken)
    this.setState({signed_in: user_state})
    if(this.props.setSignedIn) {
      this.props.setSignedIn(user_state)
    }
  }

  closeDonate = () => {
    this.setState({modalShowDonate: false})
    if(this.props.closeDonate) {
      this.props.closeDonate()
    }
  }

  closeGeneral = () => {
    this.setState({modalShowGeneral: false})
    if(this.props.closeGeneral) {
      this.props.closeGeneral()
    }
  }

  closeJoinEmail = () => {
    this.setState({modalShowJoinEmail: false})
    if(this.props.closeJoinEmail) {
      this.props.closeJoinEmail()
    }
  }

  closeOrder = () => {
    this.setState({modalShowOrder: false})
    if(this.props.closeOrder) {
      this.props.closeOrder()
    }
  }

  closePayment = () => {
    this.setState({modalShowPayment: false})
    if(this.props.closePayment) {
      this.props.closePayment()
    }
  }

  closeSignin = () => {
    this.setState({modalShowSignin: false})
    if(this.props.closeSignin) {
      this.props.closeSignin()
    }
  }

  launchDonate = () => { this.setState({modalShowDonate: true}) }
  launchGeneral = () => { this.setState({modalShowGeneral: true}) }
  launchJoinEmail = () => { this.setState({modalShowJoinEmail: true}) }
  launchOrder = () => { this.setState({modalShowOrder: true}) }
  launchPayment = () => { this.setState({modalShowPayment: true}) }
  launchSignin = () => { this.setState({modalShowSignin: true}) }

  setPaymentAmount = (amount) => {
    this.setState({ amount: amount })
  }

  setPaymentDescription = (description) => {
    this.setState({ amount: description })
  }

  setPaymentProduct = (product) => {
    this.setState({ product: product })
  }

  setSignedIn = (user_state) => {
    this.setState({ signed_in: user_state })
    if(this.props.setSignedIn) {
      this.props.setSignedIn(user_state)
    }
  }

  setStripeScript = () => {
    try {
      const stripeJs = document.createElement('script');
      stripeJs.async = true;
      stripeJs.id = "stripe-js"
      stripeJs.src = 'https://js.stripe.com/v3/';
      document.getElementsByTagName('head')[0].appendChild(stripeJs)
    } catch(error) {
      console.log(error)
    }
  }
//End custom functions

  render() {
    // const children_with_props = React.Children.map(this.props.children, child => {
    //   React.cloneElement(child, { signed_in: this.state.signed_in})
    // })

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                author
                description
              }
            }
          }
        `}
        render={data => (
          <React.Fragment>
            <Header
              launchGeneral={this.launchGeneral}
              launchJoinEmail={this.launchJoinEmail}
              launchSignin={this.launchSignin}
              location={this.props.location}
              signed_in={this.state.signed_in}
              signOut={() => this.setSignedIn(false)}
            />
            {this.props.children}
            <Footer
              launchGeneral={this.launchGeneral}
              launchJoinEmail={this.launchJoinEmail}
              location={this.props.location}
            />
            <DonateModal
              onHide={this.closeDonate}
              setSignedIn={() => this.setSignedIn(true)}
              show={this.state.modalShowDonate}
              signed_in={this.state.signed_in}
            />
            <GeneralContactFormModal
              show={this.state.modalShowGeneral}
              onHide={this.closeGeneral}
            />
            <JoinEmailFormModal
              onHide={this.closeJoinEmail}
              show={this.state.modalShowJoinEmail}
            />
            <SigninFormModal
              show={this.state.modalShowSignin}
              onHide={this.closeSignin}
              setSignedIn={() => this.setSignedIn(true)}
              signed_in={this.state.signed_in}
            />
            <PaymentModal
              amount={this.state.amount}
              description={this.state.description}
              onHide={this.closePayment}
              product={this.state.product}
              setSignedIn={() => this.setSignedIn(true)}
              show={this.state.modalShowPayment}
              signed_in={this.state.signed_in}
            />
            <OrderModal
              // amount={this.state.amount}
              // description={this.state.description}
              onHide={this.closeOrder}
              product={this.props.product}
              setSignedIn={() => this.setSignedIn(true)}
              show={this.state.modalShowOrder}
              sku={this.props.sku}
              metadata={this.props.metadata}
              signed_in={this.state.signed_in}
            />
          </React.Fragment>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
