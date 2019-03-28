import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/layout/layout';
import PageTitle from '../components/layout/page-title/page-title'
import SEO from '../components/seo'
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import '../global-scss/index.scss';

const UpcomingProgramsTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.mdx.code.body
    this.program = this.props.data.mdx.frontmatter
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title={this.program.title}
          canonical={this.program.seoCanonicalUrl}
          description={this.program.seoDescription}
          lang={this.program.seoLang}
        />
        <Layout location={this.props.location}>
          <Container>
            <PageTitle
              title={this.program.title}
              // replace={["upcoming-programs", "Upcoming Programs"]}
            />
            <Row className="d-flex flex-wrap-reverse" style={{marginBottom: '1rem'}}>
              {((this.program.sidebarContacts && this.program.sidebarContactsText) || (this.program.sidebarURLs && this.program.sidebarText)) &&
                <Col className="p-2" md={9}>
                  <MDXRenderer>{this.html}</MDXRenderer>
                </Col>
              }
              {(!(this.program.sidebarContacts && this.program.sidebarContactsText) && !(this.program.sidebarURLs && this.program.sidebarText)) &&
                <Col className="p-2">
                  <MDXRenderer>{this.html}</MDXRenderer>
                </Col>
              }
              {(this.program.sidebarContacts || this.program.sidebarContactsText || this.program.sidebarContactsTitle || this.program.sidebarURLs || this.program.sidebarText) &&
                <Col className="p-2" md={3}>
                  {(this.program.sidebarURLs || this.program.sidebarText || this.program.sidebarTitle) &&
                    <Card style={{marginBottom: '1rem'}}>
                      <Card.Body>
                        { this.program.sidebarTitle &&
                          <Card.Title>{this.program.sidebarTitle}</Card.Title>
                        }
                        { this.program.sidebarText &&
                          <Card.Text style={{fontSize: '1rem'}}>
                            {this.program.sidebarText}
                          </Card.Text>
                        }
                        { this.resource.sidebarURLs &&
                          this.resource.sidebarURLs.map((resource, index) => {
                            return (
                              <React.Fragment key={`up-sidebarurl-${index}`}>
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
                  {(this.program.sidebarContacts || this.program.sidebarContactsText || this.program.sidebarContactsTitle) &&
                    <Card>
                      <Card.Body>
                        { this.program.sidebarContactsTitle &&
                          <Card.Title>{this.program.sidebarContactsTitle}</Card.Title>
                        }
                        { this.program.sidebarContactsText &&
                          <Card.Text style={{fontSize: '1rem'}}>
                            {this.program.sidebarContactsText}
                          </Card.Text>
                        }
                        {this.resource.sidebarContacts &&
                          this.resource.sidebarContacts.map((contact, index) => {
                            return (
                              <React.Fragment key={`${contact['contact']['person']}-${index}`}>
                                {contact['contact']['text'] &&
                                  <Card.Text style={{fontSize: '1rem'}}>
                                    {contact['contact']['text']}
                                  </Card.Text>
                                }
                                <div class="d-flex justify-content-center">
                                  <div className="p-2">
                                    <SpecificContactForm
                                      sendto={contact['contact']['person']}
                                      infoat={contact['contact']['infoat']}
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline-primary"
                                      >
                                        Contact {contact['contact']['person']}
                                      </Button>
                                    </SpecificContactForm>
                                  </div>
                                </div>
                              </React.Fragment>
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
    {locationProps => <UpcomingProgramsTemplate {...locationProps} {...props} />}
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
        sidebarContacts {
          contact {
            infoat,
            person,
            text
          }
        },
        sidebarContactsText,
        sidebarContactsTitle,
        sidebarURLs {
          resource {
            buttonText,
            external,
            text,
            url
          }
        },
        sidebarText,
        sidebarTitle,
        title
        type
      }
    }
  }
`



