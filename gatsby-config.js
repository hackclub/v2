// configure plugins here
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
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Hack Club',
        short_name: 'Hack Club',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#e42d42',
        display: 'minimal-ui'
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
      resolve: 'gatsby-plugin-segment',
      options: {
        writeKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    }
  ]
}
