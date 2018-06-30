import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { Box, Link as A } from '@hackclub/design-system'
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

const Body = Box.extend`
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
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  ol,
  ul {
    padding-left: ${props => props.theme.space[3]}px;
  }

  p,
  li {
    margin-top: ${props => props.theme.space[2]}px;
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  hr {
    border: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.muted};
    margin: ${props => props.theme.space[3]}px;
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
      .then(md => {
        this.setState({
          content: md,
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
