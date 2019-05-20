import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import { Location } from '@reach/router'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from '../components/seo'

import BSCSBreadcrumb from '../components/layout/breadcrumb/breadcrumb';
import Layout from '../components/layout/layout';
import SpecificContactForm from '../components/atoms/forms/specific-contact-form/specific-contact-form-button/specific-contact-form-button'
import GeneralContactFormButton from '../components/atoms/forms/general-contact-form/general-contact-form-button/general-contact-form-button'
import MSSRegistrationForm from '../components/atoms/forms/mss-registration-form/mss-registration-form-launch/mss-registration-form-launch'

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
    this.state = {
      launchGeneral: false,
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO title={this.resource.title} canonical={this.resource.seoCanonicalUrl} description={this.resource.seoDescription} lang={this.resource.seoLang} />
        <Layout location={this.props.location} launchGeneral={this.state.launchGeneral} closeGeneral={() => this.setState({launchGeneral: false})}>
          <Container>
            <BSCSBreadcrumb pathname={this.props.location.pathname} title={this.resource.title} />
              {this.resource.template === 'Image Right' &&
                <Row style={{ margin: '2rem 0' }}>
                  <Col md={7} className={`erc-jumbotron-title pl-4 pr-4 erc-jumbotron-image ${this.resource.type.toLowerCase().replace(/ /g, '-')}`}>
                    <h1>{this.resource.title}</h1>
                  </Col>
                  <Col md={5} className="erc-jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                </Row>
              }
              {this.resource.template === 'Image Left' &&
                <Row style={{ margin: '2rem 0' }} className="d-flex flex-wrap-reverse">
                  <Col md={5} className="erc-jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                  <Col md={7} className={`erc-jumbotron-title pl-4 pr-4 erc-jumbotron-image ${this.resource.type.toLowerCase().replace(/ /g, '-')}`}>
                    <h1>{this.resource.title}</h1>
                  </Col>
                </Row>
              }
              <Row style={{ marginBottom: '3rem' }}>
                <Col className="order-2 order-lg-1">
                  <MDXRenderer>{this.html}</MDXRenderer>
                  {/* <MDXRenderer>{this.html}</MDXRenderer> */}
                  {/* {this.resource.price !== 0.0 && this.resource.price !== null && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                  {this.resource.price === 0.0 && (<p><strong>Price: </strong>Free</p>)} */}
                  {/* {this.resource.courseId !== null && this.resource.courseId !== 0 && <CanvasRegister courseId={this.resource.courseId} />} */}
                </Col>
                {(this.resource.sidebarContacts || this.resource.sidebarContactsText || this.resource.sidebarContactsTitle || this.resource.sidebarURLs || this.resource.sidebarText) &&
                  <Col className="p-2 order-1 order-lg-2" lg={4} xl={3}>
                    {(this.resource.sidebarURLs || this.resource.sidebarText || this.resource.sidebarTitle) &&
                      <Card style={{marginBottom: '1rem'}}>
                        {this.resource.sidebarImage && this.resource.sidebarAlt &&
                          <Card.Img
                            variant="top"
                            src={this.resource.sidebarImage}
                            alt={this.resource.sidebarAlt}
                          />
                        }
                        <Card.Body className="justify-content-xs-center">
                          { this.resource.sidebarTitle &&
                            <Card.Title>{this.resource.sidebarTitle}</Card.Title>
                          }
                          { this.resource.sidebarText &&
                            <Card.Text style={{fontSize: '1rem'}}>
                              {this.resource.sidebarText}
                            </Card.Text>
                          }
                          {((this.resource.sidebarURLs && this.resource.sidebarURLs.length !== 0) || this.resource.sidebarText || this.resource.sidebarTitle) &&
                            this.resource.sidebarURLs.map((resource, index) => {
                              return (
                                <React.Fragment key={`erc-sidebarurl-${index}`} className="justify-content-center">
                                  { resource['resource']['text'] &&
                                  <Card.Text style={{fontSize: '1rem'}}>
                                    {resource['resource']['text']}
                                  </Card.Text>
                                  }
                                  <div className="d-flex justify-content-center">
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
                  {((this.resource.sidebarContacts && this.resource.sidebarContacts.length !== 0) || this.resource.sidebarContactsText || this.resource.sidebarContactsTitle) &&
                      <Card>
                        {this.resource.sidebarContactsImage && this.resource.sidebarContactsAlt &&
                          <Card.Img
                            variant="top"
                            src={this.resource.sidebarContactsImage}
                            alt={this.resource.sidebarContactsAlt}
                          />
                        }
                        <Card.Body>
                          { this.resource.sidebarContactsTitle &&
                            <Card.Title>{this.resource.sidebarContactsTitle}</Card.Title>
                          }
                          { this.resource.sidebarContactsText &&
                            <Card.Text style={{fontSize: '1rem'}}>
                              {this.resource.sidebarContactsText}
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
                                  <div className="d-flex justify-content-center">
                                    <div className="p-2">
                                      {(!contact['contact']['formType'] || contact['contact']['formType'] === 'Specific') &&
                                        <SpecificContactForm
                                          sendto={contact['contact']['person']}
                                          infoat={(contact['contact']['infoat']).toString()}
                                        >
                                          <Button
                                            size="sm"
                                            variant="outline-primary"
                                            className="mb-3"
                                          >
                                            Contact {contact['contact']['person']}
                                          </Button>
                                        </SpecificContactForm>
                                      }
                                      {contact['contact']['formType'] === 'Contact Us' &&
                                        <React.Fragment>
                                          <GeneralContactFormButton
                                            launch={() => this.setState({launchGeneral: true})}
                                            size="sm"
                                          >
                                            Contact Us
                                          </GeneralContactFormButton>
                                        </React.Fragment>
                                      }
                                      {contact['contact']['formType'] === 'MSS Registration' &&
                                        <MSSRegistrationForm>
                                          <Button variant="outline-primary" size="sm" className="mb-3">Register</Button>
                                        </MSSRegistrationForm>
                                      }
                                      {/* {contact['contact']['formType'] === 'MSS ViSTA' &&
                                        <ViSTARegistrationForm>
                                          <Button variant="outline-primary">Register</Button>
                                        </ViSTARegistrationForm>
                                      } */}
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
        # courseId,
        discipline,
        gradeLevel,
        image,
        # price,
        programLength,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarContacts {
          contact {
            formType,
            infoat,
            person,
            text
          }
        },
        sidebarContactsText,
        sidebarContactsTitle,
        sidebarContactsAlt,
        sidebarContactsImage,
        sidebarURLs {
          resource {
            buttonText,
            external,
            text,
            url
          }
        },
        sidebarAlt,
        sidebarImage,
        sidebarText,
        sidebarTitle,
        template,
        title,
        type
      }
    }
  }
`
