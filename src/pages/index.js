import React from 'react'
// import { Link } from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink"
import TransitionLink from "gatsby-plugin-transition-link"

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
          <AniLink fade to="page2">Test</AniLink><br /><br />
          <TransitionLink to="page2" exit={{ length: 0.5 }}>
            Go to page 2
          </TransitionLink>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
