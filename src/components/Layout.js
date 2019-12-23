import React from 'react'
import Helmet from 'react-helmet'
import data, { url, org } from 'data.json'
import { ThemeProvider, theme } from '@hackclub/design-system'
import BG from 'components/BG'

const meta = tags =>
  tags.map((props, index) =>
    React.createElement('meta', { ...props, key: index })
  )

export default ({
  title = data.title,
  desc = data.description,
  path = '/',
  img = data.img,
  bg,
  children
}) => (
  <ThemeProvider webfonts>
    <Helmet title={title}>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content={theme.colors.primary} />
      {meta([
        { name: 'description', content: desc },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hackclub' },
        { name: 'twitter:domain', content: url + '/' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: url + img },
        { property: 'og:site_name', content: data.name },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: url + img },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url + path }
      ])}
      <script type="application/ld+json" children={JSON.stringify(org)} />
    </Helmet>
    {bg && <BG color={bg} />}
    {children}
  </ThemeProvider>
)
