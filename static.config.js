import React, { Component } from 'react'
import { injectGlobal, ServerStyleSheet } from 'styled-components'
const Uglify = require('uglifyjs-webpack-plugin')
const data = require('./data')
const colors = require('./src/theme').colors

export default {
  getSiteProps: () => ({
    title: 'Hack Club'
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
  webpack: (config, { dev }) => {
    config.merge(function(c) {
      c.plugins = c.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin')
      c.plugins.push(new Uglify())
      return c
    })
  },
  Html: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children } = this.props

      const sheet = new ServerStyleSheet()
      const newChildren = sheet.collectStyles(children)
      const styleTags = sheet.getStyleElement()

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
            <title children={data.name} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={data.img} />
            <meta name="og:image" content={data.img} />
            <meta name="og:title" content={data.name} />
            <meta name="twitter:title" content={data.name} />
            <meta name="og:description" content={data.description} />
            <meta name="twitter:description" content={data.description} />
            <meta name="description" content={data.description} />
            <meta name="twitter:site" content={data.twitter} />
            <meta name="theme-color" content={colors.primary} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="format-detection" content="telephone=no" />
            <style dangerouslySetInnerHTML={{ __html: css }} />
            {styleTags}
          </Head>
          <Body>{newChildren}</Body>
        </Html>
      )
    }
  }
}
