import React, { Component } from 'react'
import { injectGlobal, ServerStyleSheet } from 'styled-components'
const Uglify = require('uglifyjs-webpack-plugin')
const data = require('./data')
const colors = require('./src/theme').colors

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
      path: '/about',
      component: 'src/containers/About'
    },
    {
      is404: true,
      component: 'src/containers/404'
    }
  ],
  webpack: (c, { dev }) => {
    c.plugins = c.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin')
    c.plugins.push(new Uglify())
    return c
  },
  Html: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children } = this.props

      const sheet = new ServerStyleSheet()
      const newChildren = sheet.collectStyles(children)
      const styleTags = sheet.getStyleElement()

      const segment = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0"; analytics.load("8SLCkrqC517pTQdMvqP1eSP8FkH8yFzE"); analytics.page(); }}();`
      const css = `
        *{box-sizing:border-box}body{line-height:1.6;margin:0}

        @font-face {
          font-family: Averta;
          font-style: normal;
          font-weight: normal;
          src: local('☺'), url(/fonts/averta-regular.woff2) format('woff2'), url(/fonts/averta-regular.woff) format('woff');
          unicode-range: U + 0000 - F8FE, U + F900-FFFF;
        }

        @font-face {
          font-family: Averta;
          font-style: normal;
          font-weight: bold;
          src: local('☺'), url(/fonts/averta-bold.woff2) format('woff2'), url(/fonts/averta-bold.woff) format('woff');
          unicode-range: U + 0000 - F8FE, U + F900-FFFF;
        }
      `

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={data.img} />
            <meta name="og:image" content={data.img} />
            <meta name="og:title" content={data.name} />
            <meta name="twitter:title" content={data.name} />
            <meta name="og:description" content={data.description} />
            <meta name="twitter:description" content={data.description} />
            <meta name="description" content={data.description} />
            <meta name="twitter:site" content={data.twitter} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta name="theme-color" content={colors.primary} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="format-detection" content="telephone=no" />
            <script dangerouslySetInnerHTML={{ __html: segment }} />
            <style dangerouslySetInnerHTML={{ __html: css }} />
            {styleTags}
          </Head>
          <Body>{newChildren}</Body>
        </Html>
      )
    }
  }
}
