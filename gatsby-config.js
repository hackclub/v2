module.exports = {
  siteMetadata: {
    title: 'Hack Club',
    siteUrl: 'https://hackclub.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://hackclub.com'
      }
    }
  ]
}
