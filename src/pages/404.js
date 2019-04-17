import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import PageTitle from '../components/layout/page-title/page-title'

import fourOhFourImage from '../images/404/f0ccce9d-711f-42e2-a861-9265c67f7811_rw_1200.gif'


const NotFoundPage = (props) => (
  <Layout location={props.location}>
    <SEO title="404: Not found" />
    <Container>
      <PageTitle title="Page Not Found" />
      <Row className="justify-content-center justify-content-md-end" style={{ marginBottom: '4rem' }}>
        <Col className="order-2 order-md-1">
          <h2>Oh deer, we had an accident.</h2>
          <p className="lead">The page you were looking for was moved or does not exist.</p>
          <p className="lead">Let's get you back on track:</p>
          <Link to="/">
            <Button
              variant="outline-secondary"
              style={{
                width: '100%',
                fontSize: 'calc(1.305rem + .66vw)',
              }}
            >
              Home
            </Button>
          </Link>
        </Col>
        <Col xs={10} md={6} className="order-1 order-md-2">
          <img
            src={fourOhFourImage}
            className="img-fluid rounded pl-md-4 mb-4 mb-md-0"
            alt="Injured deer on crutches hobbling away from the road."
          />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default props => (
  <Location>
    {locationProps => <NotFoundPage {...locationProps} {...props} />}
  </Location>
)
