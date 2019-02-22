import React from 'react'
import { Location } from '@reach/router'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

const TeacherProfessionalLearningPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Teacher Professional Learning" />
      <Container>
        <PageTitle title="Teacher Professional Learning" />
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <p>
              Are you a teacher who is looking to enhance your science content knowledge or instructional practices? Would you like a deeper understanding of the Next Generation Science Standards (NGSS)? Have you heard about our signature STeLLA (hyperlink to STeLLA page) approach and want to learn how to use high-leverage science teaching strategies through video-based lesson analysis?
            </p>
            <p>
              BSCS Science Learning offers a wide range of professional learning opportunities for teachers. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can work with us (hyperlink to partner page) in the future.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <TeacherProfessionalLearningPage {...locationProps} {...props} />}
  </Location>
)