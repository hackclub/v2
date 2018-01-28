import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import data from 'data.json'
import { colors } from '@hackclub/design-system'

export default props => (
  <Fragment>
    <Helmet defaultTitle={data.title}>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.title} />
      <meta property="og:url" content={data.url} />
      <meta property="og:image" content={data.img} />
      <meta property="og:image:width" content={512} />
      <meta property="og:image:height" content={512} />
      <meta property="og:site_name" content={data.name} />
      <meta property="og:description" content={data.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image:src" content={data.img} />
      <meta name="twitter:domain" content={data.url} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="theme-color" content={colors.primary} />
    </Helmet>
    {props.children()}
  </Fragment>
)
