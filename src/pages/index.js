import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

import '../global-scss/index.scss'


const IndexPage = (props) => (
  <Layout location={props.location}>
    <SEO title="Home" />
    <Jumbotron className="jumbotron jumbotron-index">
      <div className="jumbotron-inside">
        <div className="jumbotronContent">
          <h1 className="jumbotronHeading">BSCS MISSION:</h1>
          <h1 className="jumbotronHeading">To Transform Science Teaching and Learning through Research-Driven Innovation.</h1>
        </div>
      </div>
    </Jumbotron>
    <Container>
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
