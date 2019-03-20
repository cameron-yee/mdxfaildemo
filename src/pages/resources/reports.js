import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'
import SEO from '../../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../../components/layout/layout'
import Row from 'react-bootstrap/Row'

import '../../global-scss/index.scss'
import './reports.scss'

import PageTitle from '../../components/layout/page-title/page-title'


const Reports = class extends Component {
  render() {
    return (
      <>
        <SEO title="Reports" keywords={[`gatsby`, `application`, `react`]} />
        <Layout location={this.props.location}>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <PageTitle title="Reports" />
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <p>BSCS Science Learning regularly releases reports with insights pertaining to instructional materials development, teacher professional learning, leadership development, and research. See below for a sample.</p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
              <Container>
                <Row style={{ marginBottom: '3rem' }}>
                  <Col 
                    lg={4}
                    className="rrc-card-col"
                  >
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title
                          style={{
                            marginBottom: '1.5rem'
                          }}
                        >
                          Designing Citizen Science for Both Science and Education: A Workshop Report
                        </Card.Title>
                        <p
                          style={{
                            fontFamily: '"Lora", "Adobe Blank"',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            fontSize: '1rem'
                          }}
                        >
                          <em>January 2018</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          This report presents guidelines and strategies for designing citizen science projects with scientific and educational benefits.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer
                        style={{
                          background: 'white',
                          borderTop: 'none',
                          marginBottom: '.5rem'
                        }}
                      >
                        <div className="d-flex">
                          <div className="ml-auto align-self-end">
                            <Link 
                              to={`/resources/reports/designing-citizen-science-for-both-science-and-education`}
                            >
                              <Button variant="outline-secondary">
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col 
                    lg={4}
                    className="rrc-card-col"
                  >
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title
                          style={{
                            marginBottom: '1.5rem'
                          }}
                        >
                          Guidelines for Assessing Instructional Materials that Exemplify the NGSS
                        </Card.Title>
                        <p
                          style={{
                            fontFamily: '"Lora", "Adobe Blank"',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            fontSize: '1rem'
                          }}
                        >
                          <em>May 2017</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          This report includes four categories of criteria for evaluating student and teacher materials while also providing a blueprint for creating tools and processes to conduct valid assessments.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer
                        style={{
                          background: 'white',
                          borderTop: 'none',
                          marginBottom: '.5rem'
                        }}
                      >
                        <div className="d-flex">
                          <div className="ml-auto align-self-end">
                            <Link 
                              to={`/resources/reports/guidelines-for-assessing-instructional-materials-that-exemplify-the-ngss`}
                            >
                              <Button variant="outline-secondary">
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col 
                    lg={4}
                    className="rrc-card-col"
                  >
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title
                          style={{
                            marginBottom: '1.5rem'
                          }}
                        >
                          Math/Science Teacher Leadership Synthesis Project
                        </Card.Title>
                        <p
                          style={{
                            fontFamily: '"Lora", "Adobe Blank"',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            fontSize: '1rem'
                          }}
                        >
                          <em>February 2017</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          Three reports have resulted from a synthesis project intended to build consensus on the key attributes of high-quality math/science teacher leadership development programs.
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer
                        style={{
                          background: 'white',
                          borderTop: 'none',
                          marginBottom: '.5rem'
                        }}
                      >
                        <div className="d-flex">
                          <div className="ml-auto align-self-end">
                            <Link 
                              to={`/resources/reports/math-science-teacher-leadership-synthesis-project`}
                            >
                              <Button variant="outline-secondary">
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Container>
          </section>
        </Layout>
      </>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <Reports {...locationProps} {...props} />}
  </Location>
)
