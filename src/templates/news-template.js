import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { Location } from '@reach/router'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from '../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'
import Row from 'react-bootstrap/Row'


import '../global-scss/index.scss'
// import './rd-programs-template.scss'

const NewsTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.mdx.code.body
    this.resource = this.props.data.mdx.frontmatter
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title={this.resource.title}
          canonical={this.resource.seoCanonicalUrl}
          description={this.resource.seoDescription}
          lang={this.resource.seoLang}
        />
        <Layout location={this.props.location}>
          <Container>
            <PageTitle
              title={this.resource.title}
              date={this.resource.date}
            />
            <Row style={{marginBottom: '1rem'}}>
              {(this.resource.sidebarURLs || this.resource.sidebarText) &&
                <Col className="order-2 order-lg-1">
                  {/* <MDXRenderer>{this.html}</MDXRenderer> */}
                  <MDXRenderer>{this.html}</MDXRenderer>
                </Col>
              }
              {(!this.resource.sidebarURLs && !this.resource.sidebarText) &&
                <Col className="order-2 order-lg-1">
                  <MDXRenderer>{this.html}</MDXRenderer>
                  {/* <MDXRenderer>{this.html}</MDXRenderer> */}
                </Col>
              }
              {(this.resource.sidebarURLs || this.resource.sidebarText || this.resource.sidebarTitle
                || this.resource.sidebarContacts || this.resource.sidebarContactsText) &&
                <Col className="p-2 order-1 order-lg-2" lg={4} xl={3}>
                  {(this.resource.sidebarURLs || this.resource.sidebarText || this.resource.sidebarTitle) &&
                    <Card style={{marginBottom: '1rem'}} className="mt-4 mt-md-0">
                      <Card.Body>
                        {this.resource.sidebarTitle &&
                          <Card.Title>{this.resource.sidebarTitle}</Card.Title>
                        }
                        {this.resource.sidebarText &&
                          <Card.Text style={{fontSize: '1rem'}}>
                            {this.resource.sidebarText}
                          </Card.Text>
                        }
                        { this.resource.sidebarURLs &&
                          this.resource.sidebarURLs.map((resource, index) => {
                            return (
                              <React.Fragment key={`news-sidebarurl-${index}`}>
                                { resource['resource']['text'] &&
                                  <Card.Text style={{fontSize: '1rem'}}>
                                    {resource['resource']['text']}
                                  </Card.Text>
                                }
                                <div className="d-flex justify-content-lg-center">
                                  { resource['resource']['external'] &&
                                    <a
                                      className="btn btn-outline-secondary"
                                      href={resource['resource']['url']}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        marginTop: '1rem',
                                        marginBottom: '1rem'
                                      }}
                                    >
                                      {resource['resource']['buttonText']}
                                      &nbsp;<sup><i style={{fontSize: '.65rem'}} className="fas fa-external-link-alt"></i></sup>
                                    </a>
                                  }
                                  { !resource['resource']['external'] &&
                                    <Link to={resource['resource']['url']}>
                                      <Button size="sm" variant="outline-secondary">{resource['resource']['buttonText']}</Button>
                                    </Link>
                                  }
                                </div>
                              </React.Fragment>
                            )
                          })
                        }
                      </Card.Body>
                    </Card>
                  }
                  {(this.resource.sidebarContacts || this.resource.sidebarContactsText || this.resource.sidebarContactsTitle) &&
                      <Card>
                        <Card.Body>
                          {this.resource.sidebarContactsTitle &&
                            <Card.Title>{this.resource.sidebarContactsTitle}</Card.Title>
                          }
                          {this.resource.sidebarContactsText &&
                            <Card.Text style={{fontSize: '1rem'}}>
                              {this.resource.sidebarContactsText}
                            </Card.Text>
                          }
                          {this.resource.sidebarContacts &&
                            this.resource.sidebarContacts.map(contact => {
                              return (
                                <div key={contact} className="d-flex justify-content-lg-center">
                                  <SpecificContactForm sendto={contact}>
                                    <Button size="sm" variant="outline-primary">Contact {contact}</Button>
                                  </SpecificContactForm>
                                </div>
                              )
                            })
                          }
                        </Card.Body>
                      </Card>
                  }
                </Col>
              }
            </Row>
          </Container>
        </Layout>
      </React.Fragment>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <NewsTemplate {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query($nodeId: String!) {
    mdx(id: {eq: $nodeId}) {
      code {
        body
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarText,
        sidebarTitle,
        sidebarURLs {
          resource {
            buttonText,
            external,
            text,
            url
          }
        },
        sidebarContacts,
        sidebarContactsText,
        sidebarContactsTitle,
        title,
      }
    }
  }
`
