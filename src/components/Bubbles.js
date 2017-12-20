import React from 'react'
import { Link } from 'react-static'
import { Avatar, Flex, Box, Heading, Lead } from 'rebass'
import CTA from './CTA'
import { shuffle, range, sample } from 'lodash'
import { mx, mm } from '../theme'

const Root = Flex.extend.attrs({
  justify: 'center',
  align: 'center',
  pt: 3,
  px: [0, 3]
})`
  position: relative;
  min-height: 32rem;
  max-height: 72rem;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`

const Fill = Flex.extend.attrs({ justify: 'space-around', wrap: true })`
  position: absolute;
  top: 0;
  z-index: -1;
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
  ${mm[1]} {
    max-width: 72px;
    max-height: 72px;
    margin: 0.25em;
  }
`

const Cloud = Box.extend`
  margin: auto;
  border-radius: 4rem;
  box-shadow: 0 0 2rem 4rem rgba(252, 252, 252, 0.95);
  background-color: rgba(252, 252, 252, 0.95);
  text-align: center;
  position: relative;
  z-index: 2;
  @media (min-height: 24em) {
    box-sizing: content-box;
    border-radius: 8rem;
    box-shadow: 0 0 4rem 4rem rgba(252, 252, 252, 0.95);
    max-width: 32rem;
    padding: 0 1rem;
    top: -2rem;
  }
`

const Mantra = Lead.extend.attrs({
  f: [4, 5],
  color: 'accent',
  mx: 'auto',
  bold: true
})`
  line-height: 1.125;
  text-transform: uppercase;
`
const Title = Heading.extend.attrs({
  is: 'h1',
  f: [6, 7],
  color: 'primary',
  mx: 'auto',
  mt: 2,
  mb: 3
})`line-height: 1;`
const Description = Heading.extend.attrs({
  f: [3, 4],
  color: 'gray.9',
  mx: 'auto'
})`
  font-weight: normal;
  line-height: 1.5;
`

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
      <Mantra>
        By the students,
        <br />
        for the students.
      </Mantra>
      <Title>
        High school
        <br />
        coding clubs.
      </Title>
      <Description>
        Hack Club is a nonprofit network of free student-led coding clubs where
        high schoolers learn to code by building things.
      </Description>
      <Flex justify="center" wrap mx={-2} mt={4}>
        <CTA href="/donate" bg="white" color="primary">
          Donate
        </CTA>
        <CTA to="/start">Learn More</CTA>
      </Flex>
    </Cloud>
  </Root>
)

export default Bubbles
