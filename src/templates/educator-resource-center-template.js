import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from '../components/seo'

import BSCSBreadcrumb from '../components/layout/breadcrumb/breadcrumb';
import Layout from '../components/layout/layout';
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button' 

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import '../global-scss/index.scss';
import './educator-resource-center-template.scss'

const EducatorResourceCenterTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.mdx.code.body
    this.resource = this.props.data.mdx.frontmatter
  }

  render() {
    return (
      <React.Fragment>
        <SEO title={this.resource.title} canonical={this.resource.seoCanonicalUrl} description={this.resource.seoDescription} lang={this.resource.seoLang} />
        <Layout location={this.props.location}>
          <Container>
            <BSCSBreadcrumb pathname={this.props.location.pathname} title={this.resource.title} />
              {this.resource.template === 'Image Right' &&
                <Row style={{ marginBottom: '2rem' }}>
                  <Col md={7} className={`erc-jumbotron-title pl-4 pr-4 erc-jumbotron-image ${this.resource.type.toLowerCase().replace(/ /g, '-')}`}>
                    <h1>{this.resource.title}</h1>
                  </Col>
                  <Col md={5} className="erc-jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                </Row>
              }
              {this.resource.template === 'Image Left' &&
                <Row style={{ marginBottom: '2rem' }}>
                  <Col md={5} className="erc-jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                  <Col md={7} className={`erc-jumbotron-title pl-4 pr-4 erc-jumbotron-image ${this.resource.type.toLowerCase().replace(/ /g, '-')}`}>
                    <h1>{this.resource.title}</h1>
                  </Col>
                </Row>
              }
              <Row style={{ marginBottom: '3rem' }}>
                <Col>
                  <MDXRenderer>{this.html}</MDXRenderer>
                  {/* <MDXRenderer>{this.html}</MDXRenderer> */}
                  {/* {this.resource.price !== 0.0 && this.resource.price !== null && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                  {this.resource.price === 0.0 && (<p><strong>Price: </strong>Free</p>)} */}
                  {/* {this.resource.courseId !== null && this.resource.courseId !== 0 && <CanvasRegister courseId={this.resource.courseId} />} */}
                </Col>
                {(this.resource.sidebarContacts || this.resource.sidebarContactsText || this.resource.sidebarContactsTitle || this.resource.sidebarURL || this.resource.sidebarText) &&
                  <Col className="p-2" md={3}>
                    {(this.resource.sidebarURL || this.resource.sidebarText || this.resource.sidebarTitle) &&
                      <Card style={{marginBottom: '1rem'}}>
                        <Card.Body>
                          { this.resource.sidebarTitle &&
                            <Card.Title>{this.resource.sidebarTitle}</Card.Title>
                          }
                          { this.resource.sidebarText &&
                            <Card.Text style={{fontSize: '1rem'}}>
                              {this.resource.sidebarText}
                            </Card.Text>
                          }
                          { this.resource.sidebarURL &&
                            <div className="d-flex justify-content-center">
                              { this.resource.sidebarURLExternal &&
                              <a
                                class="p-2 btn btn-outline-secondary"
                                href={this.resource.sidebarURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style="margin-top: 1rem; margin-bottom: 1rem;"
                              >
                                {this.resource.sidebarButtonText}&nbsp;<sup><i style="font-size: .65rem;" class="fas fa-external-link-alt"></i></sup>
                              </a>
                              }
                              { !this.resource.sidebarURLExternal &&
                                <Link to={this.resource.sidebarURL}>
                                  <Button size="sm" variant="outline-secondary">{this.resource.sidebarButtonText}</Button>
                                </Link>
                              }
                            </div>
                          }
                        </Card.Body>
                      </Card>
                    }
                    {(this.resource.sidebarContacts || this.resource.sidebarContactsText || this.resource.sidebarContactsTitle) &&
                      <Card>
                        <Card.Body>
                          { this.resource.sidebarContactsTitle &&
                            <Card.Title>{this.resource.sidebarContactsTitle}</Card.Title>
                          }
                          { this.resource.sidebarContactsText &&
                            <Card.Text style={{fontSize: '1rem'}}>
                              {this.resource.sidebarContactsText}
                            </Card.Text>
                          }
                          { this.resource.sidebarContacts && 
                            this.resource.sidebarContacts.map(contact => {
                              return(
                                <div key={contact} className="d-flex justify-content-center">
                                  <div className="p-2 w-100">
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
    {locationProps => <EducatorResourceCenterTemplate {...locationProps} {...props} />}
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
        courseId,
        discipline,
        gradeLevel,
        image,
        # price,
        programLength,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarContacts,
        sidebarContactsText,
        sidebarContactsTitle,
        sidebarButtonText,
        sidebarURL,
        sidebarURLExternal,
        sidebarText,
        sidebarTitle,
        template,
        title,
        type
      }
    }
  }
`
