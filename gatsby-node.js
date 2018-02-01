const path = require('path')
const fs = require('fs')
const GeoPattern = require('geopattern')
const { colors } = require('@hackclub/design-system')
const _ = require('lodash')

const pattern = (text = 'Hack Club', color = colors.primary) =>
  GeoPattern.generate(text, { baseColor: color }).toString()
const writePattern = (path, name) =>
  fs.writeFile(path, pattern(_.camelCase(name), '#D500F9'), (err, data) => {
    if (err) console.error(err)
  })

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (!!parsedFilePath.dir) {
      const value = `/workshops/${parsedFilePath.dir}`
      createNodeField({ node, name: 'slug', value })
      createNodeField({ node, name: 'bg', value: `${value}.svg` })
      if (process.argv.indexOf('PATTERNS=true') != -1) {
        const path = `./static${_.replace(value, '/lib', '')}.svg`
        writePattern(path, node.frontmatter.name)
      }
    }
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const component = path.resolve('src/pages/workshops/page.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: { frontmatter: { name: { ne: null } } }) {
              edges {
                node {
                  frontmatter {
                    name
                    description
                    group
                    order
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const groupSet = new Set()
        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.category) {
            groupSet.add(edge.node.frontmatter.group)
          }

          createPage({
            path: edge.node.fields.slug,
            component,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })
      })
    )
  })
}
