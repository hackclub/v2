import React from 'react'
import { Heading, Container, Flex, Box, Text, Subhead } from 'rebass'
import Icon from './Icon'
import { colors, mx, mm } from '../theme'

const Base = Container.extend.attrs({ px: 3, my: 4, maxWidth: 72 * 16 })``
const Feats = Flex.extend.attrs({ direction: ['column', 'row'] })``
const Feat = Container.extend.attrs({
  p: 3,
  m: [2, 3],
  w: [1, 1 / 3],
  maxWidth: 22 * 16
})`
  border-radius: .5rem;
  display: inline-block;
  text-align: left;
  p { line-height: 1.5; }
`
const Feature = ({ icon, alt, name, desc, ...props }) => (
  <Feat {...props}>
    <Icon name={icon} alt={alt} fill="white" size={48} mx="auto" />
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
        icon="description"
        alt="Documentation icon"
        name="Starter materials"
        desc="Take off with curricula, guidelines, and leadership suggestions."
      />
      <Feature
        bg="accent"
        icon="question_answer"
        alt="Chat icon"
        name="A community that cares"
        desc="Meet like-minded students from around the world in our Slack."
      />
      <Feature
        bg="primary"
        icon="live_help"
        alt="Help icon"
        name="Coaching and assistance"
        desc="Get regular mentorship where it counts via office hours and calls."
      />
    </Feats>
  </Base>
)
