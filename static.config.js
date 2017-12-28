import React, { Component } from 'react'
import { injectGlobal, ServerStyleSheet } from 'styled-components'
import Uglify from 'uglifyjs-webpack-plugin'
import data from './data'
import { colors } from '@hackclub/design-system'

const segment = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0"; analytics.load("35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw"); analytics.page(); }}();`

export default {
  getSiteProps: () => ({
    name: 'Hack Club'
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/containers/Home'
    },
    {
      path: '/team',
      component: 'src/containers/Team'
    },
    {
      path: '/start',
      component: 'src/containers/Start'
    },
    {
      path: '/apply',
      component: 'src/containers/ApplicationIndex'
    },
    { // Just kept around for reference
      path: '/apply_old',
      component: 'src/containers/Apply'
    },
    {
      path: 'apply/signin',
      component: 'src/containers/ApplicationSignIn'
    },
    {
      path: '/meetings',
      component: 'src/containers/Meetings'
    },
    {
      path: '/replit/start',
      component: 'src/containers/StartRepl'
    },
    {
      path: '/replit/apply',
      component: 'src/containers/ApplyRepl'
    },
    {
      is404: true,
      component: 'src/containers/NotFound'
    }
  ],
  webpack: c => {
    c.plugins = c.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin')
    c.plugins.push(new Uglify())
    return c
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props
      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <meta name="format-detection" content="telephone=no" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={data.title} />
            <meta property="og:url" content={data.url} />
            <meta property="og:image" content={data.img} />
            <meta property="og:site_name" content={data.name} />
            <meta property="og:description" content={data.description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data.title} />
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:image:src" content={data.img} />
            <meta name="twitter:domain" content={data.url} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta name="theme-color" content={colors.primary} />
            <script dangerouslySetInnerHTML={{ __html: segment }} />
            {renderMeta.styleTags}
          </Head>
          <Body children={children} />
        </Html>
      )
    }
  }
}
