import React from 'react'
import {
  Provider,
  Banner,
  Box,
  Container,
  Flex,
  Heading,
  Lead,
  Subhead,
  Text
} from 'rebass'
import { Link } from 'react-static'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Bubbles from '../components/Bubbles'
import Flag from '../components/Flag'
import Start from '../components/Start'
import Features from '../components/Features'
import Superpower from '../components/Superpower'
import Collage from '../components/Collage'
import Mosaic from '../components/Mosaic'
import Footer from '../components/Footer'
import Map from '../map/Map'
import theme, { brand, grays, geo, wk, mx, mm } from '../theme'
import { keys } from 'lodash'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)
const Stripe = Banner.extend`
  ${geo(brand.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  ${tilt(90)};
  padding-top: 6rem;
  padding-bottom: 6rem;
  margin-top: -4rem;
  min-height: initial !important;

  ${mx[1]} {
    ${tilt(75)};
    padding-top: 8rem;
    padding-bottom: 8rem;
    margin-top: -6rem;
  }
  h3 {
    opacity: 0.85;
  }
`

const StripeContainer = Container.extend`
  max-width: 48rem;
  padding: 0;
  text-align: center;
  z-index: 1;
`

  h2, h3 {
    color: ${colors.black};
  }
  mark {
    background-color: ${colors.yellow[4]};
    color: ${colors.black};
    padding-left: .25em;
    padding-right: .25em;
  }
`

const Headline = Heading.extend.attrs({
  is: 'h2',
  f: 5,
  mt: 4,
  mb: 2,
  color: 'primary'
})`line-height: 1.25;`
const Subheadline = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 1,
  color: 'silver'
})`
  font-weight: normal;
  line-height: 1.5;
`

export default () => (
  <Provider theme={theme}>
    <Flag />
    <Bubbles />
    <Stripe>
      <StripeContainer>
        <Headline color="white" f={6} mt={0}>
          At Hack Club, it’s all about you.
        </Headline>
        <Subheadline color="white" my={0}>
          Hack Clubs are coding clubs that are led by students, for students.
        </Subheadline>
      </StripeContainer>
    </Stripe>
    <Map />
    <Features />
    <Superpower />
    <Collage />
    <Mosaic />
    <Start />
    {/* <Bar w={1 / 3} my={4} mx="auto" /> */}
    <Footer />
  </Provider>
)
