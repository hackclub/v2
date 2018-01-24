module.exports = {
  siteMetadata: {
    title: 'Hack Club'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    },
    'gatsby-plugin-netlify'
  ]
}
