import React, { Component } from 'react'
import MarkdownBody from 'components/MarkdownBody'
import QuotedComment from 'components/challenge/QuotedComment'
import { commentStyle } from 'components/challenge/style'
import Editor from 'draft-js-plugins-editor'
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter'
import { isEmpty } from 'lodash'
import styled from 'styled-components'

const features = {
  inline: ['BOLD', 'ITALIC', 'CODE', 'STRIKETHROUGH', 'LINK', 'IMAGE'],
  block: ['CODE', 'ordered-list-item', 'unordered-list-item', 'blockquote']
}

const plugins = [createMarkdownPlugin({ features }), createCodeEditorPlugin()]

export const LS_BODY_KEY = 'new-comment'

const Root = MarkdownBody.extend`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.smoke};
  border-radius: 18px;
  padding: ${({ theme }) => theme.space[1]}px;

  .DraftEditor-root {
    position: relative;
  }

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
    top: 3px;
    padding-left: 12px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: ${({ theme }) => theme.fontSizes[1]}px;
  }

  .DraftEditor-editorContainer > div {
    padding: ${({ theme }) => theme.space[1]}px
      ${({ theme }) => theme.space[3] - theme.space[1]}px;
    ${commentStyle};
  }
`

class Composer extends Component {
  state = {
    body: EditorState.createEmpty(),
    plugins
  }

  componentDidMount() {
    let value = ''
    if (localStorage) {
      try {
        value = localStorage.getItem(LS_BODY_KEY)
      } catch (err) {
        localStorage.removeItem(LS_BODY_KEY)
      }
    }
    if (!isEmpty(value)) {
      const raw = mdToDraftjs(value)
      const body = EditorState.createWithContent(convertFromRaw(raw))
      this.setState({ body })
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    // after submit, reset value
    if (nextProps.clear) {
      return { body: EditorState.createEmpty() }
    } else {
      return {}
    }
  }

  onChange = body => {
    const raw = convertToRaw(body.getCurrentContent())
    const md = draftjsToMd(raw)
    this.props.onChange('body', md)
    if (typeof localStorage !== 'undefined') this.persistData(md)
    this.setState({ body })
    if (this.props.clear && this.editor) this.triggerFocus()
  }

  triggerFocus = () => {
    setTimeout(() => {
      this.editor && this.editor.focus()
    }, 0)
  }

  persistData = next => {
    try {
      const stored = localStorage.getItem(LS_BODY_KEY)
      if (isEmpty(next) && !isEmpty(stored)) {
      } else {
        localStorage.setItem(LS_BODY_KEY, next)
      }
    } catch (err) {
      localStorage.removeItem(LS_BODY_KEY)
    }
  }

  render() {
    const { parent, onUnparent, ...props } = this.props
    return (
      <Root>
        {parent && (
          <QuotedComment
            data={parent}
            onDelete={onUnparent}
            bg="snow"
            pb={3}
            p={2}
          />
        )}
        <Editor
          editorState={this.state.body}
          plugins={this.state.plugins}
          spellCheck={true}
          autoCapitalize="sentences"
          autoComplete="on"
          autoCorrect="on"
          stripPastedStyles={true}
          name="body"
          placeholder="Add your comment…"
          editorRef={editor => (this.editor = editor)}
          {...props}
          onChange={this.onChange}
        />
      </Root>
    )
  }
}

export default Composer
