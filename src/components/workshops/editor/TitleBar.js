import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
  Flex,
  IconButton,
  Text,
  Button,
  theme,
  mediaQueries,
  hexa
} from '@hackclub/design-system'
import Link from 'gatsby-link'

import MetaModal from './MetaModal'

const Base = styled(Flex)`
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: ${theme.boxShadows[0]};

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1;
    cursor: pointer;

    ${mediaQueries.sm} {
      transition: ${theme.transition};
      background-image: linear-gradient(
        180deg,
        transparent 65%,
        ${hexa('red.3', 0.75)} 0
      );

      &:hover {
        background-image: linear-gradient(
          180deg,
          transparent 50%,
          ${hexa('red.3', 0.75)} 0
        );
      }
    }
  }

  a:nth-of-type(2) {
    background-color: ${hexa('info', 0.2)} !important;
    color: ${theme.colors.info};
  }
`

export default class extends Component {
  state = { active: false }

  toggleModal = () => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const { active } = this.state
    const { name, description } = this.props

    return (
      <Fragment>
        <MetaModal
          active={active}
          toggleModal={this.toggleModal}
          name={name}
          description={description}
        />
        <Base p={3} align="center" justify="space-between">
          <Link to="/workshops/drafts">
            <IconButton
              glyph="view-back"
              bg="smoke"
              color="black"
              circle
              p={1}
              style={{ opacity: 0.7 }}
            />
          </Link>
          <Text onClick={this.toggleModal} fontSize={[2, 3]} bold mx={3}>
            {name}
          </Text>
          <Button bg="info" scale>
            Publish
          </Button>
        </Base>
      </Fragment>
    )
  }
}
