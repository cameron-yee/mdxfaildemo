import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router'
import SEO from '../components/seo'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../components/layout/layout';
import PageTitle from '../components/layout/page-title/page-title';
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
        <SEO title={this.resource.title} canonical={this.resource.seoCanonicalUrl} description={this.resource.seoDescription} lang={this.resource.seoLang} />
        <Layout location={this.props.location}>
          <Container>
            <PageTitle title={this.resource.title} />
            <Row>
              <Col>
                <div className="markdown-div" dangerouslySetInnerHTML={{ __html: this.html }}></div>
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
        title,
      }
    }
  }
`
