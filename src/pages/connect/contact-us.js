import React from 'react'
// import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'

const ContactUsPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Contact Us" />
      <Container>
        <PageTitle title="Contact Us" />
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <ContactUsPage {...locationProps} {...props} />}
  </Location>
)
