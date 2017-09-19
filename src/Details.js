import React from 'react'
import { Flex, Subhead, Box, Text } from 'rebass'
import { url } from './Icon'
import { mx, grays } from './theme'

const Base = Box.extend.attrs({ p: 4, w: [1, 0.5], mx: 3 })`
  max-width: 26rem;
  border: 2px dashed ${grays.smoke};
  border-radius: .5rem;
  background-color: ${grays.snow};
  background-repeat: no-repeat;
  background-position: top .75rem right .75rem,
                       top .75rem left .75rem,
                       bottom .75rem left .75rem,
                       bottom .75rem right .75rem;
`

const ppl = url('people', 48, 'gray.1')
const About = Base.extend`
  background-image: url(${ppl}), url(${ppl}), url(${ppl}), url(${ppl});
`

const hack = url('code', 48, 'gray.1')
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
  <Flex mx={-3} justify="center" {...props}>
    <About>
      <Question>Who are you?</Question>
      <Answer>
        We’re a San Francisco-based nonprofit. We provide everything needed to
        start a successful club: curriculum for meetings, guidelines, and a
        global online community of club leaders.
      </Answer>
    </About>
    <Hacking>
      <Question>Hacking?!</Question>
      <Answer>
        When we say "hack", we're referring to solving problems with code. We're
        making apps, games, and websites—not breaking into bank accounts.
      </Answer>
    </Hacking>
  </Flex>
)

export default Details
