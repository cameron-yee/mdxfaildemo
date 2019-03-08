import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router'
import SEO from '../components/seo'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../components/layout/layout';
import PageTitle from '../components/layout/page-title/page-title';
import SpecificContactForm from '../components/atoms/specific-contact-form/specific-contact-form'
import Row from 'react-bootstrap/Row'

import '../global-scss/index.scss';
// import './rd-programs-template.scss'

const RDProgramsTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.resource = this.props.data.markdownRemark.frontmatter
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
              {(this.resource.sidebarUrl || this.resource.sidebarText) &&
                <Col md={9}>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                </Col>
              }
              {(!this.resource.sidebarUrl && !this.resource.sidebarText) &&
                <Col>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                </Col>
              }
              {(this.resource.sidebarUrl || this.resource.sidebarText
                || this.resource.sidebarContact || this.resource.sidebarContactText) &&
                <Col md={3}>
                  {(this.resource.sidebarUrl || this.resource.sidebarText) &&
                    <Card style={{marginBottom: '1rem'}}>
                      <Card.Body>
                        {/* <Card.Title>Resource Information</Card.Title> */}
                        <Card.Text style={{fontSize: '1rem'}}>
                          {this.resource.sidebarText}
                        </Card.Text>
                        <div class="d-flex justify-content-center">
                          <a className="p-2" href={this.resource.sidebarUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline-secondary">Access Resource Here</Button>
                          </a>
                        </div>
                      </Card.Body>
                    </Card>
                  }
                  {this.resource.sidebarContact && this.resource.sidebarContactText &&
                      <Card>
                        <Card.Body>
                          {/* <Card.Title>Resource Information</Card.Title> */}
                          <Card.Text style={{fontSize: '1rem'}}>
                            {this.resource.sidebarContactText}
                          </Card.Text>
                          <div class="d-flex justify-content-center">
                            <div className="p-2">
                              <SpecificContactForm sendto={this.resource.sidebarContact}>
                                <Button size="sm" variant="outline-primary">Contact {this.resource.sidebarContact}</Button>
                              </SpecificContactForm>
                            </div>
                          </div>
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
    markdownRemark(id: {eq: $nodeId}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        alt,
        image,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarUrl,
        sidebarText,
        sidebarButtonText,
        sidebarContact,
        sidebarContactText,
        title,
      }
    }
  }
`
