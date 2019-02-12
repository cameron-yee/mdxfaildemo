import React from 'react'
// import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
// import Button from 'react-bootstrap/Button'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './index.scss'

// import pckLogo from '../images/pck_logo.svg'


const IndexPage = props => (
  <Layout location={props.location}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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
          
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
