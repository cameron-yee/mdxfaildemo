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
                  <p>Lorem ipsum dolor amet edison bulb portland thundercats cloud bread, snackwave literally live-edge synth selvage wolf hammock street art. Tofu semiotics normcore, polaroid DIY banh mi ugh keytar microdosing plaid roof party disrupt food truck hoodie.</p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
              <Container>
                <Row>
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
                          <em>August, 2017</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          Lorem ipsum dolor amet edison bulb portland thundercats cloud bread, snackwave literally live-edge synth selvage wolf hammock street art.
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
                              to={`/resources/reports/designing-citizen-science-for-both-science-and-ducation`}
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
                          <em>August, 2017</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          Lorem ipsum dolor amet edison bulb portland thundercats cloud bread, snackwave literally live-edge synth selvage wolf hammock street art.
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
                          <em>August, 2017</em>
                        </p>
                        <Card.Text
                          style={{
                            marginBottom: '2rem'
                          }}
                        >
                          Lorem ipsum dolor amet edison bulb portland thundercats cloud bread, snackwave literally live-edge synth selvage wolf hammock street art.
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
