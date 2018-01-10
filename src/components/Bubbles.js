import React from 'react'
import { Link } from 'react-static'
import {
  Avatar,
  Flex,
  Box,
  Heading,
  Text,
  LargeButton,
  mediaQueries
} from '@hackclub/design-system'
import { shuffle, range, sample } from 'lodash'

const Root = Flex.extend`
  position: relative;
  min-height: 32rem;
  max-height: 72rem;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;

  > div:first-of-type {
    position: absolute;
    top: 0;
  }

  img {
    margin: 0.66em;
    will-change: transform;
    transform: scale(1, 1);
    transition-duration: 0.25s;
    transition-timing-function: ease-in;
    transition-delay: initial;
    transition-property: transform;
    &:hover {
      transform: scale(1.25);
    }
    &:nth-child(odd) {
      margin-left: 1.5em;
      margin-top: 0;
    }
    &:nth-child(even) {
      margin-right: 1em;
    }
    &:nth-child(6n) {
      width: 4em;
      height: 4em;
    }
    &:nth-child(8n) {
      width: 2.5em;
      height: 2.5em;
      margin-left: 1em;
    }
    &:nth-child(5n) {
      margin-top: 2em;
    }
    &:nth-child(13n) {
      width: 1.5em;
      height: 1.5em;
    }
    &:nth-child(17n) {
      margin-top: 3em;
    }
    @media screen and (max-width: 32em) {
      max-width: 72px;
      max-height: 72px;
      margin: 0.25em;
    }
  }
`

const Cloud = Box.extend`
  margin: auto;
  border-radius: 4rem;
  box-shadow: 0 0 2rem 4rem rgba(252, 252, 252, 0.95);
  background-color: rgba(252, 252, 252, 0.95);
  max-width: 30rem;
  text-align: center;
  position: relative;
  z-index: 2;
  @media (min-height: 24em) {
    box-sizing: content-box;
    border-radius: 8rem;
    box-shadow: 0 0 4rem 4rem rgba(252, 252, 252, 0.95);
    padding: 0 1rem;
    top: -2rem;
  }
  p:first-child {
    line-height: 1.125;
  }
  h1 {
    line-height: 1;
  }
  h2 {
    line-height: 1.25;
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Bubbles = ({ children }) => (
  <Root justify="center" align="center" pt={3} px={[0, 3]}>
    <Flex justify="space-around" wrap pt={2}>
      {shuffle([...range(92), ...range(92)]).map((i, n) => (
        <Avatar
          src={`/avatars/${i + 1}.jpg`}
          size={sample([48, 56, 64, 72, 84, 96]) + 'px'}
          key={`a-${n}`}
        />
      ))}
    </Flex>
    <Cloud>
      <Text f={[4, 5]} color="accent" mx="auto" m={0} bold caps>
        By the students,
        <br />
        for the students.
      </Text>
      <Heading.h1 f={[6, 7]} color="primary" mx="auto" mt={2} mb={3}>
        High school
        <br />
        coding clubs.
      </Heading.h1>
      <Text f={[3, 4]} color="gray.9" mx="auto" m={0}>
        Hack Club is a nonprofit network of coding clubs where members learn to
        code like hackers – through tinkering, building projects, and taking
        things apart.
      </Text>
      <Flex justify="center" wrap mx={-2} mt={4}>
        <LargeButton href="/donate" inverted m={2}>
          Donate
        </LargeButton>
        <LargeButton.link to="/start" m={2}>
          Apply »
        </LargeButton.link>
      </Flex>
    </Cloud>
  </Root>
)

export default Bubbles
