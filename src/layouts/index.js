import React from 'react'
import Helmet from 'react-helmet'
import data from 'data.json'
import { ThemeProvider, colors } from '@hackclub/design-system'

const { name, title, description, img, url, org } = data

const meta = tags => tags.map(props => React.createElement('meta', props))

export default props => (
  <ThemeProvider>
    <Helmet defaultTitle={title} title={title}>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="theme-color" content={colors.primary} />
      {meta([
        { name: 'description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: description },
        { name: 'twitter:domain', content: url },
        { name: 'twitter:image:src', content: img },
        { name: 'twitter:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: img },
        { property: 'og:image:height', content: 512 },
        { property: 'og:image:width', content: 512 },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: name },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url }
      ])}
      <script type="application/ld+json" children={JSON.stringify(org)} />
    </Helmet>
    {props.children()}
  </ThemeProvider>
)
