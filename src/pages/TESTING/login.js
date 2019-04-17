import React, { Component } from 'react'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import Row from 'react-bootstrap/Row'

import LoginForm from '../../components/atoms/forms/login-form/login-form'

import '../../global-scss/index.scss'

const PaymentPage = class extends Component {
  render() {
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
              <Col className="p-2">
                <LoginForm />
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default PaymentPage
