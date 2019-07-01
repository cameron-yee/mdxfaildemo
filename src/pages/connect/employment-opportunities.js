import React from 'react'
// import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SpecificContactForm from '../../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'

const EmploymentOpportunitiesPage = (props) => {
  return (
    <Layout
     location={props.location}>
      <SEO title="Employment Opportunities" />
      <Container>
        <PageTitle
          title="Join the BSCS team"
          description="Browse current employment opportunities with BSCS Science Learning and enjoy a flexible and inclusive work environment."
          canonical="https://bscs.org/connect/employment-opportunities/"
        />
        <Row style={{ marginBottom: '1rem' }} className="d-flex flex-wrap-reverse">
          <Col md={8} lg={9}>
            <p>
              Interested in joining our team at BSCS Science Learning? Browse employment opportunities posted below!
            </p>
            <p>
              BSCS offers a flexible and inclusive work environment, with a strong commitment to the professional growth of all staff. Our office is in Colorado Springs, the #1 city in US News &amp; World Report's 2019 Most Desirable Places to Live. Located along the Front Range of the Rockies one hour south of Denver, Colorado Springs is known for a mild climate, a vibrant arts community, and year-round outdoor recreation.
            </p>
            <p>
              Not seeing a job opening that aligns with your qualifications? If you're a science educator or science education researcher interested in working with us, please contact BSCS Careers.
            </p>
          </Col>
          <Col md={4} lg={3} className="justify-content-center">
            <Card className="mb-4">
              <Card.Body className="d-flex justify-content-center">
                <Card.Title></Card.Title>
                <Card.Text style={{fontSize: '1rem'}}>
                </Card.Text>
                <SpecificContactForm sendto="BSCS Careers">
                  <Button variant="outline-primary">Contact BSCS Careers</Button>
                </SpecificContactForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row style={{ marginBottom: '2rem', marginTop: '2rem' }} className="d-flex flex-wrap">
          <Col xs={12}>
            <p><strong>Position Title:</strong> Project Coordinator</p>
            <p><strong>Reports To:</strong> Project Leads, Division Directors</p>
            <p><strong>Date:</strong> 6/27/19</p>
            <p><strong>FLSA Status:</strong> Non-Exempt</p>
            <p>BSCS Science Learning has an immediate opening for a full-time Project Coordinator with expertise in administrative, logistical, and communications support. We seek a creative, motivated individual who shares our mission of improving science teaching and learning through research-driven innovation.</p>
            <a href="https://media.bscs.org/bscsmw/employment-opportunities/project_coordinator_june_2019.pdf" target="_blank" rel="noopener noreferrer">Click here to read the full job description and how to apply.</a>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          {/* <Col xs={12}>
            <p><strong>Position Title:</strong> Senior Science Educator and Division Director, Professional Learning</p>
            <p><strong>Reports To:</strong> Associate Director for Strategic Partnerships and Professional Learning</p>
            <p><strong>Date:</strong> 4/19/19</p>
            <p><strong>FLSA Status:</strong> Exempt</p>
            <p>BSCS Science Learning has an opening for a Senior Science Educator and Division Director (Professional Learning) with expertise in professional learning and leadership development. We seek a creative, motivated individual who shares our mission of improving science teaching and learning through research-driven innovation.</p>
            <a href="https://media.bscs.org/bscsmw/employment-opportunities/senior_science_educator_and_division_director_professional_learning.pdf" target="_blank" rel="noopener noreferrer">Click here to read the full job description and how to apply.</a>
          </Col> */}
          {/* <Col xs={12}>
            <p><strong>Position Title:</strong> Science Educator, Instructional Materials Development</p>
            <p><strong>Reports To:</strong> Division Director, Instructional Materials Development</p>
            <p><strong>Date:</strong> 4/19/19</p>
            <p><strong>FLSA Status:</strong> Exempt</p>
            <p>BSCS Science Learning (BSCS) has an immediate opening for a Science Educator with expertise in instructional materials development. We seek a creative, motivated individual who shares our mission of improving science teaching and learning through research-driven innovation.</p>
            <a href="https://media.bscs.org/bscsmw/employment-opportunities/science_educator_instructional_materials_development.pdf" target="_blank" rel="noopener noreferrer">Click here to read the full job description and how to apply.</a>
          </Col> */}
        </Row>
        <hr />
        <Row style={{ marginBottom: '2rem', marginTop: '2rem' }} className="d-flex flex-wrap">
          <Col xs={12}>
            <p>BSCS Science Learning is committed to recruitment of a diverse staff. We are an equal opportunity employer. All applicants will receive consideration for employment without regard to age, race, sex, color, religion, national origin, disability (physical and/or mental), sexual orientation, gender identity or expression, veteran status, military obligations, marital status, pregnancy, genetic information, or any status protected by federal, state, or local law.</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <EmploymentOpportunitiesPage {...locationProps} {...props} />}
  </Location>
)
