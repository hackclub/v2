import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Hack Club</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <style
            children={`*{box-sizing:border-box}body{line-height:1.6;margin:0}`}
          />
          <link rel="stylesheet" href="/static/fakt-soft.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
