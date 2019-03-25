import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import { Location } from '@reach/router'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import SEO from '../../components/seo'
import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import BSCSTransformingScienceEducationModel from '../../images/bscs-transforming-science-education-model.svg'

import './what-we-do.scss'

// eslint-disable-next-line
import rowImage from '../../queries/images/row-image'


const WhatWeDoPage = (props) => {
  console.log(props.data.image1)
  return (
    <Layout location={props.location}>
      <SEO title="What We Do" />
      <Container>
        <PageTitle title="What We Do" />
        <Row style={{ marginBottom: '1rem' }}>
          <Col>
            <p>
            At BSCS Science Learning, we are on a mission to transform science education nationwide. This means creating impact that is both systemic and sustainable. And we accomplish this goal through <strong>four areas</strong> of work.
            </p>
          </Col>
        </Row>
        <Row className="d-flex flex-wrap-reverse" noGutters={true} >
          <Col md={6} className="p-4 what-we-do-text-section colored">
            <h3>Instructional Materials Development</h3>

            <p>For teachers to be successful in the classroom, they must have access to high quality instructional materials. We leverage research insights and current industry standards to produce reliable curricula, as we’ve done since our earliest days.</p>

            <p>Our process begins with experimentation across small-scale settings. And based on our learnings from initial market tests and evaluations, we develop materials for broad dissemination.</p>

            <p>In today’s world, we primarily focus on developing NGSS-based, online, and highly interactive materials that meet the needs of increasingly diverse student populations.</p>
          </Col>
          <Col md={6} className="what-we-do-image-wrapper">
            <Img
              className="h-100"
              fluid={props.data.image1.childImageSharp.fluid}
              alt="male student holding an iPad that says 'Focus Question: What are the building blocks of living things?'"
              backgroundColor='rgb(41, 52, 118)'
            />
          </Col>
        </Row>
        <Row className="d-flex flex-wrap-reverse" noGutters={true} >
          <Col>
            <Img
              className="h-100"
              fluid={props.data.image2.childImageSharp.fluid}
              alt="teacher with long hair and denim jacket pointing at something on a desk with three female fifth-grade students"
              backgroundColor='rgb(41, 52, 118)'
            />
          </Col>
          <Col md={6} className="p-4 what-we-do-text-section" style={{ background: 'rgba(0, 0, 0, .1)' }}>
            <h3>Teacher Professional Learning</h3>

            <p>A thriving science education system depends on high quality professional learning opportunities for teachers. We are recognized for our signature approach to professional development, resulting from our 15-year line of research on how teachers and students learn science.</p>

            <p>Our approach to professional learning is proving to be powerful in both teacher preparation and continuing education programs; in district-wide programs and in programs enrolling individual teachers; in programs for elementary, middle, and high school teachers; and in programs facilitated in person and online.</p>
          </Col>
        </Row>
        <Row className="d-flex flex-wrap-reverse" noGutters={true} >
          <Col md={6} className="p-4 what-we-do-text-section colored">
            <h3>Leadership Development</h3>

            <p>Support from the state level to the classroom level is needed to transform science education. That’s why we are committed to system-wide leadership development. We create and deliver research-driven programs that prepare schools, districts, and states to implement stronger systems and policies for science teaching and learning. </p>

            <p>Our programs provide education leaders with <strong>high quality professional learning</strong> opportunities and support in selecting and implementing <strong>high quality instructional materials</strong>. As industry research indicates, both components are essential for effective science instruction.</p>
          </Col>
          <Col md={6} className="what-we-do-image-wrapper">
            <Img
              className="h-100"
              fluid={props.data.image3.childImageSharp.fluid}
              alt="young girl with long brown hair, white sweatshirt, and safety goggles on her forehead looking at a vial in her left hand as she puts rocks inside of it"
              backgroundColor='rgb(41, 52, 118)'
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: '2rem' }} className="d-flex flex-wrap-reverse" noGutters={true} >
          <Col md={6} className="p-2 what-we-do-image-wrapper">
            <Img
              className="h-100"
              fluid={props.data.image4.childImageSharp.fluid}
              alt="young boy with glasses and blue hoodie scrunching his face while looking at a vial in his right hand"
              backgroundColor='rgb(41, 52, 118)'
            />
          </Col>
          <Col md={6} className="p-4 p-4 what-we-do-text-section" style={{ background: 'rgba(0, 0, 0, .1)' }}>
            <h3>Research</h3>

            <p>Our work begins and ends with research. We conduct a variety of studies for a deeper understanding of how teachers and students learn science. Our evaluations span from studies of our own interventions across schools and districts to big-picture analyses across the greater science education landscape.</p>

            <p>This ongoing research allows us to explore the effectiveness of our instructional materials, professional learning, and leadership programs while informing our future innovation. Ultimately, we deliver enhanced products and services in more robust, research-informed settings.</p>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2rem' }}>
          <Col xs={12} className="d-flex justify-content-center">
            <h3 className="p-2">Our Model for Transforming Science Education</h3>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <div className="bscs-transforming-science-education-model-wrapper">
              <img src={BSCSTransformingScienceEducationModel} alt="BSCS’s four areas of work: Leadership Development, Teacher Professional Learning, Instructional Materials, and Research. Leadership Development is important for the state, district, and school levels, while Teacher Professional Learning and Instructional Materials are important for the classroom level. Research and innovation are involved in each area of work." />
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2rem' }}>
          <Col xs={12} className="d-flex justify-content-center">
            <h3 className="p-2">Our Work in Action</h3>
          </Col>
          <Col style={{padding: '0.5rem'}}>
            <Link to="/our-work/rd-programs" style={{width: '100%'}}>
              <Button variant="outline-secondary" style={{width: '100%', minHeight: '6rem', height: '100%'}}>
                <h3>R&amp;D Programs</h3>
                <p>Sample of Current Projects</p>
              </Button>
            </Link>
          </Col>
          <Col style={{padding: '0.5rem'}}>
            <Link to="/resources/educator-resource-center" style={{width: '100%'}}>
              <Button variant="outline-secondary" style={{width: '100%', minHeight: '6rem', height: '100%'}}>
                <h3>Educator Resource Center</h3>
                <p>Available Programs &amp; Products</p>
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><strong>Interested in partnering with us or hiring us to support your science education advancement efforts? Let’s explore how we can <Link to="/connect/work-with-us">work together</Link>.</strong></p>
          </Col>
        </Row>
      </Container>
    </Layout>

  )
}

export default props => (
  <Location>
    {locationProps => <WhatWeDoPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query {
    image1: file(relativePath: { eq: "homepage/male-student.jpg" }) {
      ...rowImage
    }
    image2: file(relativePath: { eq: "homepage/teacher-and-students.jpg" }) {
      ...rowImage
    }
    image3: file(relativePath: { eq: "homepage/young-girl.jpg" }) {
      ...rowImage
    }
    image4: file(relativePath: { eq: "homepage/young-boy.jpg" }) {
      ...rowImage
    }
  }
`
