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


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: '/xsa',
    toPath: '/about/leadership',
    isPermanent: true
  })

  const leadershipPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/leadership-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "leadership"}}}
          ) {
            edges {
              node {
                id
                frontmatter {
                  fullName
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        } else if (!result.data.allMdx) {
          reject("No data")
        } else {
          // Create pages for each markdown file.
          result.data.allMdx.edges.forEach(({ node }) => {
            const slug = node.frontmatter.fullName.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const nodeId = node.id
            createPage({
              path: `/about/leadership/${slug}/`,
              component: markdownTemplate,
              // In your blog post template's graphql query, you can use path
              // as a GraphQL variable to query for data from the markdown file.
              context: {
                nodeId,
              },
            })
          })
        }
      })
    )
  })

  return Promise.all([
    leadershipPages
  ]);

}