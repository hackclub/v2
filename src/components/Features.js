import React from 'react'
import { Heading, Container, Flex, Box, Text, Subhead } from 'rebass'
import Icon from './Icon'
import { colors, mx, mm } from '../theme'

const Base = Container.extend.attrs({ px: 3, my: 4, maxWidth: 72 * 16 })``
const Feats = Box.extend`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  ${mx[1]} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
`
const Feat = Box.extend.attrs({ p: 3 })`
  border-radius: .5rem;
  text-align: left;
  p { line-height: 1.5; }
`
const Feature = ({ icon, name, desc, ...props }) => (
  <Feat {...props}>
    <Icon name={icon} fill="white" size={48} mx="auto" />
    <Box mt={2}>
      <Subhead color="white" f={4} mb={1} children={name} />
      <Text f={3} color="white" children={desc} />
    </Box>
  </Feat>
)

export default ({ headline = true, ...props }) => (
  <Base id="features" {...props}>
    {headline && (
      <Heading
        color="primary"
        f={[5, 6]}
        align="center"
        mb={4}
        children="Start a club with all our resources."
      />
    )}
    <Feats>
      <Feature
        bg="success"
        icon="line_weight"
        name="Starter materials"
        desc="Get going faster with curricula, leadership guidelines, and club suggestions."
      />
      <Feature
        bg="accent"
        icon="question_answer"
        name="A community that cares"
        desc="You and your club members will meet like-minded students from around the world in our Slack."
      />
      <Feature
        bg="primary"
        icon="live_help"
        name="Coaching and assistance"
        desc="You‘ll get regular mentorship through office hours and calls for help where it counts."
      />
    </Feats>
  </Base>
)
