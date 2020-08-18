module.exports = {
  siteMetadata: {
    title: 'Hack Club',
    siteUrl: 'https://hackclub.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://hackclub.com'
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'aardvark.hackclub.com',
        siteId: 'OGIMJEFA',
        whitelistHostnames: ['hackclub.com']
      }
    }
  ]
}
