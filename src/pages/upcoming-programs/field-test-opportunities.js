import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { Location } from '@reach/router'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import Layout from '../../components/layout/layout'
import PageTitle from '../../components/layout/page-title/page-title'
import SEO from '../../components/seo'

import './upcoming-programs.scss'

const FieldTestOpportunitiesPage = class extends Component {
  constructor(props) {
    super(props)
    if(props.data.allMdx) {
      this.programs = props.data.allMdx.edges
    } else {
      this.programs = []
    }
  }

  render() {
    return (
        <React.Fragment>
          <SEO title="Field Test Opportunities" />
          <Layout location={this.props.location}>
            <section className="section" style={{ padding: '.75rem 1.5rem' }}>
              <Container>
                <PageTitle title="Field Test Opportunities" />
                <Row style={{ marginBottom: '2rem' }}>
                  <Col>
                    <p>
                      Are you looking for new K-12 science curriculum materials? Are you interested in newly-developed teacher professional learning programs? Would your school or district be willing to test these materials and approaches in classroom settings?
                    </p>
                    <p>
                      BSCS Science Learning offers a wide range of field-test opportunities for teachers, principals, and district leaders to consider. An important part of our process is to elicit teacher and student feedback on the usability and feasibility of our materials and programs. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can <Link to="/connect/work-with-us/">work with us</Link> in the future.
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="section">
              <Container>
                <Row style={{ marginBottom: '3rem' }}>
                  { this.programs &&
                    this.programs.map((edge, index) => {
                      // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                      // data_filter['excerpt'] = edge.node.excerpt
                      return(
                        <Col
                          lg={4}
                          key={`up-${index}`}
                          className="up-card-col"
                        >
                          {/* <Card id={`resource-${index}`} className="up-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                          <Card id={`program-${index}`} className="h-100">
                            <Card.Body>
                              <Card.Title
                                style={{
                                  marginBottom: '1.5rem'
                                }}
                              >
                                {edge.node.frontmatter.title}
                              </Card.Title>
                              <Card.Text
                                className="up-excerpt"
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
                                  background: 'white',
                                  borderTop: 'none',
                                  marginBottom: '.5rem'
                                }}
                              >
                                <div className="d-flex">
                                  <div className="ml-auto align-self-end">
                                    <Link
                                      to={`/upcoming-programs/teacher-professional-learning/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                                    >
                                      <Button variant="outline-secondary">
                                        More Information
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
        </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <FieldTestOpportunitiesPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
{
  allMdx(
    filter: {frontmatter: { page: {eq: "upcoming-programs-field-test-opportunities"}}},
    sort: {
      fields: [frontmatter___sortOrder, frontmatter___date]
    }
  ) {
    edges {
      node {
        excerpt(pruneLength: 200)
        frontmatter {
          date(formatString: "MMMM DD, YYYY"),
          additionalTags,
          cardDescription,
          seoCanonicalUrl,
          seoDescription,
          seoLang,
          sidebarContacts,
          sidebarContactsText,
          sidebarContactsTitle,
          sidebarRegisterURL,
          sidebarRegisterText,
          sidebarRegisterTitle,
          sortOrder,
          title,
          page
        }
      }
    }
  }
}
`
