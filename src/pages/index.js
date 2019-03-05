import React from 'react'
import { Link } from 'gatsby'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We develop science instructional materials for students.
              </Card.Text>
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We provide professional learning programs for science teachers.
              </Card.Text>
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We spearhead leadership development programs for schools and districts.
              </Card.Text>
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We conduct research on science teaching and learning.
              </Card.Text>
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
