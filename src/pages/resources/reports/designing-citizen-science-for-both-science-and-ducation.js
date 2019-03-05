import React from 'react'
import { Location } from '@reach/router'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'

import SEO from '../../../components/seo'
import Layout from '../../../components/layout/layout'
import '../../../global-scss/index.scss'
import PageTitle from '../../../components/layout/page-title/page-title'


const CitizenScienceReport = (props) => {
  return (
    <>
      <SEO title="Developing math/science teacher leadership: A consensus approach to evaluating program quality" />
      <Layout location={props.location}>
        <Container>
          <Row>
            <Col>
              <PageTitle />
            </Col>
          </Row>
        </Container>
        <Jumbotron
          style={{
            backgroundColor: "transparent",
            margin: '0',
            padding: '1.5rem'
          }}
        >
          <Container>
            <Row>
              <Col>
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 bd-highlight">
                    <h1 className="jumbotron-heading" style={{ color: '#212529' }}>
                      Math/Science Teacher Leadership Synthesis Project
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <section className="section" style={{ padding: '.75rem 1.5rem' }}>
          <Container>
            <Row>
              <Col>
                <h2 className="heading2">Developing math/science teacher leadership: A consensus approach to evaluating program quality</h2>
                <p style={{ marginBottom: "2rem" }}>
                  The <strong>Developing math/science teacher leadership: A consensus approach to evaluating program quality</strong> project is funded by the National Science Foundation (ECR 1534698). The purpose of this synthesis project is to build consensus on the key attributes of high-quality math/science teacher leadership development programs. High quality teacher leadership programs are those that prepare and support teachers to positively impact math/science teaching and learning beyond their own classrooms. The three major objectives of the project are to:
                </p>
                <Card className="bg-light" style={{ marginBottom: "3rem" }}>
                  <Card.Body>
                    <ol>
                      <li>Review research on math/science teacher leadership development and descriptions of existing programs;</li>
                      <li>Bring together a group of knowledgeable practitioners, researchers and policymakers to build consensus on key attributes of quality programs; and</li>
                      <li>Communicate the consensus attributes along with recommendations for implementation and future work to stakeholders.</li>
                    </ol>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 style={{ marginBottom: "1rem" }}>The reports from this project include:</h3>
              </Col>
            </Row>
            <Row style={{ marginBottom: "3rem" }}>
              <Col>
                <Card className="bg-light" style={{ marginBottom: "3rem" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Button
                          variant="secondary" 
                          href="https://media.bscs.org/mstl/bscs_2017-02_mstl_synthesis_report.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p><strong>A Synthesis of Math/Science Teacher Leadership Development Programs: Consensus Findings and Recommendations</strong></p>
                        <p>This document captures the synthesis of findings from the research and program review and symposium proceedings, and serves as the primary report from this project.</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Button
                          variant="secondary" 
                          href="https://media.bscs.org/mstl/bscs_2017-03_mstl_research-program_review.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p><strong>Math/Science Teacher Leadership Development: Findings from Research and Program Reviews</strong></p>
                        <p>This document describes the review of a selection of teacher leadership development research studies and programs, and serves as a supplemental resource to the synthesis report. The codebook for the review of programs and research is available <a href="https://media.bscs.org/mstl/teacher_leadership_review_codebook_january_2016.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary">here</a>.</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Button
                          variant="secondary" 
                          href="https://media.bscs.org/mstl/bscs_2017-04_mstl_symposium_proceedings.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p><strong>Developing Math/Science Teacher Leadership: Symposium Proceedings</strong></p>
                        <p>This document captures the discussions and findings from the symposium of experts in math and science teacher leadership development.</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default props => (
  <Location>
    {locationProps => <CitizenScienceReport {...locationProps} {...props} />}
  </Location>
)
