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


const GuidelinesReport = (props) => {
  return (
    <>
      <SEO title="Guidelines for Assessing Instructional Materials that Exemplify the NGSS" />
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
                      Guidelines for Assessing Instructional Materials that Exemplify the NGSS
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <section className="section" style={{ padding: '.75rem 1.5rem' }}>
          <Container>
            <Row style={{ marginBottom: '2rem' }}>
              <Col>
                {/* <h2 className="heading2">Guidelines for Assessing Instructional Materials that Exemplify the NGSS</h2> */}
                <p style={{ marginBottom: "2rem" }}>
                  The Guidelines Summit took place May 15-19, 2015, at Cheyenne Mountain Resort in Colorado Springs, Colorado. The project was funded by a grant from the National Science Foundation in response to the National Research Council publication, Monitoring Progress to Successful K-12 STEM Education. This document identifies 14 indicators as large-scale national measures of the health of STEM education in U.S. schools. In particular, the Guidelines Summit responded to Indicator 4, which calls for guidelines for developing measures that assess how well widely-used science instructional materials embody the Next Generation Science Standards (NGSS).
                </p>
                <h3>The goals of the Summit were to</h3>
                <Card className="bg-light" style={{ marginBottom: "3rem" }}>
                  <Card.Body>
                    <ol>
                      <li>engage leading science educators in building consensus on the criteria to include in a process and tools that evaluate the extent to which science instructional materials embody the NGSS, and</li>
                      <li>produce a set of Guidelines based on this consensus for the development of the process and tools.</li>
                    </ol>
                  </Card.Body>
                </Card>
                <p>Eighteen science educators from across the country participated with BSCS staff in discussions at the Summit. Additional attendees included two facilitators and a project evaluator.</p>
                <p>The Guidelines for the Evaluation of Instructional Materials in Science found here can be downloaded free of charge by all who are interested.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 style={{ marginBottom: "1rem" }}>Download the Guidelines</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="bg-light" style={{ marginBottom: "3rem" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Button
                          variant="outline-secondary" 
                          href="https://media.bscs.org/ngal/bscs_ngal_2017.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p style={{ fontSize: '1.8rem' }}>Guidelines for the Evaluation of Instructional Materials in Science</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 style={{ marginBottom: "1rem" }}>Download the Executive Summary</h3>
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
                          href="https://media.bscs.org/ngal/executive_summary_ngal.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p style={{ fontSize: '1.8rem' }}>Executive Summary NGAL</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Button
                          variant="outline-secondary" 
                          href="https://media.bscs.org/ngal/guidelines_onepager.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p style={{ fontSize: '1.8rem' }}>Guidelines OnePager</p>
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
    {locationProps => <GuidelinesReport {...locationProps} {...props} />}
  </Location>
)
