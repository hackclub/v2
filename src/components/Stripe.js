import React from 'react'
import { Flex, Container, Heading, Subhead } from 'rebass'
import { colors, mx, wk } from '../theme'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)
const Stripe = Flex.extend.attrs({
  align: 'center',
  justify: 'center',
  direction: 'column',
  p: [3, 0]
})`
  ${tilt(90)};
  background: ${colors.blue[5]} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  margin-top: -3rem;
  min-height: 24rem;
  ${mx[1]} {
    margin-top: -6rem;
    min-height: 75vh !important;
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
    background-color: rgba(250, 247, 133, .85);
    color: ${colors.black};
    padding-left: .25em;
    padding-right: .25em;
  }
`

const Headline = Heading.extend.attrs({
  is: 'h2',
  f: 5,
  mt: 10,
  mb: 20,
  color: 'primary'
})`line-height: 1.345;`

const Subheadline = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 0,
  color: 'muted'
})`
  font-weight: normal;
  line-height: 1.345;
`

export default () => (
  <Stripe id="more">
    <StripeContainer>
      <Headline f={[5, 6]} mt={0}>
        <mark>1% of US high schools. 35 states. 13 countries.</mark>
      </Headline>
      <Subheadline my={0}>
        <mark>
          Join the largest community of students building the class they wish
          they could take.
        </mark>
      </Subheadline>
    </StripeContainer>
  </Stripe>
)
