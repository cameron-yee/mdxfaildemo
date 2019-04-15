import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import './indexJumbotron.scss'


const IndexJumbotron = () => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "index/website_banner_2019_01.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          className="jumbotron indexJumbotron"
          fluid={imageData}
          style={{ borderRadius: '0' }}
        >
          <div className="jumbotron-inside">
            <div className="jumbotronContent">
              <h1 className="jumbotronHeading">BSCS MISSION:<br /> To Transform Science Teaching and Learning through Research-Driven Innovation.</h1>
            </div>
          </div>
        </BackgroundImage>
      )
    }}
  />
)

export default IndexJumbotron
