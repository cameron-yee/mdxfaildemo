import { graphql } from 'gatsby' 

export const rowImage = graphql`
  fragment rowImage on File {
    childImageSharp {
      fluid(maxWidth: 600, quality: 100) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`
