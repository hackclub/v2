import React from 'react'
import { Avatar, Flex, Box } from 'rebass'
import { random, sample } from 'lodash'

const Bubble = ({ src, ...props }) => (
  <Avatar size={sample([16, 32, 48, 64])} src={src} m={sample([1, 2])} />
)

const Bubbles = () => (
  <Bubble src="https://ca.slack-edge.com/T0266FRGM-U0266FRGP-bfe9aa82f6b1-128" />
)

export default Bubbles
