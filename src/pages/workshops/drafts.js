import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import {
  Container,
  Flex,
  Field,
  Box,
  Heading,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'
import orderBy from 'lodash/orderBy'
import { Transition } from 'react-spring'

import storage from '../../storage'
import BG from '../../components/BG'
import IconButton from '../../components/IconButton'
import Sheet from '../../components/Sheet'
import FeatherIcon from '../../components/FeatherIcon'

const Add = styled(IconButton)`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.cyan[5]},
    ${theme.colors.teal[6]},
    ${theme.colors.green[7]}
  );
  ${props =>
    props.creating &&
    css`
      background-image: radial-gradient(
        ellipse farthest-corner at top left,
        ${theme.colors.silver},
        ${theme.colors.slate}
      );
    `};

  svg {
    ${props =>
      !props.creating &&
      !props.noTilt &&
      css`
        transform: rotate(45deg);
      `};
  }
`

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

export default class extends Component {
  constructor(props) {
    super(props)

    const drafts = storage.keys().map(key => {
      const data = storage.get(key)

      return {
        slug: key,
        name: key.replace(/-/g, ' '),
        ...data
      }
    })

    const ordered = orderBy(drafts, ['edited'], ['desc'])

    this.state = {
      ordered,
      cacheDrafts: ordered,
      creating: false,
      newName: ''
    }
  }

  beginCreation = () => this.setState({ ordered: [], creating: true })

  cancelCreation = () =>
    this.setState({ ordered: this.state.cacheDrafts, creating: false })

  handleNewNameChange = e => this.setState({ newName: e.target.value })

  createPost = () => {
    const slug = this.state.newName.replace(/ /g, '-')

    storage.set(slug, { body: '' })

    window.location = `/workshops/submit?id=${slug}`
  }

  render() {
    const { ordered, creating, newName } = this.state

    return (
      <Fragment>
        <BG color="snow" />
        <Container maxWidth={42} p={4}>
          <Flex>
            <Add
              onClick={creating ? this.cancelCreation : this.beginCreation}
              creating={creating}
              glyph="view-close-small"
              bg="success"
              mx="auto"
              mb={4}
            >
              {creating ? 'Cancel' : 'Create post'}
            </Add>
          </Flex>
          <Transition
            config={{ duration: 0 }}
            items={creating}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {creating =>
              creating &&
              (props => (
                <Sheet style={props}>
                  <Flex align="center" mb={4}>
                    <Icon color="success" size={48} glyph="idea" mr={2} />
                    <Text fontSize={4} bold>
                      <Text.span color="success">Create</Text.span> a workshop
                      here.
                    </Text>
                  </Flex>
                  <Field
                    name="name"
                    label="What are we learning?"
                    placeholder="Getting started with React Hooks"
                    value={newName}
                    onChange={this.handleNewNameChange}
                  />

                  <Add
                    disabled={newName === ''}
                    onClick={this.createPost}
                    bg="success"
                    mt={4}
                    glyph="markdown"
                    noTilt
                  >
                    Start writing
                  </Add>
                </Sheet>
              ))
            }
          </Transition>
          <Transition
            items={ordered}
            keys={draft => draft.slug}
            from={{ opacity: 0, transform: 'translate3d(0, 128px, 0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            leave={{ opacity: 0, transform: 'translate3d(0, 128px, ,0)' }}
          >
            {draft => props => (
              <Link to={`/workshops/submit?id=${draft.slug}`} key={draft.slug}>
                <Card style={props}>
                  <Flex align="center">
                    <Left>
                      <Heading.h3 fontSize={[3, 4]}>{draft.name}</Heading.h3>
                      <Text color="muted">
                        <ReactMarkdown source={truncate(draft.body, 64)} />
                      </Text>
                      <Text color="muted">{draft.edited}</Text>
                    </Left>
                    <FeatherIcon glyph="edit-3" />
                  </Flex>
                </Card>
              </Link>
            )}
          </Transition>
        </Container>
      </Fragment>
    )
  }
}
