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

import tlsynLogo from '../../../images/project-logos/tlsyn_logo.svg'
import edcLogo from '../../../images/project-logos/edc-logo.svg'
import kstfLogo from '../../../images/project-logos/logo-kstf.svg'
import hriLogo from '../../../images/project-logos/hri-logo.svg'
import nsfLogo from '../../../images/project-logos/nsf-logo.svg'


const MstlReport = (props) => {
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
                    <img
                      src={tlsynLogo}
                      alt="Teacher Leadership Synthesis logo"
                      style={{
                        width: "120px",
                        minWidth: "90px"
                      }}
                      className="img-fluid"
                    />
                  </div>
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
                          variant="outline-secondary" 
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
                          variant="outline-secondary" 
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
                          variant="outline-secondary" 
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
        <section>
          <Container fluid>
            <Row>
              <Container>
                <Row>
                  <Col>
                    <p style={{ fontSize: '1.8rem', marginBottom: '3rem' }}>In partnership with</p>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={4}>
                    <a href="http://www.edc.org" target="_blank" rel="noopener noreferrer">
                      <img
                        src={edcLogo}
                        alt="Eucation Development Center logo"
                        style={{
                          display: 'block',
                          height: '75px',
                          margin: '0 auto'
                        }}
                      />
                    </a>
                  </Col>
                  <Col xs={12} md={4}>
                    <a href="https://knowlesteachers.org" target="_blank" rel="noopener noreferrer">
                      <img
                        src={kstfLogo}
                        alt="Knowles Teacher Initiative logo"
                        style={{
                          display: 'block',
                          height: '65px',
                          margin: '.15rem auto 0 auto'
                        }}
                      />
                    </a>
                  </Col>
                </Row>
                <hr style={{ margin: '2.5rem 0 4.5rem' }} />
                <Row>
                  <Col>
                    <p style={{ fontSize: "1.8rem", marginBottom: '1.5rem' }}>Evaluated by</p>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col>
                    <a href="http://www.horizon-research.com" target="_blank" rel="noopener noreferrer">
                      <img
                        src={hriLogo}
                        alt="Horizon Research, Inc. logo"
                        style={{
                          display: 'block',
                          height: '112.5px',
                          margin: '0 auto'
                        }}
                      />
                    </a>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Container>
                <Row>
                  <Col>
                    <hr style={{ margin: '2.5rem 0 4.5rem' }} />
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Container>
                <Row>
                  <div class="d-flex justify-content-center">
                    <div class="p-2 bd-highlight">
                      <a href="https://www.nsf.gov" target="_blank" rel="noopener noreferrer">
                        <img
                          src={nsfLogo}
                          alt="National Science Foundation logo"
                          style={{
                            height: '85px'
                          }}
                        />
                      </a>
                    </div>
                    <div class="p-2 bd-highlight" style={{ marginBottom: '3rem' }}>
                      <p>
                        This material is based upon work supported by the <a href="https://www.nsf.gov" target="_blank" rel="noopener noreferrer" className="text-secondary">National Science Foundation</a> under Grant No. ECR 1534698. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.
                      </p>
                    </div>
                  </div>
                </Row>
              </Container>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  )
}

export default props => (
  <Location>
    {locationProps => <MstlReport {...locationProps} {...props} />}
  </Location>
)
