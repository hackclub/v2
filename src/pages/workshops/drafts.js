import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'
import orderBy from 'lodash/orderBy'
import { Transition } from 'react-spring'

import storage from 'storage'
import api from 'api'
import BG from 'components/BG'
import Nav from 'components/Nav'
import IconButton from 'components/IconButton'
import Sheet from 'components/Sheet'
import MarkdownBody from 'components/MarkdownBody'
import Auth from 'components/Auth'
import CreateModal from 'components/workshops/editor/CreateModal'
import EmptyDrafts from 'components/workshops/editor/EmptyDrafts'

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
      display: none !important;
    `};

  svg {
    transform: rotate(45deg);
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
    transform: rotate(180deg);
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

  code {
    font-size: 14px;
  }
`

const Left = styled(Box)`
  max-width: 85%;
`

const truncate = (str, length) => {
  const dots = str.length > length ? '…' : ''
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
      newName: '',
      newDesc: '',
      user: null,
      authed: false,
      authData: {}
    }
  }

  componentDidMount() {
    api
      .get(`v1/users/current`)
      .then(authData => {
        console.log(
          `User is authorized! Auth data: ${JSON.stringify(authData)}`
        )
        this.setState({ authed: true, authData })
      })
      .catch(error => {
        console.log(`User is not authorized! Error: ${error.toString()}`)
        this.setState({ authed: false, authData: {} })
      })
  }

  beginCreation = () => this.setState({ ordered: [], creating: true })

  cancelCreation = () =>
    this.setState({ ordered: this.state.cacheDrafts, creating: false })

  handleNewNameChange = e => this.setState({ newName: e.target.value })

  handleNewDescChange = e => this.setState({ newDesc: e.target.value })

  createDraft = () => {
    const slug = 'draft-' + this.state.newName.replace(/ /g, '-')

    storage.set(slug, {
      body: '',
      edited: new Date() / 1000,
      description: this.state.newDesc
    })

    window.location = `/workshops/submit?id=${slug}`
  }

  render() {
    const { ordered, creating, newName, newDesc, authed } = this.state

    return (
      <Fragment>
        <BG color="snow" /> <Nav color="black" />
        <Box p={4} pt={[6, 7]}>
          {authed ? (
            <Container maxWidth={42} style={{ width: '100%' }}>
              <Flex>
                <Add
                  onClick={this.beginCreation}
                  creating={creating}
                  glyph="view-close-small"
                  bg="success"
                  mx="auto"
                  mb={4}
                >
                  Create workshop
                </Add>
              </Flex>
              {creating && (
                <CreateModal
                  transitionStyle={null}
                  cancelCreation={this.cancelCreation}
                  newName={newName}
                  handleNewNameChange={this.handleNewNameChange}
                  newDesc={newDesc}
                  handleNewDescChange={this.handleNewDescChange}
                  createDraft={this.createDraft}
                />
              )}
              <Transition
                items={ordered}
                keys={draft => draft.slug}
                from={{ opacity: 0, transform: 'translate3d(0, 128px, 0)' }}
                enter={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                leave={{ opacity: 0, transform: 'translate3d(0, 128px, ,0)' }}
              >
                {draft => props => (
                  <Link
                    to={`/workshops/submit?id=${draft.slug}`}
                    key={draft.slug}
                  >
                    <Card style={props}>
                      <Flex align="center">
                        <Left>
                          <Heading.h3 fontSize={[3, 4]}>
                            {draft.name}
                          </Heading.h3>
                          <MarkdownBody>
                            <Text color="muted" style={{ lineHeight: 1.2 }}>
                              <ReactMarkdown
                                source={truncate(draft.body, 64)}
                              />
                            </Text>
                          </MarkdownBody>
                        </Left>
                        <Icon size={32} color="black" glyph="view-back" />
                      </Flex>
                    </Card>
                  </Link>
                )}
              </Transition>
              {ordered.length === 0 && !creating && <EmptyDrafts />}
            </Container>
          ) : (
            <Auth />
          )}
        </Box>
      </Fragment>
    )
  }
}
