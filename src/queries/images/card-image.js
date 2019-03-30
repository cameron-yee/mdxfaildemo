import { graphql } from 'gatsby'

export const cardImage = graphql`
  fragment cardImage on File {
    childImageSharp {
      fluid(maxWidth: 500, quality: 100) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`