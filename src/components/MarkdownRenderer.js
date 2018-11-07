import styled from 'styled-components'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { Box, Link as A, theme } from '@hackclub/design-system'
import api from 'api'

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

const CustomHeading = props => {
  const children = React.Children.toArray(props.children)
  const text = children.reduce(flatten, '')
  const slug = text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z-]/g, '')

  return React.createElement(`h${props.level}`, { id: slug }, props.children)
}

const Body = styled(Box)`
  div > :first-child {
    margin-top: 0 !important;
  }
  div > :last-child {
    margin-bottom: 0 !important;
  }

  h1,
  h2,
  h3 {
    margin-top: 0;
    margin-bottom: ${theme.space[2]}px;
  }

  ol,
  ul {
    padding-left: ${theme.space[3]}px;
  }

  p,
  li {
    margin-top: ${theme.space[2]}px;
    margin-bottom: ${theme.space[2]}px;
  }

  hr {
    border: 0;
    height: 2px;
    background-color: ${theme.colors.muted};
    margin: ${theme.space[3]}px;
    border-radius: 2px;
  }
`

export default class extends Component {
  constructor(props) {
    super(props)

    const { content, path } = props

    this.state = {
      status: content !== undefined ? 'success' : path ? 'loading' : 'error',
      content: content
    }

    const { status } = this.state

    if (status === 'success') {
      return null
    }

    this.setState({
      status: 'loading'
    })

    api
      .get(`v1/repo/${path}`)
      .then(content => {
        this.setState({
          content,
          status: 'success'
        })
      })
      .catch(() => {
        this.setState({ status: 'error' })
      })
  }

  componentDidUpdate(nextProps) {
    if (this.state.content !== nextProps.content) {
      this.setState({ content: nextProps.content })
    }
  }

  render() {
    const { content, renderers } = this.state

    return (
      <Body {...this.props}>
        <ReactMarkdown
          source={content}
          renderers={{ heading: CustomHeading, link: A, ...renderers }}
        />
      </Body>
    )
  }
}
