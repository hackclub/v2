import React from 'react'
import { Container, Flex, Box, Heading, Image } from 'rebass'
import { mx } from '../theme'
import Stat from './Stat'
import { stats } from '../../data'

const Base = Container.extend.attrs({ maxWidth: 48 * 16 })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -4rem;
  > div {
    border-radius: 3rem;
    flex: 1 1 auto;
    padding: 1rem;
    text-align: center;
  }
  > :first-child {
    z-index: 2;
    h2 { line-height: 1.125; }
  }
  > :last-child {
    flex-flow: row wrap;
    line-height: 1.25;
    margin-top: -1rem;
    max-width: 32rem;
    z-index: 1;
  }
  ${mx[1]} {
    flex-direction: row;
    > div {
      padding: 2rem;
    }
    > :last-child {
      margin-left: -2rem;
    }
  }
`

export default () => (
  <Base>
    <Flex align="center" justify="center" bg="primary">
      <Heading color="white" f={6}>
        United as one. Divided by zero.
      </Heading>
    </Flex>
    <Flex align="center" justify="center" bg="accent">
      <Stat value={stats.school_count} label="schools" />
      <Stat value={stats.country_count} label="countries" />
      <Stat value={stats.state_count} label="states" />
      <Stat value={stats.approximate_members} label="members" />
    </Flex>
  </Base>
)
