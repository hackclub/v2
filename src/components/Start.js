import React from 'react'
import { Flex, Heading, Subhead, Column } from 'rebass'
import CTA from './CTA'
import { url } from './Icon'
import { geo, brand, wk, mx } from '../theme'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)

const Background = Flex.extend.attrs({
  direction: ['column', null, 'row'],
  justify: 'space-around',
  align: 'center',
  w: 1,
  bg: 'primary'
})`
  ${geo(brand.primary)};
  padding-top: 4rem;
  padding-bottom: 4rem;
  ${tilt(90)}
  ${mx[2]} {
    padding-top: 6rem;
    padding-bottom: 6rem;
    ${tilt(80)}
  }
`

const Large = Heading.extend.attrs({
  is: 'h2',
  f: 6,
  mt: 0,
  mb: 2,
  color: 'white'
})`line-height: 1.25;`
const Description = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 1,
  color: 'white'
})`
  font-weight: normal;
  line-height: 1.5;
  opacity: .9;
`

const Left = Column.extend`
  ${mx[2]} {
    text-align: right;
  }
`
const Right = Column.extend`
  text-align: left;
`

const Start = props => (
  <Background {...props}>
    <Left>
      <Large>Start a Hack Club</Large>
      <Description>Build the class you wish you could take.</Description>
      <Description mb={0}>Bring the movement to your school.</Description>
    </Left>
    <Right>
      <CTA
        m={0}
        bg="white"
        color="primary"
        href="https://hackclub.com/start"
        children="Start a Club »"
      />
    </Right>
    <style children="footer{margin-top:-5rem;padding-top:8rem !important}" />
  </Background>
)

export default Start
