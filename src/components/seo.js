import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import atip57 from '../images/favicon/apple-touch-icon-57x57.png'
import atip60 from '../images/favicon/apple-touch-icon-60x60.png'
import atip72 from '../images/favicon/apple-touch-icon-72x72.png'
import atip76 from '../images/favicon/apple-touch-icon-76x76.png'
import atip114 from '../images/favicon/apple-touch-icon-114x114.png'
import atip120 from '../images/favicon/apple-touch-icon-120x120.png'
import atip144 from '../images/favicon/apple-touch-icon-144x144.png'
import atip152 from '../images/favicon/apple-touch-icon-152x152.png'

import favicon16 from '../images/favicon/favicon-16x16.png'
import favicon32 from '../images/favicon/favicon-32x32.png'
import favicon96 from '../images/favicon/favicon-96x96.png'
import favicon128 from '../images/favicon/favicon-128x128.png'
import favicon196 from '../images/favicon/favicon-196x196.png'

import mstile70 from '../images/favicon/mstile-70x70.png'
import mstile144 from '../images/favicon/mstile-144x144.png'
import mstile150 from '../images/favicon/mstile-70x70.png'
import mstile310x150 from '../images/favicon/mstile-70x70.png'
import mstile310 from '../images/favicon/mstile-70x70.png'

import 'animate.css'


function SEO({ description, lang, link, meta, keywords, title, canonical, jsonLd }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description

        const jsonLdString =
          jsonLd
          ||
          `
            "@context": "http://schema.org",
            "@type": "EducationalOrganization",
            "name": "BSCS Science Learning",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Colorado Springs",
              "addressRegion": "CO",
              "postalCode": "80918",
              "streetAddress": "5415 Mark Dabling Blvd."
            },
            "url": "https://www.bscs.org/",
            "logo": "https://www.bscs.org/static/img/bscs_logo.svg",
            "description": "",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1 (719) 531-5550",
              "contactType": "customer service",
              "areaServed": "US",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/BSCSORG/",
              "https://twitter.com/BSCSorg/",
              "https://www.linkedin.com/company/bscs/"
            ]
          `
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            // titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            titleTemplate={`%s`}
            link={[
              {
                rel: `canonical`,
                href: canonical
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`57x57`, 
                href: atip57
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`60x60`, 
                href: atip60
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`72x72`, 
                href: atip72
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`76x76`, 
                href: atip76
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`114x114`, 
                href: atip114
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`120x120`, 
                href: atip120
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`144x144`, 
                href: atip144
              },
              {
                rel: `apple-touch-icon-precomposed`,
                sizes:`152x152`, 
                href: atip152
              },
              {
                rel: `icon`,
                type: `image/png`,
                sizes:`16x16`, 
                href: favicon16
              },
              {
                rel: `icon`,
                type: `image/png`,
                sizes:`32x32`, 
                href: favicon32
              },
              {
                rel: `icon`,
                type: `image/png`,
                sizes:`96x96`, 
                href: favicon96
              },
              {
                rel: `icon`,
                type: `image/png`,
                sizes:`128x128`, 
                href: favicon128
              },
              {
                rel: `icon`,
                type: `image/png`,
                sizes:`196x196`, 
                href: favicon196
              }
            ]}
            meta={[
              {
                charset: `utf-8`
              },
              {
                name: `viewport`,
                content: `width=device-width, initial-scale=1, shrink-to-fit=no`
              },
              {
                'http-equiv': `x-ua-compatible`, content: `ie=edge`
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:url`,
                content: `https://www.bscs.org/`
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:site_name`,
                content: `Wolf River Diagnostic Learning Center`
              },
              {
                property: `og:title`,
                content: `Online Diagnostic Ultrasound Training`
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: `https://s3-us-west-2.amazonaws.com/wrdlc-static/static/img/61298390_l.jpg`
              },
              {
                property: `og:image:alt`,
                content: `Fetal ultrasound on computer monitor with instructor and student defocused in background.`
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              // {
              //   name: `twitter:creator`,
              //   content: data.site.siteMetadata.author,
              // },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `msapplication-TileColor`, content: `#FFFFFF`
              },
              {
                name: `msapplication-TileImage`, content: mstile144
              },
              {
                name: `msapplication-square70x70logo`, content: mstile70
              },
              {
                name: `msapplication-square150x150logo`, content: mstile150
              },
              {
                name: `msapplication-wide310x150logo`, content: mstile310x150
              },
              {
                name: `msapplication-square310x310logo`, content: mstile310
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            {/* inline script elements */}
            <script type="application/ld+json">{`${jsonLdString}`}</script>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
