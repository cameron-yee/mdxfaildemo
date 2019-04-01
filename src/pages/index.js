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

// eslint-disable-next-line
import cardImage from '../queries/images/card-image'

// eslint-disable-next-line
import rowImage from '../queries/images/row-image'


const IndexPage = (props) => (
  <Layout location={props.location}>
    <SEO title="Home" />
    <Jumbotron className="jumbotron jumbotron-index" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      {/* <Img
        fluid={props.data.jumbotron.childImageSharp.fluid}
        style={{
          position: 'absolute',
          // top: '0px',
          // left: '0px',
          // width: '100%',
          // height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          opacity: '1',
          transition: 'opacity 0.5s ease 0s'
        }}
      /> */}
      <div className="jumbotron-inside">
        <div className="jumbotronContent">
          <h1 className="jumbotronHeading">BSCS MISSION:</h1>
          <h1 className="jumbotronHeading">To Transform Science Teaching and Learning through Research-Driven Innovation.</h1>
        </div>
      </div>
    </Jumbotron>
    <Container>
      <Row style={{ marginBottom: '2rem' }}>
        <Col sm={6} lg={3} style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image1.childImageSharp.fluid}
              className="card-img-top"
              // backgroundColor='rgb(41, 52, 118)'
            />
            <Card.Body>
              <Card.Text style={{ fontSize: '1.3rem' }}>
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
                  <Link to="/our-work/what-we-do#instructional-materials-development">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={6} lg={3} style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image2.childImageSharp.fluid}
              className="card-img-top"
              // backgroundColor='rgb(41, 52, 118)'
            />
            <Card.Body>
              <Card.Text style={{ fontSize: '1.3rem' }}>
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
                  <Link to="/our-work/what-we-do#teacher-professional-learning">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={6} lg={3} style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image3.childImageSharp.fluid}
              className="card-img-top"
              // backgroundColor='rgb(41, 52, 118)'
            />
            <Card.Body>
              <Card.Text style={{ fontSize: '1.3rem' }}>
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
                  <Link to="/our-work/what-we-do#leadership-development">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={6} lg={3} style={{ marginBottom: '1.5rem' }}>
          <Card className="h-100">
            <Img
              variant="top"
              fluid={props.data.image4.childImageSharp.fluid}
              className="card-img-top"
              // backgroundColor='rgb(41, 52, 118)'
            />
            <Card.Body>
              <Card.Text style={{ fontSize: '1.3rem' }}>
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
                  <Link to="/our-work/what-we-do#research">
                    <Button variant="outline-secondary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {/* <Row className="mb-3">
        <Col md={{ span: 8, offset: 2 }} className="rounded p-3">
          <h2 className="mb-3">Featured Programs and Resources</h2>
          <p><strong>Program 1</strong></p>
          <p className="mb-3">Pok pok tilde YOLO knausgaard heirloom. Irony enamel pin ugh pug bicycle rights etsy helvetica hella. Lomo wayfarers venmo twee, art party YOLO mustache pok pok man bun chartreuse. Austin beard plaid trust fund.</p>
          <p><strong>Program 2</strong></p>
          <p className="mb-3">Retro godard art party fanny pack crucifix ethical. Distillery twee farm-to-table adaptogen, four loko 3 wolf moon art party XOXO scenester intelligentsia chartreuse banjo pug pinterest leggings.</p>
          <p><strong>Program 3</strong></p>
          <p className="mb-3">Franzen cardigan tbh, leggings tilde 90's prism brunch pop-up fashion axe bushwick. Health goth twee slow-carb pork belly forage, chillwave meditation stumptown vexillologist.</p>
        </Col>
      </Row> */}
      <Row style={{ marginBottom: '2rem' }} noGutters>
        <Col md={8} className="align-items-center rounded-left order-2 order-md-1" >
          <h2 className="pr-3 w-100">Support BSCS Science Learning</h2>
          <p className="pr-3 w-100">We are a proud 501(c)(3) nonprofit organization devoted to science education. Please consider a gift to BSCS this year and help us transform science teaching and learning. Your support makes a difference!</p>
          <Link to="/donate/">
            <Button variant="outline-secondary" className="mb-4">Donate Now</Button>
          </Link>
        </Col>
        <Col md={4} className="order-1 order-md-2">
          <Img
            className="rounded mb-4"
            fluid={props.data.image5.childImageSharp.fluid}
            alt=""
          />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage

// export const cardImage = graphql`
//   fragment cardImage on File {
//     childImageSharp {
//       fluid(maxWidth: 500, quality: 100) {
//         ...GatsbyImageSharpFluid_noBase64
//       }
//     }
//   }
// `

export const query = graphql`
  query {
    jumbotron: file(relativePath: { eq: "homepage/website_banner_2019_01.jpg" }) {
      ...cardImage
    }
    # image1: file(relativePath: { eq: "homepage/ipad-screen.jpg" }) {
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
    image5: file(relativePath: { eq: "astronaut-girl.jpg" }) {
      ...rowImage
    }
  }
`
