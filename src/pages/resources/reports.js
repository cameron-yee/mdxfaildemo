import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
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
  constructor(props) {
    super(props)
    this.reports = this.props.data.allMdx.edges
  }

  render() {
    return (
      <>
        <SEO
          title="BSCS reports for science educators and researchers"
          description="BSCS releases reports about instructional materials development, teacher professional learning, leadership development, and research."
          canonical="https://bscs.org/resources/reports"
        />
        <Layout location={this.props.location}>
          <section className="section" style={{ padding: '.75rem 1.5rem' }}>
            <Container>
              <PageTitle title="Reports" />
              <Row style={{ marginBottom: '2rem' }}>
                <Col>
                  <p>BSCS Science Learning regularly releases reports with insights pertaining to instructional materials development, teacher professional learning, leadership development, and research. See below for a selection of reports.</p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
              <Container>
                <Row style={{ marginBottom: '3rem' }}>
                  {
                    this.reports.map((edge, index) => {
                      return(
                        <Col
                          lg={4}
                          className="rrc-card-col"
                          key={`report-${index}`}
                        >
                          <Card
                            className="h-100"
                            style={{
                              border: '1px solid rgba(41, 52, 118, .9)',
                              backgroundColor: 'rgba(41, 52, 118, .1)',
                              // border: '1px solid rgba(94, 60, 124, .9)',
                              // backgroundColor: 'rgba(94, 60, 124, .1)',
                            }}
                          >
                            <Card.Body>
                              <Card.Title
                                style={{
                                  marginBottom: '1.5rem',
                                  color: 'rgba(41, 52, 118, .9)'
                                  // color: 'rgba(94, 60, 124, 1)'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <p
                                style={{
                                  fontFamily: '"Lora", "Adobe Blank"',
                                  fontWeight: '400',
                                  fontStyle: 'italic',
                                  fontSize: '1rem'
                                }}
                              >
                                <em>{edge.node.frontmatter.reportDate}</em>
                              </p>
                              <Card.Text
                                style={{
                                  marginBottom: '2rem'
                                }}
                              >
                                {edge.node.frontmatter.cardDescription}
                                {!edge.node.frontmatter.cardDescription && edge.node.excerpt}
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer
                              style={{
                                background: 'transparent',
                                // backgroundColor: 'rgba(41, 52, 118, .1)',
                                borderTop: 'none',
                                marginBottom: '.5rem'
                              }}
                            >
                              <div className="d-flex">
                                <div className="ml-auto align-self-end">
                                  <Link
                                    to={`/resources/reports/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                  >
                                    <Button variant="outline-secondary" className="purple">
                                      Read More
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>
                      )
                    })
                  }
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

export const reportsQuery = graphql`
  query reportsQuery {
    allMdx(
      filter: {frontmatter: { page: {eq: "reports"}}}
      sort: {
        fields: [frontmatter___sortOrder, frontmatter___title],
      }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            additionalTags,
            cardDescription,
            date,
            sortOrder,
            reportDate,
            title,
            page
          }
        }
      }
    }
  }
`
