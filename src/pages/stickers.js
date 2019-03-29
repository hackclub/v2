import React from 'react'
import styled, { css } from 'styled-components'
import { Box, Flex, Heading, Image, Text, theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'
import { random } from 'lodash'
import { Lead } from 'components/Content'

const Hero = styled(Flex.withComponent('article')).attrs({ align: 'center' })`
  background-image: ${theme.gradient('dark', 'darker')};
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`

const Megaline = styled(Heading.h1).attrs({
  color: 'white',
  fontSize: [6, 7, 8],
  pt: 1
})`
  line-height: 1;
  @supports (-webkit-background-clip: text) {
    background-image: ${theme.gradient('pink.5', 'red.5', 'red.6')};
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${theme.mediaQueries.md} {
    line-height: 0.875;
  }
`

const Article = styled(Sheet).attrs({
  maxWidth: 32,
  align: 'center',
  mx: 'auto'
})`
  z-index: 2;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(0, 0, 0, 0.75);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
  }
  ${theme.mediaQueries.reduceTransparency} {
    -webkit-backdrop-filter: auto !important;
  }
`

const Grid = styled(Box).attrs({ px: 3, py: [0, 6] })`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(128px, 1fr));
  grid-gap: ${theme.space[4]}px;
  position: absolute;
  width: 100%;
  height: 100%;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[6]}px;
  }
`

const Sticker = styled(Image).attrs({ width: 1 })`
  object-fit: contain;
  margin: auto;
  transform: rotate(${props => random(-12, 16)}deg);
  ${props =>
    props.cols &&
    css`
      grid-column: span ${props.cols};
    `}
  ${props =>
    props.rows &&
    css`
      grid-row: span ${props.rows};
    `}
`

const title = 'Hack Club Secret Santa – Holiday 2018'
const desc = 'Find your holiday zen this year with Hack Club’s Secret Santa.'
const img = 'https://hackclub.com/cards/santa.png'

export default () => (
  <Layout>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: desc },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: img },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: img },
        { property: 'og:url', content: 'https://hackclub.com/santa' }
      ]}
    />
    <Nav dark fixed />
    <Hero py={[4, 5]}>
      <Grid>
        <Sticker rows={2} alt="Classic Macintosh" src="/stickers/mac.svg" />
        <Sticker alt="Pride" src="/stickers/pride.svg" />
        <Sticker cols={2} alt="Enjoy Hack Club" src="/stickers/enjoy.svg" />
        <Sticker
          cols={2}
          alt="Stranger Hacks"
          src="/stickers/stranger_hacks.png"
        />
        <Sticker alt="Hack Club" src="/stickers/h.svg" />
        <Sticker
          cols={2}
          rows={2}
          alt="Holiday 2018"
          src="/stickers/holidays.svg"
        />
        <Sticker cols={2} alt="Undertale" src="/stickers/undertale.svg" />
        <Sticker
          rows={2}
          cols={2}
          alt="Hack Strikes Back"
          src="/stickers/strikes_back.svg"
        />
      </Grid>
      <Article>
        <Text color="muted" fontSize={[3, 4]} bold caps>
          Stick to it
        </Text>
        <Megaline>Unparalleled stickers.</Megaline>
        <Lead fontSize={[3, null, 4]} color="smoke" maxWidth={48} my={3} mx={0}>
          Every season, we design another of our renowned stickers. Collect them
          all & stick them everywhere!
        </Lead>
      </Article>
    </Hero>
    <Footer dark />
  </Layout>
)
