import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Flex,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import { Lead } from 'components/Content'
import { Fade } from 'react-reveal'

// const Base = styled(Box).attrs({ bg: 'dark' })`
//   color: ${theme.colors.gray[3]};
//   background-image: radial-gradient(
//     circle,
//     ${theme.colors.black},
//     ${theme.colors.black} 1px,
//     ${theme.colors.dark} 1px,
//     ${theme.colors.dark}
//   );
//   background-size: 2rem 2rem;
// `
const Base = styled(Box.section).attrs({ bg: 'primary', color: 'snow' })`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.orange[5]},
    ${theme.colors.red[5]},
    ${theme.colors.red[7]}
  );
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle,
      ${theme.colors.red[3]},
      ${theme.colors.red[3]} 1px,
      transparent 1px,
      transparent
    );
    background-size: 2rem 2rem;
    z-index: 0;
  }
`

const Megaline = styled(Heading.h1).attrs({
  color: 'white',
  fontSize: [5, 6, 7, 8]
})`
  line-height: 1.125;
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
        to bottom right,
        ${theme.colors.white},
        ${theme.colors.gray[3]}
      )
      no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Row = ({ icon, text }) => (
  <Fade bottom>
    <Flex align="center" mb={[2, 3]}>
      <Icon glyph={icon} size={48} mr={3} />
      <Text align="left" fontSize={[3, 4, 5]} children={text} />
    </Flex>
  </Fade>
)

// const CTA = styled(IconButton).attrs({
//   is: LargeButton,
//   inverted: true,
//   color: 'white',
//   glyph: 'slack'
// })``

export default () => (
  <Base py={[5, 6, 7, 8]}>
    <Container px={3} style={{ zIndex: 3 }}>
      <Megaline mb={[3, 5]}>
        Run your high school hackathon with{' '}
        <Text.span color="white">Hack Club Bank</Text.span>.
      </Megaline>
      <Row icon="bank-circle" text="501(c)(3) status-backed bank account" />
      <Row icon="card" text="Debit cards for your whole team" />
      <Row icon="send" text="Easy invoice sending with automatic receipts" />
      <Row icon="google" text="Included G Suite email accounts" />
    </Container>
  </Base>
)
