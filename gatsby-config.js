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
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/banners/*': ['Access-Control-Allow-Origin: *'],
          '/fonts/**': ['Access-Control-Allow-Origin: *']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw',
        trackPage: true
      }
    }
  ]
}
