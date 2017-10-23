import React from 'react'
import { Heading, Container, Flex, Box, Text, Subhead } from 'rebass'
import Icon from './Icon'
import { colors, mx, mm } from '../theme'

const Base = Container.extend.attrs({ px: 3, my: 4 })``
const Feats = Box.extend`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  ${mx[1]} {
    grid-template-columns: repeat(3, 1fr);
  }
`
const Feat = Box.extend.attrs({ p: 3 })`
  border-radius: .5rem;
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

export default () => (
  <Base>
    <Heading color="primary" f={6} align="center" mb={3}>
      Start a club with all our resources.
    </Heading>
    <Feats>
      <Feature
        bg="teal.6"
        icon="line_weight"
        name="Starter materials"
        desc="We‘re a community."
      />
      <Feature
        bg="fuschia.5"
        icon="question_answer"
        name="A community that cares"
        desc="We‘re a community."
      />
      <Feature
        bg="primary"
        icon="live_help"
        name="Coaching and assitance"
        desc="We‘re a community."
      />
    </Feats>
  </Base>
)
