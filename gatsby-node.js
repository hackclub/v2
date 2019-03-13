const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const GeoPattern = require('geopattern')
const { colors } = require('@hackclub/design-system')
const writeFile = require('fs').writeFile
const axios = require('axios')

exports.onPreBootstrap = () =>
  axios
    .get('https://api.hackclub.com/v1/challenges')
    .then(res => res.data)
    .then(challenges => {
      challenges.forEach(data => {
        data.id = data.id.toString() // for Gatsby
      })
      writeFile('./public/challenges.json', JSON.stringify(challenges), err => {
        if (err) throw err
      })
    })
    .catch(e => {
      console.error(e)
    })

const pattern = (text = 'Hack Club', color = colors.primary) =>
  GeoPattern.generate(text, { baseColor: color }).toString()
const writePattern = (path, name) =>
  fs.writeFile(path, pattern(_.camelCase(name), colors.blue[6]), (err, a) => {
    if (err) console.error(err)
  })

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (!!parsedFilePath.dir && _.includes(fileNode.relativePath, 'README')) {
      const value = `/workshops/${parsedFilePath.dir}`
      createNodeField({ node, name: 'slug', value })
      createNodeField({ node, name: 'bg', value: `${value}.svg` })

      const dir = './public/workshops'
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      const path = `./public${_.replace(value, '/lib', '')}.svg`
      writePattern(path, node.frontmatter.name)
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const component = path.resolve('src/templates/workshop.js')
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

        _.forEach(result.data.allMarkdownRemark.edges, edge => {
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
