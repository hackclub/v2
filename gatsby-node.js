const path = require('path')
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return Promise.all([
    new Promise((resolve, reject) => {
      segmentData = require(path.resolve('src/data.json')).userSegmentPages
      resolve(
        _.forEach(Object.keys(segmentData), segmentPath => {
          createPage({
            path: `/${segmentPath}`,
            component: path.resolve('src/templates/segmenter.js'),
            context: {
              userType: segmentData[segmentPath]
            }
          })
        })
      )
    })
  ])
}
