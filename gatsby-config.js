const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Hack Club',
    siteUrl: 'https://hackclub.com'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        pages: path.join(__dirname, 'src/pages'),
        animator: path.join(__dirname, 'src/animator'),
        api: path.join(__dirname, 'src/api'),
        constants: path.join(__dirname, 'src/constants'),
        data: path.join(__dirname, 'src/data.json'),
        helpers: path.join(__dirname, 'src/helpers'),
        map: path.join(__dirname, 'src/map'),
        models: path.join(__dirname, 'src/models'),
        pulse: path.join(__dirname, 'src/pulse'),
        search: path.join(__dirname, 'src/search'),
        storage: path.join(__dirname, 'src/storage')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/workshops`,
        name: 'workshops'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/public/challenges.json`,
        name: 'challenges'
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-images',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer noopener'
            }
          }
        ]
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-segment-js',
      options: {
        prodKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://hackclub.com'
      }
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-no-sourcemaps',
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
