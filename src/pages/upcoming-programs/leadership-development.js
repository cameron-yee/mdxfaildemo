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

import './teacher-professional-learning.scss'

const LeadershipDevelopmentPage = class extends Component {
  constructor(props) {
    super(props)
    if(props.data.allMarkdownRemark) {
      this.programs = props.data.allMarkdownRemark.edges
    } else {
      this.programs = []
    }
  }

  render() {
    return (
        <React.Fragment>
          <SEO title="Leadership Development" />
          <Layout location={this.props.location}>
            <section className="section" style={{ padding: '.75rem 1.5rem' }}>
              <Container>
                <PageTitle title="Leadership Development" />
                <Row style={{ marginBottom: '2rem' }}>
                  <Col>
                    <p>
                      Are you a science education leader or provider of professional learning services who is looking to support teachers’ professional growth? Would you like a deeper understanding of how to help teachers enact the Next Generation Science Standards (NGSS)? Could you benefit from tools and processes that prepare teams of educators to evaluate, select, and implement instructional materials designed for next generation science?
                    </p>
                    <p>
                      BSCS Science Learning offers a wide range of professional learning opportunities for science education leaders and professional learning providers. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can work with us (hyperlink to partner page) in the future.
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
                          key={`tpl-${index}`}
                          className="tpl-card-col"
                        >
                          {/* <Card id={`resource-${index}`} className="tpl-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
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
                                className="tpl-excerpt"
                                style={{
                                  marginBottom: '2rem'
                                }}
                              >
                                {edge.node.excerpt}
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
    {locationProps => <LeadershipDevelopmentPage {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: { page: {eq: "upcoming-programs-leadership-development"}}}) {
    edges {
      node {
        html
        excerpt(pruneLength: 200)
        frontmatter {
          date(formatString: "MMMM DD, YYYY"),
          additionalTags,
          seoCanonicalUrl,
          seoDescription,
          seoLang,
          sidebarContacts,
          sidebarContactsText,
          sidebarContactsTitle,
          sidebarRegisterURL,
          sidebarRegisterText,
          sidebarRegisterTitle,
          title
          page
        }
      }
    }
  }
}
`
