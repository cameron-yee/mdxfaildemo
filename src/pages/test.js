import React from 'react'
import AniLink from 'gatsby-plugin-transition-link'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
// import Button from 'react-bootstrap/Button'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

import '../global-scss/index.scss'

// import pckLogo from '../images/pck_logo.svg'


const TestPage = (props) => (
  <Layout location={props.location}>
    <SEO title="Test" />
    <Jumbotron className="indexJumbotron">
      <div className="indexJumbotron-inside">
        <div className="indexJumbotronContent">
          <h1 className="indexJumbotronHeading">BSCS MISSION:</h1>
          <h1 className="indexJumbotronHeading">To Transform Science Teaching and Learning through Research-Driven Innovation.</h1>
        </div>
      </div>
    </Jumbotron>
    <Container>
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
          <AniLink to="/">home</AniLink>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default TestPage
