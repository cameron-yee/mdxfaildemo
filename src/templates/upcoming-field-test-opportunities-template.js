import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router' 

import Layout from '../components/layout/layout';

import '../global-scss/index.scss';

const TestOpportunitiesTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.resource = this.props.data.markdownRemark.frontmatter
  }

  render() {
    return (
      <Layout>
        <p>PLACEHOLDER</p>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <TestOpportunitiesTemplate {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        alt,
        image,
        slug,
        template,
        title
      }
    }
  }
`
