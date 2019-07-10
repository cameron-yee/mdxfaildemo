import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from '../components/layout/layout'
import PageTitle from '../components/layout/page-title/page-title'
import Row from 'react-bootstrap/Row'

import '../global-scss/index.scss'

const LeadershipTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.mdx.code.body
    this.person = this.props.data.mdx.frontmatter
  }

  render() {
    return (
      <React.Fragment>
        <Layout location={this.props.location}>
          <Container>
            <PageTitle title={this.person.fullName} />
            <Row style={{marginBottom: '3rem'}}>
              {this.person.template === 'Image Left' &&
                <React.Fragment>
                  <Col xs={4}>
                    <img src={this.person.image} alt={this.person.alt} style={{width: '100%'}} />
                  </Col>
                  <Col xs={8}>
                    <MDXRenderer>{this.html}</MDXRenderer>
                  </Col>
                </React.Fragment>
              }
              {this.person.template === 'Image Right' &&
                <React.Fragment>
                  <Col xs={8}>
                    <MDXRenderer>{this.html}</MDXRenderer>
                  </Col>
                  <Col xs={4}>
                    <img src={this.person.image} alt={this.person.alt} style={{width: '100%'}} />
                  </Col>
                </React.Fragment>
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
    {locationProps => <LeadershipTemplate {...locationProps} {...props} />}
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
        seoCanonicalUrl,
        seoDescription,
        seoLang,
        additionalTags,
        fullName
        type,
        alt,
        image,
        template,
        title,
      }
    }
  }
`
