import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

import BSCSTransformingScienceEducationModel from '../../images/bscs-transforming-science-education-model.svg'

import './what-we-do.scss'

const WhatWeDoPage = class extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
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
          <Row>
            <Col md={6} className="what-we-do-text-section colored">
              <h3>Instructional Materials Development</h3>

              <p>For teachers to be successful in the classroom, they must have access to high quality instructional materials. We leverage research insights and current industry standards to produce reliable curricula, as we’ve done since our earliest days.</p>

              <p>Our process begins with experimentation across small-scale settings. And based on our learnings from initial market tests and evaluations, we develop materials for broad dissemination.</p>

              <p>In today’s world, we primarily focus on developing NGSS-based, online, and highly interactive materials that meet the needs of increasingly diverse student populations.</p>
            </Col>
            <Col md={6} className="what-we-do-image-wrapper">
              <div className="what-we-do-image imd-image"></div>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap-reverse" >
            <Col md={6} className="p-2 what-we-do-image-wrapper">
              <div className="what-we-do-image tpl-image"></div>
            </Col>
            <Col md={6} className="p-4 what-we-do-text-section" style={{ background: 'rgba(0, 0, 0, .1)' }}>
              <h3>Teacher Professional Learning</h3>

              <p>A thriving science education system depends on high quality professional learning opportunities for teachers. We are recognized for our signature approach to professional development, resulting from our 15-year line of research on how teachers and students learn science.</p>

              <p>Our approach to professional learning is proving to be powerful in both teacher preparation and continuing education programs; in district-wide programs and in programs enrolling individual teachers; in programs for elementary, middle, and high school teachers; and in programs facilitated in person and online.</p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="what-we-do-text-section colored">
              <h3>Leadership Development</h3>

              <p>Support from the state level to the classroom level is needed to transform science education. That’s why we are committed to system-wide leadership development. We create and deliver research-driven programs that prepare schools, districts, and states to implement stronger systems and policies for science teaching and learning. </p>

              <p>Our programs provide education leaders with <strong>high quality professional learning</strong> opportunities and support in selecting and implementing <strong>high quality instructional materials</strong>. As industry research indicates, both components are essential for effective science instruction.</p>
            </Col>
            <Col md={6} className="what-we-do-image-wrapper">
              <div className="what-we-do-image ld-image"></div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '2rem' }} className="d-flex flex-wrap-reverse">
            <Col md={6} className="p-2 what-we-do-image-wrapper">
              <div className="what-we-do-image research-image"></div>
            </Col>
            <Col md={6} className="p-4 what-we-do-text-section" style={{ background: 'rgba(0, 0, 0, .1)' }}>
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
            {/* <Col className="d-flex">
              <Link to="/resources/educator-resource-center" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '100%', margin: '1rem'}}><h3>Educator Resource Center</h3></Button></Link>
              <Link to="/our-work/rd-programs" style={{width: '100%'}}><Button variant="outline-secondary" style={{width: '100%', minHeight: '100%', margin: '1rem'}}><h3>R&amp;D Programs</h3></Button></Link>
            </Col> */}
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
              {/* <p style={{color: 'black', fontWeight: '500'}}>Interested in partnering with us or hiring us to support your science education advancement efforts? Let’s explore how we can <Link to="/connect/work-with-us">work together</Link>.</p> */}
            </Col>
          </Row>
        </Container>
      </Layout>

    )
  }
}

export default props => (
  <Location>
    {locationProps => <WhatWeDoPage {...locationProps} {...props} />}
  </Location>
)
