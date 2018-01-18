import React from 'react'
import { Flex, Container, Heading, mediaQueries } from '@hackclub/design-system'
import { wk } from '../theme'
import { stats } from '../../data'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)
const Stripe = Flex.extend`
  ${tilt(90)};
  background: ${props => props.theme.colors.blue[5]} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  margin-top: -3rem;
  min-height: 32rem;
  max-height: 72rem;
  ${mediaQueries[1]} {
    margin-top: -6rem;
    min-height: 75vh;
  }
`

const StripeContainer = Container.extend`
  z-index: 1;

  h3 mark {
    font-weight: normal;
  }
  mark {
    background-color: rgba(250, 247, 133, 0.8);
    color: ${props => props.theme.colors.black} !important;
    padding-left: 0.125em;
    padding-right: 0.125em;
    line-height: 1.35;
    width: 100%;
  }
`

export default () => (
  <Stripe id="more" align="center" justify="center" direction="column" py={3}>
    <StripeContainer maxWidth={36} p={2} align="center">
      <Heading.h2 f={[5, 6]} mt={0} mb={3}>
        <mark>{stats.percentage_of_us_high_schools} of US high schools.</mark>
        <br />
        <mark>
          {stats.state_count} states. {stats.country_count} countries.
        </mark>
      </Heading.h2>
      <Heading.h3 f={[3, 4]} m={0}>
        <mark>
          Join the largest community of students building the class they wish
          they could take.
        </mark>
      </Heading.h3>
    </StripeContainer>
  </Stripe>
)
