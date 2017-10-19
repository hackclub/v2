import React from 'react'
import { Heading, Container, Flex, Box, Text, Subhead } from 'rebass'
import { colors, mx, mm } from '../theme'

const Base = Container.extend.attrs({ px: 4 })`
  display: grid;
  grid-gap: 4rem;
  margin-top: 4rem;

  ${mx[1]} {
    grid-template-columns: 1fr 3fr;
    h2 {
      justify-self: end;
    }
  }
`

const Headline = Heading.extend`
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  div {
    color: ${colors.primary};

    &:last-of-type {
      position: relative;
      &:after {
        color: ${colors.slate};
        content: '.';
        position: absolute;
      }
    }
  }
  span {
    color: ${colors.slate};
  }

  ${mm[1]} {
    div {
      display: inline;
      margin-left: 0.25em;
      margin-right: 0.25em;
    }
    span {
      &:first-of-type {
        display: block;
        width: 100%;
      }
      &:last-of-type {
        color: ${colors.primary};
      }
    }
  }
  ${mx[1]} {
    text-align: right;
    div {
      font-size: 3rem;
    }
    span {
      font-size: 1.5rem;

      &:last-of-type {
        font-size: 2.25rem;
      }
    }
  }
`

const Feat = Box.extend.attrs({ mb: 4 })`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'title desc';
  align-items: center;

  h3 {
    grid-area: title;
  }
  p {
    grid-area: desc;
  }

  &:nth-child(2n) {
    grid-template-areas: 'desc title';
  }
`
const Feature = ({ title, desc, ...props }) => (
  <Feat>
    <Subhead color="primary" f={5} children={title} />
    <Text f={4} color="slate" children={desc} />
  </Feat>
)

export default () => (
  <Base>
    <Headline>
      <span>Start with a</span>
      <div>club</div>
      <span>in a</span>
      <div>box</div>
    </Headline>
    <Box>
      <Feature
        title="Training, assistance, whatever, wherever."
        desc="Meet with our staff, members, or experienced club leaders for advice."
      />
      <Feature
        title="Start from 11."
        desc="We provide you with starter content: workshops, example materials, guides, posters."
      />
      <Feature
        title="A community that cares."
        desc="Talk to thousands of other members at all skill levels 24/7 in our Slack."
      />
    </Box>
  </Base>
)
