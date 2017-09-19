import React from 'react'
import { Subhead, Box, Text } from 'rebass'
import { url } from './Icon'
import { mx, geo, grays } from './theme'

const icon = url('people', 48, 'gray.1')

const Base = Box.extend.attrs({ p: 4 })`
  max-width: 26rem;
  border: 2px dashed ${grays.smoke};
  border-radius: .5rem;
  background-color: ${grays.snow};
  background-image: url(${icon}), url(${icon}), url(${icon}), url(${icon});
  background-repeat: no-repeat;
  background-position: top .75rem right .75rem,
                       top .75rem left .75rem,
                       bottom .75rem left .75rem,
                       bottom .75rem right .75rem;
`

const Question = Subhead.extend.attrs({
  mt: 0,
  mb: 3,
  caps: true,
  f: 2,
  color: 'slate'
})``
const Answer = Text.extend.attrs({ my: 0, f: 2, color: 'silver' })``

const About = props => (
  <Base {...props}>
    <Question>Who are you?</Question>
    <Answer>
      We’re a San Francisco-based nonprofit. We provide everything needed to
      start a successful club: curriculum for meetings, guidelines, and a global
      online community of club leaders.
    </Answer>
  </Base>
)

export default About
