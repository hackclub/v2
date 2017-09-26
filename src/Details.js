import React from 'react'
import { Flex, Card, Subhead, Text } from 'rebass'
import { url } from './Icon'
import { geo, brand, wk, mx } from './theme'

const tilt = n =>
  wk(
    `clip-path: polygon(100% 0%, 100% 0%, 100% ${n}%, 0% 100%, 0 ${100 - n}%);`
  )
const Background = Flex.extend.attrs({
  direction: ['column', 'row'],
  justify: 'center',
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

const Base = Card.extend.attrs({ p: 4, w: [1, 0.5], my: 2, mx: [null, 3] })`
  max-width: 26rem;
  border-radius: .5rem;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
  background-repeat: no-repeat;
  background-position: top .75rem right 1rem,
                       top .75rem left 1rem,
                       bottom .75rem left 1rem,
                       bottom .75rem right 1rem;
`

const ppl = url('people', 48, 'gray.0')
const About = Base.extend`
  background-image: url(${ppl}), url(${ppl}), url(${ppl}), url(${ppl});
`

const hack = url('code', 48, 'gray.0')
const Hacking = Base.extend`
  background-image: url(${hack}), url(${hack}), url(${hack}), url(${hack});
`

const Question = Subhead.extend.attrs({
  mt: 0,
  mb: 3,
  caps: true,
  f: 2,
  color: 'slate'
})``
const Answer = Text.extend.attrs({ my: 0, f: 2, color: 'silver' })``

const Details = props => (
  <Background {...props}>
    <About>
      <Question>Who are you?</Question>
      <Answer>
        We’re a San Francisco-based nonprofit. We provide clubs with curriculum,
        guidelines, help, a global community of club leaders, and more.
      </Answer>
    </About>
    <Hacking>
      <Question>Hacking?!</Question>
      <Answer>
        When we say "hack", we're referring to solving problems with code. We're
        making apps, games, and websites—not breaking into bank accounts.
      </Answer>
    </Hacking>
  </Background>
)

export default Details
