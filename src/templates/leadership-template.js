import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Location } from '@reach/router'

import Layout from '../components/layout/layout';

import '../global-scss/index.scss';

const LeadershipTemplate = class extends Component {
  constructor(props) {
    super(props)
    this.html = this.props.data.markdownRemark.html
    this.resource = this.props.data.markdownRemark.frontmatter;
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <p>PLACEHOLDER</p>
      </Layout>
    )
  }
}

export default props => (
  <Location>
    {locationProps => <LeadershipTemplate {...locationProps} {...props} />}
  </Location>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY"),
        additionalTags,
        alt,
        image,
        slug,
        template,
        fullName,
      }
    }
  }
`
