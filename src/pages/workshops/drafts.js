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

    const draftKeys = storage
      .keys()
      .filter(key => new RegExp('draft-', 'g').test(key))

    const drafts = draftKeys.map(key => {
      const data = storage.get(key)

      return {
        slug: key,
        name: key.replace(/-/g, ' ').replace('draft', ''),
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
    const slug = 'draft-' + this.state.newName.replace(/ /g, '-')

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
              {creating ? 'Cancel' : 'Create workshop'}
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
                  <Flex align="center" style={{ textAlign: 'left' }} mb={4}>
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
                    </Left>
                    <FeatherIcon glyph="edit-3" />
                  </Flex>
                </Card>
              </Link>
            )}
          </Transition>
          {ordered.length === 0 &&
            !creating && (
              <Box align="right" style={{ maxWidth: 300 }} mx="auto" mt={-5}>
                <svg
                  width="24"
                  height="60"
                  viewBox="0 0 24 60"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.633 6.695c6.86 12.419 11.75 25.539 14.207 39.496.45 2.413.902 4.826 1.107 7.265.145 1.672-.038 3.342-.166 5.012-.077.959-.95 1.611-1.91 1.524-.931-.114-1.702-.83-1.598-1.761.868-6.927-1.14-13.567-2.49-20.258C15.76 28.1 11.985 18.876 6.98 10.166c-.69-1.182-1.464-2.282-2.21-3.409-.165-.22-.357-.413-.605-.66.281 1.48.59 2.879.79 4.277.142 1.124-.456 1.943-1.415 2.02-.958.077-1.592-.666-1.79-1.736C1.44 9.041.968 7.477.576 5.886.407 5.282.213 4.706.1 4.102-.35 1.744.737.271 3.12.037c2.984-.231 5.728.66 8.446 1.797 1.043.444 2.005 1.025 3.021 1.496.577.25 1.208.444 1.811.557 1.07.197 1.814.996 1.71 1.981-.105.986-.896 1.722-1.965 1.524-1.042-.17-2.03-.504-2.991-.92-1.73-.748-3.378-1.634-5.08-2.41-.33-.056-.659-.113-1.153-.28.664 1.1 1.216 1.98 1.714 2.913z"
                    fillrule="evenodd"
                    fill={theme.colors.success}
                  />
                </svg>
                <Text fontSize={4} bold align="center" color="black">
                  It’s looking empty in here.
                </Text>
                <Text fontSize={3} align="center" color="muted">
                  Why not try creating a workshop!
                </Text>
              </Box>
            )}
        </Container>
      </Fragment>
    )
  }
}
