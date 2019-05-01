import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header'
import Footer from './footer/footer'
import DonateModal from '../molecules/payment/donate-modal'
import GeneralContactFormModal from '../atoms/forms/general-contact-form/general-contact-form-modal/general-contact-form-modal'
import JoinEmailFormModal from '../atoms/forms/join-email-form/join-email-form-modal/join-email-form-modal'
import SigninFormModal from '../atoms/forms/signin-form/signin-form-modal'
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
      modalShowPayment: false,
      product: null,
      signed_in: false
    }

    //Need componentWillUnmount
    this.cancelToken = axios.CancelToken.source()
  }

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

    if(this.props.launchPayment && prevProps.launchPayment !== this.props.launchPayment) {
      this.setState({modalShowPayment: true})
    }
  }

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

  render() {
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
              show={this.state.modalShowDonate}
              onHide={this.closeDonate}
              setSignedIn={() => this.setSignedIn(true)}
              signed_in={this.state.signed_in}
            />
            <GeneralContactFormModal
              show={this.state.modalShowGeneral}
              onHide={this.closeGeneral}
            />
            <JoinEmailFormModal
              show={this.state.modalShowJoinEmail}
              onHide={this.closeJoinEmail}
            />
            <SigninFormModal
              show={this.state.modalShowSignin}
              onHide={this.closeSignin}
              setSignedIn={() => this.setSignedIn(true)}
            />
            <PaymentModal
              show={this.state.modalShowPayment}
              onHide={this.closePayment}
              setSignedIn={() => this.setSignedIn(true)}
              signed_in={this.state.signed_in}
              product={this.state.product}
              amount={this.state.amount}
              description={this.state.description}
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
