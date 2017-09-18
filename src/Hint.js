import React from 'react'
import { Subhead, Box, Text } from 'rebass'
import { url } from './Icon'
import { mx, geo, grays } from './theme'

const icon = url('code', 48, 'gray.1')

const Base = Box.extend.attrs({
  p: 4,
  w: [1, 2 / 3, 1 / 2],
  mx: 'auto'
})`
  border: 2px dashed ${grays.smoke};
  color: ${grays.silver};
  border-radius: .5rem;
  background-color: ${grays.snow};
  background-image: url(${icon}), url(${icon}), url(${icon}), url(${icon});
  background-repeat: no-repeat;
  background-position: top .75rem right .75rem,
                       top .75rem left .75rem,
                       bottom .75rem left .75rem,
                       bottom .75rem right .75rem;
`

const Question = Subhead.extend.attrs({ mt: 0, mb: 3, caps: true, f: 2 })``
const Answer = Text.extend.attrs({ my: 0, f: 2 })``

const Hint = () => (
  <Base>
    <Question>Hacking?!</Question>
    <Answer>
      When we say "hack", we're referring to solving problems with code. We're
      making apps, games, and websites—not breaking into bank accounts.
    </Answer>
  </Base>
)

export default Hint
