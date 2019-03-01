import React from 'react'
import styled from 'styled-components'
import { Box, Container, Icon, Text, theme } from '@hackclub/design-system'
import { Subhline, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import Sheet from 'components/Sheet'

const Base = styled(Box.section).attrs({ bg: 'darker', px: 3, pb: [4, 5, 6] })``

const Main = styled(Sheet).attrs({
  bg: '#252429',
  color: 'smoke',
  p: [3, 4, 5]
})`
  border-radius: ${theme.radii[2]};
  position: relative;
  display: grid;
  grid-gap: ${theme.space[4]}px;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const List = styled(Text.withComponent('ol')).attrs({ pl: 0 })`
  list-style: none;
  li {
    line-height: 1.25;
    break-inside: avoid;
    display: flex;
    align-items: center;
    padding-bottom: ${theme.space[2]}px;
  }
  svg {
    flex-shrink: none;
  }
`

List.Item = ({ icon, body }) => (
  <Fade bottom>
    <li>
      <Icon glyph={icon} color="primary" size={32} mr={2} />
      <Text.span fontSize={[2, 3]} children={body} />
    </li>
  </Fade>
)

export default () => (
  <Base>
    <Main maxWidth={60}>
      <Container maxWidth={28} mx={0}>
        <Subhline>Bank doesn’t stop at closing ceremony.</Subhline>
        <Lead color="muted" fontWeight={3}>
          Setting up a bank account is just the start. Hack Club Bank helps you
          handle ongoing obligations while you’re organizing.
        </Lead>
      </Container>
      <List>
        <List.Item
          icon="docs"
          body="We handle ongoing tax filings including end-of-year taxes"
        />
        <List.Item
          icon="payment"
          body="Our accountants regularly reconcile your books"
        />
        <List.Item
          icon="history"
          body="You always have access to historical financial data"
        />
      </List>
    </Main>
  </Base>
)
