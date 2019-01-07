import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Container, Flex, Box, Heading, Text } from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'

import storage from '../../storage'
import BG from '../../components/BG'
import Sheet from '../../components/Sheet'
import FeatherIcon from '../../components/FeatherIcon'

const Card = styled(Sheet)`
  cursor: pointer;

  > div {
    justify-content: space-between;
    text-align: left;
  }

  p {
    margin: 0;
  }

  svg {
    display: none;
    @media (hover: none) {
      display: block;
    }
  }

  &:hover {
    svg {
      display: block;
    }
  }
`

const Left = styled(Box)`
  max-width: 85%;
`

const truncate = (str, length) => {
  const dots = str.length > length ? '...' : ''
  return str.substring(0, length) + dots
}

export default () => (
  <Fragment>
    <BG color="snow" />
    <Container maxWidth={42} p={4}>
      {storage.keys().map(key => (
        <Link to="/workshops/submit">
          <Card>
            <Flex align="center">
              <Left>
                <Heading.h3 fontSize={[3, 4]}>
                  {key.replace(/-/g, ' ')}
                </Heading.h3>
                <Text color="muted">
                  <ReactMarkdown source={truncate(storage.get(key).body, 64)} />
                </Text>
              </Left>
              <FeatherIcon glyph="edit-3" />
            </Flex>
          </Card>
        </Link>
      ))}
    </Container>
  </Fragment>
)
