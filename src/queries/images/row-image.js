import { graphql } from 'gatsby' 

export const rowImage = graphql`
  fragment rowImage on File {
    childImageSharp {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`
