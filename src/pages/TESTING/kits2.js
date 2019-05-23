import React, { Component } from 'react'
import SEO from '../../components/seo'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
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
      metadata: {},
      ship: true
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
          ship={this.state.ship}
        >
          <Container>
            <PageTitle title="OpenSciEd Kits" />
            <Row style={{marginBottom: '1rem'}} className="d-flex">
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit63A
                    </Card.Title>
                    <p>6.1 <strong>Specialized</strong> Equipment and Supplies Kit for OpenSciEd 6.1 <strong>Light: Why do we sometimes see different things when looking at the same object?</strong></p>
                    {/* <p>Kit Price: $303.60</p>
                    <p>Shipping Cost: $60</p>
                    <p className="mb-0">Total: $363.60</p> */}
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $303.60</p>
                        <p>Shipping Cost: $60</p>
                        <p><strong>Total: $363.60</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7cYj4pmYKy7yr"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit63A",
                            metadata: {contact: "Alyssa Markle"},
                            ship: true
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit63B
                    </Card.Title>
                    <p>6.1 <strong>Complete</strong> Kit for OpenSciEd Unit <strong>6.1 Light: Why do we sometimes see different things when looking at the same object?</strong></p>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $425.70</p>
                        <p>Shipping Cost: $80</p>
                        <p><strong>Total: $505.70</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7caVuMuka8uvY"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit63B",
                            metadata: {contact: "Alyssa Markle"}
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit73A
                    </Card.Title>
                    <p>7.1 <strong>Specialized</strong> Equipment and Supplies Kit for OpenSciEd Unit <strong>7.1 Chemical Reactions: How can we make something new that was not there before?</strong></p>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $230.57</p>
                        <p>Shipping Cost: $80</p>
                        <p><strong>Total: $310.57</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7cciWpb9oWPrd"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit73A",
                            metadata: {contact: "Alyssa Markle"}
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit73B
                    </Card.Title>
                    <p>7.1 <strong>Complete</strong> Kit for OpenSciEd Unit <strong>7.1 Chemical Reactions: How can we make something new that was not there before?</strong></p>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $567.75</p>
                        <p>Shipping Cost: $100</p>
                        <p><strong>Total: $667.75</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7cde8knFxNHWn"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit73B",
                            metadata: {contact: "Alyssa Markle"}
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit83A
                    </Card.Title>
                    <p>8.1 <strong>Specialized</strong> Equipment and Supplies Kit for OpenSciEd Unit <strong>8.1 Contact Forces: How do collisions cause damage?</strong></p>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $471.63</p>
                        <p>Shipping Cost: $60</p>
                        <p><strong>Total: $531.63</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7ceA8XBoUzyMp"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit83A",
                            metadata: {contact: "Alyssa Markle"}
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} md={4} className="p-2">
                <Card className="h-100">
                  <Card.Body className="pb-0">
                    <Card.Title
                      style={{
                        marginBottom: '1.5rem'
                      }}
                    >
                      Kit83B
                    </Card.Title>
                    <p>8.1 <strong>Complete</strong> Kit for OpenSciEd Unit <strong>8.1 Contact Forces: How do collisions cause damage?</strong></p>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      background: 'white',
                      borderTop: 'none',
                      marginBottom: '.5rem',
                    }}
                  >
                    <div className="d-flex justify-content-end flex-wrap">
                      <div className="text-right w-100">
                        <p>Kit Price: $671.21</p>
                        <p>Shipping Cost: $80</p>
                        <p><strong>Total: $751.21</strong></p>
                      </div>
                      <div>
                        <LaunchOrderModal
                          sku="sku_F7cfuqZbKVk8we"
                          launchOrder={(sku) => this.setState({
                            launchOrder: true,
                            sku: sku,
                            product: "Kit83B",
                            metadata: {contact: "Alyssa Markle"}
                          })}
                        >
                          <Button variant="outline-primary">Order</Button>
                        </LaunchOrderModal>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default KitsPage

                        // <SpecificContactForm sendto={order.metadata.contact}>
                        //   <Button variant="outline-primary">Contact {order.metadata.contact}</Button>
                        // </SpecificContactForm>