import React, { Component } from 'react'
import { graphql } from 'gatsby'
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

const RDProgramsTemplate = class extends Component {
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
              replace={["rd-programs", "R&D Programs"]}
            />
            <Row style={{marginBottom: '1rem'}}>
              {(this.resource.sidebarURL || this.resource.sidebarText) &&
                <Col>
                  <MDXRenderer>{this.html}</MDXRenderer>
                </Col>
              }
              {(!this.resource.sidebarURL && !this.resource.sidebarText) &&
                <Col>
                  <MDXRenderer>{this.html}</MDXRenderer>
                </Col>
              }
              {(this.resource.sidebarURL || this.resource.sidebarText || this.resource.sidebarTitle
                || this.resource.sidebarContacts || this.resource.sidebarContactsText) &&
                <Col md={4}>
                  {(this.resource.sidebarURL || this.resource.sidebarText || this.resource.sidebarTitle) &&
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
                        {this.resource.sidebarURL &&
                          <div class="d-flex justify-content-center">
                            {this.resource.sidebarButtonText && 
                              <a className="p-2" href={this.resource.sidebarURL} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline-secondary">{this.resource.sidebarButtonText}</Button>
                              </a>
                            }
                            {!this.resource.sidebarButtonText && 
                              <a className="p-2" href={this.resource.sidebarURL} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline-secondary">Access Resource Here</Button>
                              </a>
                            }
                          </div>
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
                                <div key={contact} class="d-flex justify-content-center">
                                  <div className="p-2">
                                    <SpecificContactForm sendto={contact}>
                                      <Button size="sm" variant="outline-primary">Contact {contact}</Button>
                                    </SpecificContactForm>
                                  </div>
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
    {locationProps => <RDProgramsTemplate {...locationProps} {...props} />}
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
        alt,
        image,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarURL,
        sidebarText,
        sidebarTitle,
        sidebarButtonText,
        sidebarContacts,
        sidebarContactsText,
        sidebarContactsTitle,
        title,
      }
    }
  }
`
