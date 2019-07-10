import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Layout from '../components/layout/layout'

import '../global-scss/index.scss'

const IndexPage = (props) => (
  <Layout location={props.location}>
    <Container>
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
          <Link to="/about/leadership">Leadership Page</Link>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default props => (
  <Location>
    {locationProps => <IndexPage {...locationProps} {...props} />}
  </Location>
)