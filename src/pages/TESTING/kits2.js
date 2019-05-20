import React, { Component } from 'react'
import SEO from '../../components/seo'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import LaunchOrderModal from '../../components/molecules/payment/launch-order-modal';

import '../../global-scss/index.scss'

const KitsPage = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      launchOrder: false,
      sku: undefined,
      product: "Order Kit xxxxxx",
      metadata: {}
    }

    this.cancelToken = axios.CancelToken.source()
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Payment"
          description=""
          canonical="https://bscs.org/kits"
        />
        <Layout
          closeOrder={() => this.setState({launchOrder: false})}
          launchOrder={this.state.launchOrder}
          location={this.props.location}
          product={this.state.product}
          sku={this.state.sku}
          metadata={this.state.metadata}
        >
          <Container>
            <PageTitle title="OpenSciEd Kits" />
            <Row style={{marginBottom: '1rem'}} className="d-flex">
              <Col md={12} className="p-2">
                <LaunchOrderModal
                  sku="prod_F5Mcxpqu2sNOgt"
                  launchOrder={(sku) => this.setState({
                    launchOrder: true,
                    sku: sku,
                    product: "Kit #1",
                    metadata: {contact: "Cameron Yee", date: "12/12/12"}
                  })}
                >
                  <Button variant="outline-primary">Order Kit #1</Button>
                </LaunchOrderModal>
              </Col>
              <Col md={12} className="p-2">
                <LaunchOrderModal
                  // sku="prod_2"
                  sku="prod_F5Mcxpqu2sNOgt"
                  launchOrder={(sku) => this.setState({
                    launchOrder: true,
                    sku: sku,
                    product: "Kit #2",
                    metadata: {contact: "Cameron Yee", date: "12/12/12"}
                  })}
                >
                  <Button variant="outline-primary">Order Kit #2</Button>
                </LaunchOrderModal>
              </Col>
              <Col md={12} className="p-2">
                <LaunchOrderModal
                  sku="prod_3"
                  launchOrder={(sku) => this.setState({
                    launchOrder: true,
                    sku: sku,
                    product: "Kit #3",
                    metadata: {contact: "Cameron Yee", date: "12/12/12"}
                  })}
                >
                  <Button variant="outline-primary">Order Kit #3</Button>
                </LaunchOrderModal>
              </Col>
              <Col md={12} className="p-2">
                <LaunchOrderModal
                  sku="prod_4"
                  launchOrder={(sku) => this.setState({
                    launchOrder: true,
                    sku: sku,
                    product: "Kit #4",
                    metadata: {contact: "Cameron Yee", date: "12/12/12"}
                  })}
                >
                  <Button variant="outline-primary">Order Kit #4</Button>
                </LaunchOrderModal>
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default KitsPage
