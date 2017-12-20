import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Link as A
} from 'rebass'
import theme, { colors, cx, mx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import CTA from '../components/CTA'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import Section from '../components/Section'

const One = Section.extend`
  padding-top: 0 !important;
  background-color: ${cx('red.5')};
  background-image: linear-gradient(
    16deg,
    ${cx('orange.4')} 0%,
    ${cx('red.5')} 50%,
    ${cx('red.6')} 100%
  );
`
const Two = Section.extend`
  background-color: ${cx('violet.6')};
  background-image: linear-gradient(
    32deg,
    ${cx('violet.5')} 0%,
    ${cx('violet.6')} 50%,
    ${cx('indigo.4')} 100%
  );
`
const Three = Section.extend`
  background-color: ${cx('blue.6')};
  background-image: linear-gradient(
    -48deg,
    ${cx('blue.7')} 0%,
    ${cx('blue.6')} 50%,
    ${cx('indigo.4')} 100%
  );
`

const HeaderInner = Container.extend.attrs({
  maxWidth: 57 * 16,
  w: 1
})`text-align: left;`

const HeadLine = Heading.extend.attrs({
  is: 'h1',
  color: 'white',
  f: [5, 7, 8]
})`
  line-height: 1.125 !important;
  text-transform: uppercase;
  ${mx[1]} {
    &:nth-of-type(2) {
      padding-left: 6rem;
    }
  }
  &:nth-of-type(3) {
    text-align: center;
  }
  &:nth-of-type(4) {
    text-align: right;
  }
`

const SubheadLine = Heading.extend.attrs({ f: [3, 4, 5] })`
  font-weight: normal;
  text-align: center;
`

const CTASection = Box.extend.attrs({
  is: 'section',
  px: 3
})`
  text-align: center;
`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Philosophy – Hack Club</title>
    </Head>
    <One>
      <Nav />
      <HeaderInner>
        <HeadLine children="Everyone" />
        <HeadLine children="learns best" />
        <HeadLine children="when they’re" />
        <HeadLine children="making." />
      </HeaderInner>
    </One>
    <Two>
      <Heading>Coding is a superpower.</Heading>
    </Two>
    <Three>
      <CTASection>
        <CTA to="/start" bg="white" color="primary">
          Start a Club
        </CTA>
      </CTASection>
    </Three>
    <Footer />
  </Provider>
)
