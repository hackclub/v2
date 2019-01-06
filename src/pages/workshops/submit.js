import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import metadataParser from 'markdown-yaml-metadata-parser'
import { Box, Badge, Text, Divider, theme } from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'

import BG from '../../components/BG'
import Sheet from '../../components/Sheet'
import MarkdownBody from '../../components/MarkdownBody'

const TwoColumn = styled(Box).attrs({
  p: 5
})`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.space[5]}px;
  min-height: 100vh;

  div {
    height: 100%;
    color: ${theme.colors.black};
  }
`

const Editor = styled.textarea`
  border: 0;
  font-size: ${theme.fontSizes[2]}px;
  width: 100%;
  height: 100%;
`

const fill = `---
name: Get started with React Hooks
---

In *this* workshop...
`
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: fill,
      content: 'In *this* workshop...',
      name: 'Get started with React Hooks',
      description: ''
    }
  }

  handleInputChange = e => {
    try {
      const parsed = metadataParser(e.target.value)

      try {
        const { name, description } = parsed.metadata

        this.setState({
          content: parsed.content || this.state.content,
          name: name || '',
          description: description || ''
        })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }

    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state

    return (
      <Fragment>
        <BG color="snow" />
        <TwoColumn>
          <Sheet p={5}>
            <Editor
              placeholder="Write your *markdown* here"
              value={this.state.value}
              onChange={this.handleInputChange}
            />
          </Sheet>
          <Sheet p={5}>
            {this.state.name && (
              <Badge bg="smoke" color="slate">
                {this.state.name}
              </Badge>
            )}
            <Text>{this.state.description}</Text>
            <Divider />
            <MarkdownBody>
              <ReactMarkdown source={this.state.content} />
            </MarkdownBody>
          </Sheet>
        </TwoColumn>
      </Fragment>
    )
  }
}
