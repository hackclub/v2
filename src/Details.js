import React from 'react'
import { Flex, Heading, Subhead, Column, Button } from 'rebass'
import { url } from './Icon'
import { geo, brand, wk, mx } from './theme'

const tilt = n =>
  wk(
    `clip-path: polygon(100% 0%, 100% 0%, 100% ${n}%, 0% 100%, 0 ${100 - n}%);`
  )
const Background = Flex.extend.attrs({
  direction: ['column', 'row'],
  justify: 'space-around',
  align: 'center',
  w: 1,
  px: 3,
  bg: 'primary'
})`
  ${geo(brand.primary)}
  padding-top: 3rem;
  padding-bottom: 3rem;
  ${tilt(95)}
  ${mx[1]} {
    padding-top: 6rem;
    padding-bottom: 6rem;
    ${tilt(80)}
  }
`

const BodyHeading = Heading.extend.attrs({
  is: 'h2',
  f: 5,
  mt: 4,
  mb: 2,
  color: 'white'
})`line-height: 1.25;`
const Description = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 1,
  color: 'smoke'
})`
  font-weight: normal;
  line-height: 1.5;
`

const CTA = Button.extend.attrs({
  is: 'a',
  bg: 'white',
  color: 'primary',
  f: 4,
  py: 3,
  px: 4,
  mx: 2
})`
  box-shadow: 0 2px 8px rgba(0, 0, 0, .25);
  transition: .1s box-shadow ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, .25);
  }
`

const Left = Column.extend.attrs({ mt: 3 })`text-align: right;`
const Right = Column.extend.attrs({ mt: 3 })`text-align: left;`

const Details = props => (
  <Background {...props}>
    <Left>
      <BodyHeading f={6} mt={0}>
        Start a Hack Club
      </BodyHeading>
      <Description>Build the class you wish you could take.</Description>
      <Description mb={0}>Bring the movement to your school.</Description>
    </Left>
    <Right>
      <CTA href="https://hackclub.com/start">Start a Club »</CTA>
    </Right>
  </Background>
)

export default Details
