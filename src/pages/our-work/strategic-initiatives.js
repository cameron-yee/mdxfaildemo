import React from 'react'
import { Location } from '@reach/router'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

const StrategicInitiativesPage = (props) => {
  return (
    <Layout location={props.location}>
      <SEO title="Strategic Initiatives" />
      <Container>
        <PageTitle title="Strategic Initiatives" />
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <p>Following a strategic planning process in 2016, BSCS Science Learning is pursuing three long-term, strategic initiatives.</p>
            <p><strong>21st Century High School Biology.</strong> We are launching an effort to reconceive high school biology to meet the needs of our students and society throughout the 21st century. As we convene scientists, educators, curriculum writers, community members, and advisors, we are exploring foundational questions, beginning with this one: What knowledge and skills in the life sciences will all students need for their lives and careers in the next 10-20 years?</p>
            
            <p><strong>“VIP” Professional Learning for 21st Century Teaching.</strong> We are committed to bringing our transformative Video-based Inquiry-into-Practice (VIP) professional learning model to a broad audience of K-12 science teachers. Through more than a decade of research and development on our STeLLA (hyperlink) professional learning program, we have documented the power of VIP professional learning to change teacher practice and improve student outcomes. We are exploring implementation and business models for nationwide dissemination.</p>

            <p><strong>Equity & Social Justice.</strong> We are striving to break historical and institutional barriers to science for marginalized students and teachers. Our vision is that one day, all educators and learners will have access to a high quality science education, feel confident applying science effectively in their lives, and be prepared to understand and redress social and environmental injustices. We are exploring opportunities to pursue this initiative across our instructional materials development, teacher professional learning, leadership development, and educational research.</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default props => (
  <Location>
    {locationProps => <StrategicInitiativesPage {...locationProps} {...props} />}
  </Location>
)