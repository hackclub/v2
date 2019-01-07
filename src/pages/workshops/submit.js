import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {
  Heading,
  Box,
  Flex,
  Icon,
  Text,
  IconButton as IconDot,
  theme,
  mediaQueries
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'

import search from '../../search'
import storage from '../../storage'
import BG from '../../components/BG'
import Sheet from '../../components/Sheet'
import MarkdownBody from '../../components/MarkdownBody'
import IconButton from '../../components/IconButton'

const TwoColumn = styled(Box).attrs({
  p: 5
})`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${theme.space[5]}px;
  min-height: 100vh;

  ${mediaQueries.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  > div {
    height: 100%;
    color: ${theme.colors.black};
  }

  > div:first-child {
    display: ${props => (props.view === 'edit' ? 'block' : 'none')};
  }

  > div:nth-child(2) {
    display: ${props => (props.view === 'edit' ? 'none' : 'block')};

    ${mediaQueries.lg} {
      display: block;
    }
  }
`

const Toggle = styled(IconDot)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.3;
  display: block;

  ${mediaQueries.lg} {
    display: none;
  }
`

const Editor = styled.textarea`
  border: 0;
  outline: 0;
  font-family: ${theme.mono};
  font-size: 18px;
  width: 100%;
  height: 100%;
  background: none;
`

const ErrorContainer = styled(Flex).attrs({
  bg: 'snow',
  align: 'center',
  justify: 'center'
})`
  min-height: 100vh;

  div {
    height: fit-content;
    max-width: 42rem;
  }

  a {
    svg {
      transform: rotate(180deg);
    }
  }
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'edit',
      name: search.get('id') || '',
      value:
        (storage.get(search.get('id')) && storage.get(search.get('id')).body) ||
        ''
    }
  }

  componentDidMount() {
    Prism.highlightAll()
  }

  componentDidUpdate() {
    Prism.highlightAll()
  }

  handleInputChange = e => {
    const data = {
      body: e.target.value,
      edited: new Date() / 1000
    }

    try {
      storage.set(this.state.name, data)
    } catch (error) {
      console.log(error)
    }

    this.setState({ value: e.target.value })
  }

  toggleView = () =>
    this.setState({ view: this.state.view === 'edit' ? 'preview ' : 'edit' })

  render() {
    const { view, name, value } = this.state

    return (
      <Fragment>
        <BG color="snow" />
        {storage.keys().includes(name) ? (
          <TwoColumn view={view}>
            <Sheet p={5}>
              <Toggle
                bg="slate"
                circle
                glyph="view"
                onClick={this.toggleView}
              />
              <Editor
                autoFocus
                autoCorrect
                autoCapitalize
                autoComplete
                placeholder="Write your *markdown* here..."
                value={value}
                onChange={this.handleInputChange}
              />
            </Sheet>
            <Sheet p={5}>
              <Toggle
                bg="slate"
                circle
                glyph="view"
                onClick={this.toggleView}
              />
              <p>
                Name: {this.state.name.replace(/-/g, ' ').replace('draft', '')}
              </p>
              <MarkdownBody>
                <ReactMarkdown source={value} />
              </MarkdownBody>
            </Sheet>
          </TwoColumn>
        ) : (
          <ErrorContainer>
            <Sheet mx={4}>
              <Icon glyph="important" size={64} />
              <Text fontSize={4} bold>
                We had trouble loading this workshop.
              </Text>
              <Text fontSize={3} color="muted">
                It may be private, or may have been deleted by an author or
                moderator.
              </Text>
              <Link to="/workshops/drafts">
                <IconButton glyph="enter" mt={4}>
                  Back to drafts
                </IconButton>
              </Link>
            </Sheet>
          </ErrorContainer>
        )}
      </Fragment>
    )
  }
}
