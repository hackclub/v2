import React, { Component } from 'react'
import MarkdownBody from 'components/MarkdownBody'
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

const features = {
  inline: ['BOLD', 'ITALIC', 'CODE', 'STRIKETHROUGH', 'LINK', 'IMAGE'],
  block: ['CODE', 'ordered-list-item', 'unordered-list-item', 'blockquote']
}

const plugins = [createMarkdownPlugin({ features }), createCodeEditorPlugin()]

export const LS_BODY_KEY = 'new-comment'

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
    if (nextProps.clear && prevState.body !== EditorState.createEmpty()) {
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
    return (
      <MarkdownBody>
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
          {...this.props}
          onChange={this.onChange}
        />
      </MarkdownBody>
    )
  }
}

export default Composer
