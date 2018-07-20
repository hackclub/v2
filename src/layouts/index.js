import React from 'react'
import Helmet from 'react-helmet'
import data from 'data.json'
import { ThemeProvider, colors } from '@hackclub/design-system'
import serviceWorkerKiller from 'swkiller'

const { name, title, description, img, url, org } = data

const meta = tags =>
  tags.map((props, index) =>
    React.createElement('meta', { ...props, key: index })
  )

export default props => (
  <ThemeProvider webfonts>
    <Helmet defaultTitle={title}>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content={colors.primary} />
      {meta([
        { name: 'description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hackclub' },
        { name: 'twitter:domain', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: img },
        { property: 'og:site_name', content: name },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: img },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url }
      ])}
      <script children={`${serviceWorkerKiller.toString()}; serviceWorkerKiller()`} />
      <script type="application/ld+json" children={JSON.stringify(org)} />
    </Helmet>
    {props.children()}
  </ThemeProvider>
)
