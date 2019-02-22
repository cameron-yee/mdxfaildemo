import React from 'react'
import { Location } from '@reach/router'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

const LeadershipDevelopmentPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Leadership Development" />
      <Container>
        <PageTitle title="Leadership Development" />
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <p>
              Are you a science education leader or provider of professional learning services who is looking to support teachers’ professional growth? Would you like a deeper understanding of how to help teachers enact the Next Generation Science Standards (NGSS)? Could you benefit from tools and processes that prepare teams of educators to evaluate, select, and implement instructional materials designed for next generation science?
            </p>
            <p>
              BSCS Science Learning offers a wide range of professional learning opportunities for science education leaders and professional learning providers. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can work with us (hyperlink to partner page) in the future.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <LeadershipDevelopmentPage {...locationProps} {...props} />}
  </Location>
)