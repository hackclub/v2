exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators

  const redirects = [
    { f: '/find', t: '/finder' }
  ]
  redirects.forEach(({ f, t }) => {
    createRedirect({
      fromPath: f,
      redirectInBrowser: true,
      toPath: t || f
    })
  })
}
