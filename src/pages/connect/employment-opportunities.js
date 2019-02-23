import React from 'react'
// import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

const EmploymentOpportunitiesPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Employment Opportunities" />
      <Container>
        <PageTitle title="Employment Opportunities" />
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <p>
              Interested in joining our team at BSCS Science Learning? Browse employment opportunities posted below!
            </p>
            <p>
              BSCS offers a flexible and inclusive work environment, with a strong commitment to the 
            </p>
            <p>
              professional growth of all staff. Our office is in Colorado Springs, the #2 city in US News & World Report’s 2018 Best Places to Live. Located along the Front Range of the Rockies one hour south of Denver, Colorado Springs is known for a mild climate, a vibrant arts community, and year-round outdoor recreation.
              Not seeing a job opening that aligns with your qualifications? If you're a science educator or science education researcher interested in working with us, please send your resume and a brief bio to careers@bscs.org. We'll be happy to keep your information on file.
            </p>
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
