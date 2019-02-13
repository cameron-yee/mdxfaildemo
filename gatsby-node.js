/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// exports.modifyWebpackConfig = ({ config, stage }) => {
//   switch (stage) {
//     case "build-html":
//       config.plugin('define', webpack.DefinePlugin, [ { "global.GENTLY": false } ]);

//         break;
//   }

//   return config;
// };

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const educatorResourceCenterPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/educator-resource-center-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMarkdownRemark(
            filter: {frontmatter: { page: {eq: "educator-resource-center"}}}
            sort: { order: ASC, fields: [frontmatter___slug] }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const slug = node.frontmatter.slug
          createPage({
            path: `/educator-resource-center/${slug}/`,
            component: markdownTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              slug,
            },
          })
        })
      })
    )
  })

  const upcomingTeacherProfessionalLearningPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/upcoming-teacher-professional-learning-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMarkdownRemark(
            filter: {frontmatter: { page: {eq: "upcoming-teacher-professional-learning"}}}
            sort: { order: ASC, fields: [frontmatter___slug] }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const slug = node.frontmatter.slug
          createPage({
            path: `/upcoming/teacher-professional-learning/${slug}/`,
            component: markdownTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              slug,
            },
          })
        })
      })
    )
  })

  const upcomingLeadershipDevelopmentPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/upcoming-leadership-development-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMarkdownRemark(
            filter: {frontmatter: { page: {eq: "upcoming-leadership-development"}}}
            sort: { order: ASC, fields: [frontmatter___slug] }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const slug = node.frontmatter.slug
          createPage({
            path: `/upcoming/leadership-development/${slug}/`,
            component: markdownTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              slug,
            },
          })
        })
      })
    )
  })

  const upcomingFieldTestOpportunitiesPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/upcoming-field-test-opportunities-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMarkdownRemark(
            filter: {frontmatter: { page: {eq: "upcoming-field-test-opportunities"}}}
            sort: { order: ASC, fields: [frontmatter___slug] }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const slug = node.frontmatter.slug
          createPage({
            path: `/upcoming/field-test-opportunities/${slug}/`,
            component: markdownTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              slug,
            },
          })
        })
      })
    )
  })

  const leadershipPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/leadership-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMarkdownRemark(
            filter: {frontmatter: { page: {eq: "leadership"}}}
            sort: { order: ASC, fields: [frontmatter___slug] }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const slug = node.frontmatter.slug
          createPage({
            path: `/leadership/${slug}/`,
            component: markdownTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              slug,
            },
          })
        })
      })
    )
  })

  return Promise.all([educatorResourceCenterPages, upcomingTeacherProfessionalLearningPages, upcomingLeadershipDevelopmentPages, upcomingFieldTestOpportunitiesPages, leadershipPages]);
  // return Promise.all([jsonPages, markdownPages])
}