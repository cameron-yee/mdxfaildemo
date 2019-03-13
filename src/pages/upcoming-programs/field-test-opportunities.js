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

const FieldTestOpportunitiesPage = class extends Component {
  constructor(props) {
    super(props)
    this.programs = props.data.allMarkdownRemark.edges
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
                      BSCS Science Learning offers a wide range of field-test opportunities for teachers, principals, and district leaders to consider. An important part of our process is to elicit teacher and student feedback on the usability and feasibility of our materials and programs. See what’s currently available below. If we do not presently offer a relevant opportunity for you, please feel free to reach out about how you can work with us (hyperlink to partner page) in the future.
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="section">
              <Container>
                <Row>
                  {
                    this.programs.map((edge, index) => {
                      // let data_filter = JSON.parse(JSON.stringify(edge.node.frontmatter))
                      // data_filter['excerpt'] = edge.node.excerpt
                      return(
                        <Col md={4} key={`tpl-${index}`} className="tpl-card-col">
                          {/* <Card id={`resource-${index}`} className="tpl-card" data-filter={JSON.stringify(data_filter)} data-type={edge.node.frontmatter.type}> */}
                          <Card id={`program-${index}`} className="tpl-card">
                            <Card.Body>
                              <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                              <Card.Text className="tpl-excerpt">{edge.node.excerpt}</Card.Text>
                              <Link to={`/upcoming-programs/field-test-opportunities/${edge.node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`} className="p-2 tpl-read-more"><Button variant="outline-secondary">More Information</Button></Link>
                            </Card.Body>
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
  allMarkdownRemark(filter: {frontmatter: { page: {eq: "upcoming-programs-field-test-opportunities"}}}) {
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