import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'

import '../global-scss/index.scss'

// import cardImage from '../queries/images/card-image'


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
        <Col style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image1.childImageSharp.fluid} 
              className="card-img-top" 
            />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We develop science instructional materials for students.
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                background: 'white',
                borderTop: 'none',
                marginBottom: '.5rem'
              }}
            >
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image2.childImageSharp.fluid} 
              className="card-img-top" 
            />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We provide professional learning programs for science teachers.
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                background: 'white',
                borderTop: 'none',
                marginBottom: '.5rem'
              }}
            >
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image3.childImageSharp.fluid} 
              className="card-img-top" 
            />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We spearhead leadership development programs for schools and districts.
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                background: 'white',
                borderTop: 'none',
                marginBottom: '.5rem'
              }}
            >
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image4.childImageSharp.fluid} 
              className="card-img-top" 
            />
            <Card.Body>
              {/* <Card.Title>Card Title</Card.Title> */}
              <Card.Text className="lead">
                We conduct research on science teaching and learning.
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                background: 'white',
                borderTop: 'none',
                marginBottom: '.5rem'
              }}
            >
              <div className="d-flex">
                <div className="ml-auto">
                  <Link to="/what-we-do/">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage

export const cardImage = graphql`
  fragment cardImage on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "homepage/male-student.jpg" }) {
      ...cardImage
    }
    image2: file(relativePath: { eq: "homepage/teacher-and-students.jpg" }) {
      ...cardImage
    }
    image3: file(relativePath: { eq: "homepage/young-girl.jpg" }) {
      ...cardImage
    }
    image4: file(relativePath: { eq: "homepage/young-boy.jpg" }) {
      ...cardImage
    }
  }
`
