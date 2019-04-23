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

import axios from 'axios'
import LaunchPaymentModal from '../../components/molecules/payment/launch-payment-modal';

const PaymentPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchPayment: false,
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
          location={this.props.location}
          launchPayment={this.state.launchPayment}
          closePayment={() => this.setState({launchPayment: false})}
          product="Test Product"
          amount={2000}
          description="Test charge payment."
        >
          <Container>
            <PageTitle title="Payment" />
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col md={6} className="p-2">
                <LaunchPaymentModal launchPayment={() => this.setState({launchPayment: true})}>
                  <Button variant="outline-primary">Pay Now</Button>
                </LaunchPaymentModal>
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default PaymentPage