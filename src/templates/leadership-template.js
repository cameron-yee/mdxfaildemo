import React from 'react';
import { graphql } from 'gatsby';
// import styled from 'styled-components';
// import Hero from '../components/canvas/hero'

import Layout from '../components/layout/layout';
// import PageTitle from '../components/ui/typography/page-title/page-title';
// import Container from '../components/layout/container/container';
// import Breadcrumb from '../components/ui/breadcrumb/breadcrumb';
// import Divider from '../components/ui/divider/divider';
// import './educator-resource-center-template.scss';

import '../global-scss/index.scss';


// const MarkdownDiv = styled.div`
//   p {
//     margin: 12px 0;
//   }

//   h1 {
//     font-size: 2rem;
//   }

//   img {
//     border-radius: 5px;
//     display: block;
//     max-width: 500px;
//     margin: 0 auto;
//   }
// `

// const PersonImage = styled.img`
//   display: block;
//   width: 100%;
// `

export default ({ data }) => {
  const html = data.markdownRemark.html
  const resource = data.markdownRemark.frontmatter;
  const paths = [["/leadership", "Leadership"], [`/${resource.slug}`, `${resource.fullName}`, "is-active"]];

  return (
    <Layout>
      <p>PLACEHOLDER</p>
    </Layout>
  )
}

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
