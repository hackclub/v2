module.exports = {
  siteMetadata: {
    title: 'Hack Club'
  },
  plugins: [
    'gatsby-plugin-resolve-src',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/workshops`,
        name: 'workshops'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/fonts/**': ['Access-Control-Allow-Origin: *']
        }
      }
    }
  ]
}
