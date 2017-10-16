import axios from 'axios'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
const Uglify = require('uglifyjs-webpack-plugin')

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

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="stylesheet" href="/fakt-soft.css" />
            {styleTags}
          </Head>
          <Body>{newChildren}</Body>
        </Html>
      )
    }
  }
}
