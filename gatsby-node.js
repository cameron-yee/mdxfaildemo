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
    fromPath: '/fivetools',
    toPath: '/resources/educator-resource-center/five-tools-and-processes-for-translating-the-ngss',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/fivetools/',
    toPath: '/resources/educator-resource-center/five-tools-and-processes-for-translating-the-ngss',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/humane-genetics',
    toPath: '/our-work/rd-programs/towards-a-more-humane-genetics-education',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/humane-genetics/',
    toPath: '/our-work/rd-programs/towards-a-more-humane-genetics-education',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/STeLLA',
    toPath: '/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/STeLLA/',
    toPath: '/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/stella',
    toPath: '/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/stella/',
    toPath: '/our-work/rd-programs/stella-science-teachers-learning-from-lesson-analysis',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/STeLLACO2',
    toPath: '/our-work/news/3-million-federal-grant-to-impact-colorado-science-teacher-preparation',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/STeLLACO2/',
    toPath: '/our-work/news/3-million-federal-grant-to-impact-colorado-science-teacher-preparation',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/stellaco2',
    toPath: '/our-work/news/3-million-federal-grant-to-impact-colorado-science-teacher-preparation',
    isPermanent: true
  })

  createRedirect({
    fromPath: '/stellaco2/',
    toPath: '/our-work/news/3-million-federal-grant-to-impact-colorado-science-teacher-preparation',
    isPermanent: true
  })

  const reportsPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/reports-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "reports"}}}
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
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
            const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const nodeId = node.id
            createPage({
              // path: `/resources/research-resource-center/${slug}/`,
              path: `/resources/reports/${slug}/`,
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

  const educatorResourceCenterPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/educator-resource-center-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "educator-resource-center"}}}
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
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
            const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const nodeId = node.id
            createPage({
              path: `/resources/educator-resource-center/${slug}/`,
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

  const rdProgramsPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/rd-programs-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "rd-programs"}}}
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
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
            let slug
            // if (node.frontmatter.slug) {
            //   slug = node.frontmatter.slug.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            // } else {
            //   slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            // }
            slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const nodeId = node.id
            createPage({
              path: `/our-work/rd-programs/${slug}/`,
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

  const newsPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/news-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "news"}}}
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
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
            const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const nodeId = node.id
            createPage({
              path: `/our-work/news/${slug}/`,
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

  const upcomingProgramsPages = new Promise((resolve, reject) => {
    const markdownTemplate = path.resolve(`src/templates/upcoming-programs-template.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `query MarkdownPagesQuery {
          allMdx(
            filter: {frontmatter: { page: {eq: "upcoming-programs"}}}
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  type
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
            const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
            const type = node.frontmatter.type.toLowerCase().replace(/\s/g, '-')
            const nodeId = node.id
            createPage({
              path: `/upcoming-programs/${type}/${slug}/`,
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

  // const upcomingProgramsLeadershipDevelopmentPages = new Promise((resolve, reject) => {
  //   const markdownTemplate = path.resolve(`src/templates/upcoming-programs-leadership-development-template.js`)
  //   // Query for markdown nodes to use in creating pages.
  //   resolve(
  //     graphql(
  //       `query MarkdownPagesQuery {
  //         allMdx(
  //           filter: {frontmatter: { page: {eq: "upcoming-programs-leadership-development"}}}
  //           sort: { order: ASC, fields: [frontmatter___title] }
  //         ) {
  //           edges {
  //             node {
  //               id
  //               frontmatter {
  //                 title
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         reject(result.errors)
  //       } else if (!result.data.allMdx) {
  //         reject("No data")
  //       } else {
  //         // Create pages for each markdown file.
  //         result.data.allMdx.edges.forEach(({ node }) => {
  //           const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
  //           const nodeId = node.id
  //           createPage({
  //             path: `/upcoming-programs/leadership-development/${slug}/`,
  //             component: markdownTemplate,
  //             // In your blog post template's graphql query, you can use path
  //             // as a GraphQL variable to query for data from the markdown file.
  //             context: {
  //               nodeId,
  //             },
  //           })
  //         })
  //       }
  //     })
  //   )
  // })

  // const upcomingProgramsFieldTestOpportunitiesPages = new Promise((resolve, reject) => {
  //   const markdownTemplate = path.resolve(`src/templates/upcoming-programs-field-test-opportunities-template.js`)
  //   // Query for markdown nodes to use in creating pages.
  //   resolve(
  //     graphql(
  //       `query MarkdownPagesQuery {
  //         allMdx(
  //           filter: {frontmatter: { page: {eq: "upcoming-programs-field-test-opportunities"}}}
  //           sort: { order: ASC, fields: [frontmatter___title] }
  //         ) {
  //           edges {
  //             node {
  //               id
  //               frontmatter {
  //                 title
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         reject(result.errors)
  //       } else if (!result.data.allMdx) {
  //         reject("No data")
  //       } else {
  //         // Create pages for each markdown file.
  //         result.data.allMdx.edges.forEach(({ node }) => {
  //           const slug = node.frontmatter.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
  //           const nodeId = node.id
  //           createPage({
  //             path: `/upcoming-programs/field-test-opportunities/${slug}/`,
  //             component: markdownTemplate,
  //             // In your blog post template's graphql query, you can use path
  //             // as a GraphQL variable to query for data from the markdown file.
  //             context: {
  //               nodeId,
  //             },
  //           })
  //         })
  //       }
  //     })
  //   )
  // })

  return Promise.all([
    educatorResourceCenterPages,
    leadershipPages,
    newsPages,
    rdProgramsPages,
    reportsPages,
    upcomingProgramsPages
    // upcomingProgramsLeadershipDevelopmentPages,
    // upcomingProgramsFieldTestOpportunitiesPages
  ]);


  // const upcomingProgramsLeadershipDevelopmentPages = new Promise((resolve, reject) => {
  //   const markdownTemplate = path.resolve(`src/templates/upcoming-programs-leadership-development-template.js`)
  //   // Query for markdown nodes to use in creating pages.
  //   resolve(
  //     graphql(
  //       `query MarkdownPagesQuery {
  //         allMdx(
  //           filter: {frontmatter: { page: {eq: "upcoming-programs-leadership-development"}}}
  //           sort: { order: ASC, fields: [frontmatter___slug] }
  //         ) {
  //           edges {
  //             node {
  //               frontmatter {
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         reject(result.errors)
  //       }

  //       // Create pages for each markdown file.
  //       result.data.allMdx.edges.forEach(({ node }) => {
  //         const slug = node.frontmatter.slug
  //         createPage({
  //           path: `/upcoming-programs/leadership-development/${slug}/`,
  //           component: markdownTemplate,
  //           // In your blog post template's graphql query, you can use path
  //           // as a GraphQL variable to query for data from the markdown file.
  //           context: {
  //             slug,
  //           },
  //         })
  //       })
  //     })
  //   )
  // })

  // const upcomingProgramsFieldTestOpportunitiesPages = new Promise((resolve, reject) => {
  //   const markdownTemplate = path.resolve(`src/templates/upcoming-programs-field-test-opportunities-template.js`)
  //   // Query for markdown nodes to use in creating pages.
  //   resolve(
  //     graphql(
  //       `query MarkdownPagesQuery {
  //         allMdx(
  //           filter: {frontmatter: { page: {eq: "upcoming-programs-field-test-opportunities"}}}
  //           sort: { order: ASC, fields: [frontmatter___slug] }
  //         ) {
  //           edges {
  //             node {
  //               frontmatter {
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //       }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         reject(result.errors)
  //       }

  //       // Create pages for each markdown file.
  //       result.data.allMdx.edges.forEach(({ node }) => {
  //         const slug = node.frontmatter.slug
  //         createPage({
  //           path: `/upcoming-programs/field-test-opportunities/${slug}/`,
  //           component: markdownTemplate,
  //           // In your blog post template's graphql query, you can use path
  //           // as a GraphQL variable to query for data from the markdown file.
  //           context: {
  //             slug,
  //           },
  //         })
  //       })
  //     })
  //   )
  // })


  // return Promise.all([educatorResourceCenterPages, upcomingProgramsTeacherProfessionalLearningPages, upcomingProgramsLeadershipDevelopmentPages, upcomingProgramsFieldTestOpportunitiesPages, leadershipPages]);
}
