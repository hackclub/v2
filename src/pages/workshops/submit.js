import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import metadataParser from 'markdown-yaml-metadata-parser'
import { Box, Badge, Text, Divider, theme } from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'

import storage from '../../storage'
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

  > div {
    height: 100%;
    color: ${theme.colors.black};
    /* background-image: linear-gradient(
      ${theme.colors.smoke} 30%,
      ${theme.colors.white} 30% 100%
    ); */
  }
`

const Editor = styled.textarea`
  border: 0;
  outline: 0;
  font-family: ${theme.mono};
  font-size: ${theme.fontSizes[2]}px;
  width: 100%;
  height: 100%;
  background: none;
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: storage.get('Get-started-with-React-Hooks').body || ''
    }
  }

  handleInputChange = e => {
    const data = {
      body: this.state.value
    }

    try {
      storage.set('Get-started-with-React-Hooks', data)
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
              placeholder="Write your *markdown* here..."
              value={value}
              onChange={this.handleInputChange}
            />
          </Sheet>
          <Sheet p={5}>
            <MarkdownBody>
              <ReactMarkdown source={value} />
            </MarkdownBody>
          </Sheet>
        </TwoColumn>
      </Fragment>
    )
  }
}
