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
      <SEO title="Designing Citizen Science for Both Science and Education: A Workshop Report" />
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
                      Designing Citizen Science for Both Science and Education: A Workshop Report
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
                <p style={{ marginBottom: "2rem" }}>
                  In January 2017, BSCS convened a group of scientists, educators, and technologists with significant experience in citizen science to consider the challenges of designing citizen science projects to achieve ambitious objectives in the areas of both science and education. The workshop was based on the following premise:
                </p>
                <p>
                  <em>
                    Achieving both scientific and educational benefits in a citizen science initiative requires not just a commitment to both, but the expertise and resources to design for both.
                  </em>
                </p>
                <p>
                  The goals of the workshop were to
                </p>
                <ol>
                  <li>gather the insights of experienced citizen science project organizers about how to design citizen science projects and platforms for both scientific and educational outcomes and to</li>
                  <li>organize these insights into a set of recommendations for software developers on how to design online citizen science platforms for both scientific and educational outcomes.</li>
                </ol>
                <p>Refer to our <a href="https://media.bscs.org/tech-report/2018-1/bscs_citscireport_release.pdf" target="_blank" rel="noopener noreferrer">press release</a> for more information.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 style={{ marginBottom: "2rem" }}>The insights generated at this workshop have been compiled in the following workshop report:</h3>
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
                          href="https://media.bscs.org/tech-report/2018-1/2018-1.pdf"
                          target="_blank"
                          style={{ marginTop: '.45rem' }}
                        >
                          <i className="fas fa-cloud-download-alt"></i>
                        </Button>
                      </Col>
                      <Col>
                        <p><strong>Designing Citizen Science for Both Science and Education: A Workshop Report</strong></p>
                        <p>Edelson, D. C., Kirn, S. L., &amp; Workshop Participants. (2018). <em>Designing citizen science for both science and education: A workshop report</em>. (Technical Report No. 2018-01). Colorado Springs, CO: BSCS Science Learning.</p>
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
