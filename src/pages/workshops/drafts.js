import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Container, Flex, Heading } from '@hackclub/design-system'

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

const Name = styled(Heading.h3).attrs({
  fontSize: [3, 4]
})`
  max-width: 85%;
`

export default () => (
  <Fragment>
    <BG color="snow" />
    <Container maxWidth={42} p={4}>
      {storage.keys().map(key => (
        <Link to="/workshops/submit">
          <Card>
            <Flex align="center">
              <Name>{key.replace(/-/g, ' ')}</Name>
              <FeatherIcon glyph="edit-3" />
            </Flex>
          </Card>
        </Link>
      ))}
    </Container>
  </Fragment>
)
