/* eslint-disable no-console */
const pathResolver = require('path')

const slugify = string => string.replace(/\?|\./g,'').split(' ').join('-').toLowerCase()

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type PostsJson implements Node {
      slug: String
    }

    type AuthorsJson implements Node {
      slug: String
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    PostsJson: {
      slug: {
        resolve(source) {
          if (source.title) {
            return slugify(source.title)
          }
        }
      }
    },
    AuthorsJson: {
      slug: {
        resolve(source) {
          if (source.name) {
            return slugify(source.name)
          }
        }
      }
    },
  })
}

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          posts: allPostsJson {
            edges {
              node {
                id
                title
              }
            }
          }

          authors: allAuthorsJson {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        const buildPage = ({ template, path, node, context = {} }) => {
          const component = pathResolver.resolve(`src/templates/${template}.js`)

          createPage({
            path,
            component,
            context: { ...context, id: node.id }
          })
        }

        // Blog: Authors that have posts
        result.data.authors.edges.forEach(({ node }) => {
          const slug = slugify(node.name)
          buildPage({ node, template: 'blog-author', path: `/author/${slug}` })
        })

        // Blog: Posts
        result.data.posts.edges.forEach(({ node }) => {
          const slug = slugify(node.title)
          buildPage({ node, template: 'blog-post', path: `/post/${slug}` })
        })

        return
      }).catch((err) => { throw err })
    )
  })
}
