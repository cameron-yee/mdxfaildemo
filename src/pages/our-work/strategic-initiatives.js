import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import Img from 'gatsby-image'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

// eslint-disable-next-line
import rowImage from '../../queries/images/row-image'
import BSCSBreadcrumb from '../../components/layout/breadcrumb/breadcrumb';

const StrategicInitiativesPage = class extends Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO
          title="BSCS pursues strategic initiatives"
          description="BSCS is committed to long-term strategic initiatives that support the organization’s mission and vision."
          canonical="https://bscs.org/our-work/strategic-initiatives/"
        />
        <Container>
          {/* <BSCSBreadcrumb pathname="/our-work/strategic-initiatives/" /> */}
          <PageTitle title="Strategic Initiatives" />
          {/* <Row style={{ marginBottom: '2rem' }} noGutters>
            <Col md={6} className="d-flex justify-content-center align-items-center" style={{background: 'rgba(41,52,118,.9)', color: 'white'}}>
              <h1>Strategic Initiatives</h1>
            </Col>
            <Col md={6}>
              <Img
                className="h-100"
                fluid={this.props.data.threeGirlsInClassroom.childImageSharp.fluid}
                alt="NEED ALT"
                backgroundColor='rgb(41, 52, 118)'
              />
            </Col>
          </Row> */}
          <Row style={{ marginBottom: '2rem' }} className="d-block d-lg-none">
            <Col>
              <Img
                className="mb-3 rounded"
                fluid={this.props.data.threeGirlsInClassroom.childImageSharp.fluid}
                alt="NEED ALT"
                backgroundColor='rgb(41, 52, 118)'
              />
              <p>Following a strategic planning process in 2016, BSCS Science Learning is pursuing three long-term, strategic initiatives.</p>
              <p><strong>21st Century High School Biology.</strong> We are launching an effort to reconceive high school biology to meet the needs of our students and society throughout the 21st century. As we convene scientists, educators, curriculum writers, community members, and advisors, we are exploring foundational questions, beginning with this one: What knowledge and skills in the life sciences will all students need for their lives and careers in the next 10-20 years?</p>

              <p><strong>“VIP” Professional Learning for 21st Century Teaching.</strong> We are committed to bringing our transformative Video-based Inquiry-into-Practice (VIP) professional learning model to a broad audience of K-12 science teachers. Through more than a decade of research and development on our <Link to="/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis">STeLLA</Link> professional learning program, we have documented the power of VIP professional learning to change teacher practice and improve student outcomes. We are exploring implementation and business models for nationwide dissemination.</p>

              <p><strong>Equity & Social Justice.</strong> We are striving to break historical and institutional barriers to science for marginalized students and teachers. Our vision is that one day, all educators and learners will have access to a high quality science education, feel confident applying science effectively in their lives, and be prepared to understand and redress social and environmental injustices. We are exploring opportunities to pursue this initiative across our instructional materials development, teacher professional learning, leadership development, and educational research.</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: '2rem' }} className="d-none d-lg-block">
            <div style={{width: '100%'}}>
              <div style={{width: "40%", float: 'right'}}>
                <Img
                  className="ml-3 mb-3 rounded"
                  fluid={this.props.data.threeGirlsInClassroom.childImageSharp.fluid}
                  alt="NEED ALT"
                  backgroundColor='rgb(41, 52, 118)'
                />
              </div>
              <p>Following a strategic planning process in 2016, BSCS Science Learning is pursuing three long-term, strategic initiatives.</p>
              <p><strong>21st Century High School Biology.</strong> We are launching an effort to reconceive high school biology to meet the needs of our students and society throughout the 21st century. As we convene scientists, educators, curriculum writers, community members, and advisors, we are exploring foundational questions, beginning with this one: What knowledge and skills in the life sciences will all students need for their lives and careers in the next 10-20 years?</p>

              <p><strong>“VIP” Professional Learning for 21st Century Teaching.</strong> We are committed to bringing our transformative Video-based Inquiry-into-Practice (VIP) professional learning model to a broad audience of K-12 science teachers. Through more than a decade of research and development on our <Link to="/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis">STeLLA</Link> professional learning program, we have documented the power of VIP professional learning to change teacher practice and improve student outcomes. We are exploring implementation and business models for nationwide dissemination.</p>

              <p><strong>Equity & Social Justice.</strong> We are striving to break historical and institutional barriers to science for marginalized students and teachers. Our vision is that one day, all educators and learners will have access to a high quality science education, feel confident applying science effectively in their lives, and be prepared to understand and redress social and environmental injustices. We are exploring opportunities to pursue this initiative across our instructional materials development, teacher professional learning, leadership development, and educational research.</p>
            </div>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <StrategicInitiativesPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query {
    threeGirlsInClassroom: file(relativePath: { eq: "strategic-initiatives/three-girls-in-classroom.jpg" }) {
      ...rowImage
    }
  }
`