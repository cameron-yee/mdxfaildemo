import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router'
import SEO from '../components/seo'

import Layout from '../components/layout/layout';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BSCSBreadcrumb from '../components/layout/breadcrumb/breadcrumb';

import '../global-scss/index.scss';
import './educator-resource-center-template.scss'

const EducatorResourceCenterTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.resource = this.props.data.markdownRemark.frontmatter
  }

  render() {
    return (
      <React.Fragment>
        <SEO title={this.resource.title} canonical={this.resource.seoCanonicalUrl} description={this.resource.seoDescription} lang={this.resource.seoLang} />
        <Layout location={this.props.location}>
          <Container>
            <BSCSBreadcrumb pathname={this.props.location.pathname} title={this.resource.title} />
              {this.resource.template === 'Image Right' &&
                <Row>
                  <Col md={7} className="erc-jumbotron-title">
                    <h1>{this.resource.title}</h1>
                  </Col>
                  <Col md={5} className="jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                </Row>
              }
              {this.resource.template === 'Image Left' &&
                <Row>
                  <Col md={5} className="jumbotron-image" style={{backgroundImage: `url(${this.resource.image})`}} />
                  <Col md={7} className="erc-jumbotron-title">
                    <h1>{this.resource.title}</h1>
                  </Col>
                </Row>
              }
              <Row>
                <Col>
                  <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
                  {this.resource.price !== 0.0 && this.resource.price !== null && (<p><strong>Price: </strong>{`$${this.resource.price}`}</p>)}
                  {this.resource.price === 0.0 && (<p><strong>Price: </strong>Free</p>)}
                  {/* {this.resource.courseId !== null && this.resource.courseId !== 0 && <CanvasRegister courseId={this.resource.courseId} />} */}
                </Col>
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
    markdownRemark(id: {eq: $nodeId}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        alt,
        courseId,
        discipline,
        gradeLevel,
        image,
        price,
        programLength,
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        template,
        title,
        type
      }
    }
  }
`
