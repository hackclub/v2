import React from 'react'
import { Avatar, Flex, Box, Heading, Lead } from 'rebass'
import CTA from './CTA'
import { Link } from 'react-static'
import { shuffle, range, sample } from 'lodash'
import { mx } from '../theme'

const Root = Flex.extend.attrs({
  justify: 'center',
  align: 'center',
  pt: 3,
  px: 3
})`
  position: relative;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`

const Fill = Flex.extend.attrs({ justify: 'space-around', wrap: true })`
  position: absolute;
  top: 0;
  z-index: -1;
`

const Cloud = Box.extend`
  max-width: 48rem;
  margin: auto;
  border-radius: 4rem;
  box-shadow: 0 0 2rem 4rem rgba(250, 250, 250, 0.95);
  background-color: rgba(250, 250, 250, 0.95);
  text-align: center;
  position: relative;
  z-index: 2;
  @media (min-height: 24em) {
    border-radius: 8rem;
    box-shadow: 0 0 4rem 4rem rgba(250, 250, 250, 0.95);
    top: -2rem;
  }
`

const Bubble = Avatar.extend`
  margin: 0.75em;
  &:nth-child(odd) {
    margin-left: 1.5em;
    margin-top: 0;
  }
  &:nth-child(even) {
    margin-right: 1em;
  }
  &:nth-child(6n) {
    width: 3em;
    height: 3em;
    margin-bottom: 1em;
  }
  &:nth-child(8n) {
    width: 2.5em;
    height: 2.5em;
    margin-left: 1em;
  }
  &:nth-child(13n) {
    width: 1.5em;
    height: 1.5em;
  }
  ${mx[1]} {
    &:first-child {
      margin-left: 6rem;
    }
  }
`

const Title = Heading.extend.attrs({
  is: 'h1',
  f: [6, 7],
  my: 0,
  color: 'primary'
})`line-height: 1.1;`
const Subtitle = Lead.extend.attrs({
  f: [3, 4],
  mt: 3,
  mb: 4,
  mx: 'auto',
  w: [1, 2 / 3],
  color: 'grey'
})`line-height: 1.5;`

const Bubbles = ({ children }) => (
  <Root>
    <Fill>
      {shuffle([...range(92), ...range(92)]).map((i, n) => (
        <Bubble
          src={`/avatars/${i + 1}.jpg`}
          size={sample([48, 56, 64, 72, 84, 96])}
          key={`a-${n}`}
        />
      ))}
    </Fill>
    <Cloud>
      <Title>We the students.</Title>
      <Subtitle>
        Hack Clubs are places where students learn to code and build amazing
        things together.
      </Subtitle>
      <Flex justify="center" wrap m={-2}>
        <CTA is={Link} to="/about" bg="white" color="primary">
          Read More
        </CTA>
        <CTA href="https://hackclub.com/start">
          Start a Club
        </CTA>
      </Flex>
    </Cloud>
  </Root>
)

export default Bubbles
