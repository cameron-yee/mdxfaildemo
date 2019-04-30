import React, { Component } from 'react'
import SEO from '../components/seo'

import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { navigate } from '@reach/router';

import LaunchDeleteCardModal from '../components/molecules/payment/card/launch-delete-card-modal'
import DeleteCardModal from '../components/molecules/payment/card/delete-card-modal'
import LaunchUpdateCardModal from '../components/molecules/payment/card/launch-update-card-modal'
import UpdateCardModal from '../components/molecules/payment/card/update-card-modal'

const Dashboard = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signed_in: undefined,
      show_delete_card_modal: false,
      show_update_card_modal: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.signed_in)
    console.log(this.state.signed_in)
    if(this.state.signed_in !== prevState.signed_in && !this.state.signed_in) {
      navigate('/')
    }
  }

  launchDeleteCardModal = () => { this.setState({show_delete_card_modal: true}) }
  closeDeleteCardModal = () => {
    this.setState({show_delete_card_modal: false})
    if(this.props.closePayment) {
      this.props.closePayment()
    }
  }

  launchUpdateCardModal = () => { this.setState({show_update_card_modal: true}) }
  closeUpdateCardModal = () => {
    this.setState({show_update_card_modal: false})
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
        <Layout location={this.props.location} setSignedIn={(state) => this.setState({signed_in: state})}>
          <Container>
            <PageTitle title="Dashboard" />
            <Row style={{marginBottom: '1rem'}} className="d-flex flex-wrap-reverse">
              <Col className="p-2">
                <LaunchUpdateCardModal launchUpdateCard={this.launchUpdateCardModal}>
                  <Button variant="outline-primary">Update Payment Card</Button>
                </LaunchUpdateCardModal>
                <UpdateCardModal show={this.state.show_update_card_modal} onHide={this.closeUpdateCardModal} signed_in={this.state.signed_in} />
              </Col>
              <Col className="p-2">
                <LaunchDeleteCardModal launchDeleteCard={this.launchDeleteCardModal}>
                  <Button variant="outline-primary">Delete Payment Card</Button>
                </LaunchDeleteCardModal>
                <DeleteCardModal show={this.state.show_delete_card_modal} onHide={this.closeDeleteCardModal} signed_in={this.state.signed_in} />
              </Col>
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default Dashboard