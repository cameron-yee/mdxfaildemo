import React, { Component } from 'react'
import SEO from '../../components/seo'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import LaunchDonateModal from '../../components/molecules/payment/launch-donate-modal';
import LaunchPaymentModal from '../../components/molecules/payment/launch-payment-modal';

import '../../global-scss/index.scss'

const PaymentPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchPayment: false,
      launchDonate: false
    }

    this.cancelToken = axios.CancelToken.source()
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Payment"
          description=""
          canonical="https://bscs.org/payment"
        />
        <Layout
          amount={2000}
          closeDonate={() => this.setState({launchDonate: false})}
          closePayment={() => this.setState({launchPayment: false})}
          description="Test charge payment."
          launchDonate={this.state.launchDonate}
          launchPayment={this.state.launchPayment}
          location={this.props.location}
          product="OpenSciEd Kit"
        >
          <Container>
            <PageTitle title="Payment" />
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col md={6} className="p-2">
                <LaunchPaymentModal launchPayment={() => this.setState({launchPayment: true})}>
                  <Button variant="outline-primary">Pay Now</Button>
                </LaunchPaymentModal>
              </Col>
              <Col md={6} className="p-2">
                <LaunchDonateModal launchDonate={() => this.setState({launchDonate: true})}>
                  <Button variant="outline-primary">Donate</Button>
                </LaunchDonateModal>
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default PaymentPage