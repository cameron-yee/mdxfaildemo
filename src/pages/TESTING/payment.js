import React, { Component } from 'react'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import Row from 'react-bootstrap/Row'

import '../../global-scss/index.scss'

import { Elements, StripeProvider } from 'react-stripe-elements'
import AddNewCreditCardForm from '../../components/atoms/forms/add-new-credit-card/add-new-credit-card-form'

const PaymentPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripe: null
    }
  }

  componentDidMount() {
    try {
      const stripeJs = document.createElement('script');
      stripeJs.async = true;
      stripeJs.id = "stripe-js"
      stripeJs.src = 'https://js.stripe.com/v3/';
      document.getElementsByTagName('head')[0].appendChild(stripeJs)
      console.log('hit')
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
      setTimeout(() => {
        this.setState({stripe: window.Stripe('pk_test_TbAwjfiPhymqoFVFe7ciXbZE')})
      }, 500)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    if(!this.state.stripe) {
      return (<p>Loading</p>)
    } else {
      return (
        <React.Fragment>
          <SEO
            title="Payment"
            description=""
            canonical="https://bscs.org/payment"
          />
          <Layout location={this.props.location}>
            <Container>
              <PageTitle title="Payment" />
              <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
                <Col md={6} className="p-2">
                  <StripeProvider stripe={this.state.stripe}>
                    <Elements>
                      <AddNewCreditCardForm />
                    </Elements>
                  </StripeProvider>
                </Col>
              </Row>
            </Container>
          </Layout>
        </React.Fragment>
      )
    }
  }
}

export default PaymentPage