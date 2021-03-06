module.exports = {
  siteMetadata: {
    title: `BSCS Science Learning – a 501(c)(3) organization`,
    description: `BSCS Science Learning is an independent nonprofit dedicated to transforming science education across the US through research-driven innovation.`,
    author: `BSCS Science Learning`,
    siteUrl: `https://bscs.org`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    //Markdown
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon/favicon-196x196.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-76760966-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        // anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "bscs.org",
      },
    },
    // `gatsby-transformer-remark`,
    `gatsby-background-image`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md']
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://bscs.org',
        sitemap: 'https://bscs.org/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
      allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      mergeSecurityHeaders: true, // boolean to turn off the default security headers
      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      mergeCachingHeaders: true, // boolean to turn off the default caching headers
      transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
    },
  },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
}
