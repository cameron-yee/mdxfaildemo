import React, { Component } from 'react'
import SEO from '../components/seo'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { navigate } from '@reach/router';

import LaunchUpdateCardModal from '../components/molecules/payment/card/launch-update-card-modal'
import UpdateCardModal from '../components/molecules/payment/card/update-card-modal'

const Dashboard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: undefined
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.signedIn)
    console.log(this.state.signedIn)
    if(this.state.signedIn !== prevState.signedIn && !this.state.signedIn) {
      navigate('/')
    }
  }

  launchUpdateCardModal = () => { this.setState({showUpdateCardModal: true}) }
  closeUpdateCardModal = () => {
    this.setState({showUpdateCardModal: false})
    if(this.props.closePayment) {
      this.props.closePayment()
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Dashboard"
          description=""
          canonical="https://bscs.org/dashboard"
        />
        <Layout location={this.props.location} setSignedIn={(state) => this.setState({signedIn: state})}>
          <Container>
            <PageTitle title="Dashboard" />
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2">
                <LaunchUpdateCardModal launchUpdateCard={this.launchUpdateCardModal}>
                  <Button variant="outline-primary">Update Payment Card</Button>
                </LaunchUpdateCardModal>
                <UpdateCardModal show={this.state.showUpdateCardModal} onHide={this.closeUpdateCardModal} signedIn={this.state.signedIn} />
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default Dashboard