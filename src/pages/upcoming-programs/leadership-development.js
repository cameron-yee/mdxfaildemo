import React from 'react'
import { Location } from '@reach/router'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import BSCSBreadcrumb from '../../components/layout/breadcrumb/breadcrumb'
import Layout from '../../components/layout/layout'
import SEO from '../../components/seo'

const LeadershipDevelopmentPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Leadership Development" />
      <BSCSBreadcrumb pathname={props.location.pathname} className="fluid" />
      <Jumbotron className="jumbotron jumbotron-ld">
        <div className="jumbotron-inside">
          <div className="jumbotronContent dark center">
          <Container>
            <Row>
              <Col>
                <h1 className="jumbotronHeading">Leadership Development</h1>
              </Col>
            </Row>
          </Container>
          </div>
        </div>
      </Jumbotron>
      <Container>
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