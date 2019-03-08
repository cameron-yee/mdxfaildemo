import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router' 

import Layout from '../components/layout/layout';
import PageTitle from '../components/layout/page-title/page-title'
import SEO from '../components/seo'
import SpecificContactForm from '../components/atoms/specific-contact-form/specific-contact-form'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import '../global-scss/index.scss';

const TeacherProfessionalLearningTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.program = this.props.data.markdownRemark.frontmatter
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
              replace={["upcoming-programs", "Upcoming Programs"]}
            />
            <Row className="d-flex flex-wrap-reverse" style={{marginBottom: '1rem'}}>
              {((this.program.sidebarContact && this.program.sidebarContactText) || (this.program.sidebarRegisterURL && this.program.sidebarRegisterText)) &&
                <Col className="p-2" md={9}>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                </Col>
              }
              {(!(this.program.sidebarContact && this.program.sidebarContactText) && !(this.program.sidebarRegisterURL && this.program.sidebarRegisterText)) &&
                <Col className="p-2">
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                </Col>
              }
              {((this.program.sidebarContact && this.program.sidebarContactText) || (this.program.sidebarRegisterURL && this.program.sidebarRegisterText)) &&
                <Col className="p-2" md={3}>
                  {this.program.sidebarRegisterURL && this.program.sidebarRegisterText &&
                    <Card style={{marginBottom: '1rem'}}>
                      <Card.Body>
                        { this.program.sidebarRegisterTitle &&
                          <Card.Title>Resource Information</Card.Title>
                        }
                        <Card.Text style={{fontSize: '1rem'}}>
                          {this.program.sidebarText}
                        </Card.Text>
                        <div class="d-flex justify-content-center">
                          <a className="p-2" href={this.program.sidebarRegisterURL} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline-secondary">Register</Button>
                          </a>
                        </div>
                      </Card.Body>
                    </Card>
                  }
                  {this.program.sidebarContact && this.program.sidebarContactText &&
                    <Card>
                      <Card.Body>
                        { this.program.sidebarContactTitle &&
                          <Card.Title>{this.program.sidebarContactTitle}</Card.Title>
                        }
                        <Card.Text style={{fontSize: '1rem'}}>
                          {this.program.sidebarContactText}
                        </Card.Text>
                        <div class="d-flex justify-content-center">
                          <div className="p-2">
                            <SpecificContactForm sendto={this.program.sidebarContact}>
                              <Button size="sm" variant="outline-primary">Contact {this.program.sidebarContact}</Button>
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
    {locationProps => <TeacherProfessionalLearningTemplate {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query($nodeId: String!) {
    markdownRemark(id: {eq: $nodeId}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        sidebarContact,
        sidebarContactText,
        sidebarContactTitle,
        sidebarRegisterURL,
        sidebarRegisterText,
        sidebarRegisterTitle,
        title
      }
    }
  }
`
