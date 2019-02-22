import React from 'react'
import { Link } from 'gatsby'

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
          <Link fade to="page2">Test</Link><br /><br />
          <Link to="page2" exit={{ length: 0.5 }}>
            Go to page 2
          </Link>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
