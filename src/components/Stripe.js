import React from 'react'
import { Banner, Container, Heading, Subhead } from 'rebass'
import { colors, mx, wk } from '../theme'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)
const Stripe = Banner.extend`
  ${tilt(90)};
  background: ${colors.blue[5]} url('/map.svg') no-repeat;
  background-size: 100% 100%;
  margin-top: -3rem;
  min-height: initial !important;
  ${mx[1]} {
    margin-top: -6rem;
    min-height: 66vw !important;
  }
`

const StripeContainer = Container.extend.attrs({
  maxWidth: 48 * 16,
  p: 4
})`
  text-align: center;
  z-index: 1;

  h2, h3 {
    color: ${colors.black};
  }
  mark {
    background-color: rgba(250, 247, 133, .9);
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
  color: 'muted'
})`
  font-weight: normal;
  line-height: 1.5;
`

export default () => (
  <Stripe id="more">
    <StripeContainer>
      <Headline f={[5, 6]} mt={0}>
        Hack Club brings {' '}
        <mark>coding clubs</mark>
        {' to '}
        <mark>high schools</mark>
        {' '} everywhere.
      </Headline>
      <Subheadline my={0}>
        We‘re starting the {' '}
        <mark>computer science education</mark>
        {' '} students need.
      </Subheadline>
    </StripeContainer>
  </Stripe>
)
