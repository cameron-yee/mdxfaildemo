import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header/header'
import Footer from './footer/footer'
import GeneralContactFormModal from '../atoms/forms/general-contact-form/general-contact-form-modal/general-contact-form-modal'
import JoinEmailFormModal from '../atoms/forms/join-email-form/join-email-form-modal/join-email-form-modal'
import SigninFormModal from '../atoms/forms/signin-form/signin-form-modal'
import PaymentModal from '../molecules/payment/payment-modal'

import 'typeface-open-sans'
import 'typeface-lora'
import './layout.scss'

import axios from 'axios'

import checkIfUserSignedIn from '../../utils/check-if-user-signed-in'

const Layout = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: null,
      description: null,
      modalShowGeneral: false,
      modalShowJoinEmail: false,
      modalShowSignin: false,
      modalShowPayment: false,
      product: null,
      signedIn: false
    }

    //Need componentWillUnmount
    this.cancelToken = axios.CancelToken.source()
  }

  componentDidMount() {
    if(this.props.product && this.props.amount && this.props.description) {
      this.setState({
        amount: this.props.amount,
        description: this.props.description,
        product: this.props.product,
      })
    }

    this.checkSignInStatus()
  }

  checkSignInStatus = async () => {
    let user_state = await checkIfUserSignedIn(this.cancelToken)
    this.setState({signedIn: user_state})
    if(this.props.setSignedIn) {
      this.props.setSignedIn(user_state)
    }
  }

  setSignedIn = (user_state) => {
    this.setState({ signedIn: user_state })
    if(this.props.setSignedIn) {
      this.props.setSignedIn(user_state)
    }
  }

  launchGeneral = () => { this.setState({modalShowGeneral: true}) }
  closeGeneral = () => {
    this.setState({modalShowGeneral: false})
    if(this.props.closeGeneral) {
      this.props.closeGeneral()
    }
  }

  launchJoinEmail = () => { this.setState({modalShowJoinEmail: true}) }
  closeJoinEmail = () => {
    this.setState({modalShowJoinEmail: false})
    if(this.props.closeJoinEmail) {
      this.props.closeJoinEmail()
    }
  }

  launchSignin = () => { this.setState({modalShowSignin: true}) }
  closeSignin = () => {
    this.setState({modalShowSignin: false})
    if(this.props.closeSignin) {
      this.props.closeSignin()
    }
  }

  launchPayment = () => { this.setState({modalShowPayment: true}) }
  closePayment = () => {
    this.setState({modalShowPayment: false})
    if(this.props.closePayment) {
      this.props.closePayment()
    }
  }

  setPaymentProduct = (product) => {
    this.setState({ product: product })
  }

  setPaymentAmount = (amount) => {
    this.setState({ amount: amount })
  }

  setPaymentDescription = (description) => {
    this.setState({ amount: description })
  }

  componentDidUpdate(prevProps) {
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

    // if(this.props.setSignedIn && prevProps.setSignedIn !== this.props.signedIn) {
    //   this.setState({signedIn: true})
    // }
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
              signedin={this.state.signedIn}
              signOut={() => this.setSignedIn(false)}
            />
            {this.props.children}
            <Footer
              launchGeneral={this.launchGeneral}
              launchJoinEmail={this.launchJoinEmail}
              location={this.props.location}
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
              signedIn={this.state.signedIn}
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
