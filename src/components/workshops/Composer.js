import React, { Component, Fragment } from 'react'
import { Input } from '@hackclub/design-system'
import MarkdownBody from 'components/MarkdownBody'
import Editor from 'draft-js-plugins-editor'
import { EditorState } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'
import { toJSON, toState } from './draft-utils'
import { debounce } from 'lodash'
import storage from 'storage'

const plugins = [
  createMarkdownPlugin(),
  createPrismPlugin({
    prism: Prism
  }),
  createCodeEditorPlugin()
]

const LS_BODY_KEY = 'new-workshop-body'
const LS_NAME_KEY = 'new-workshop-name'

class Composer extends Component {
  state = {
    name: '',
    body: EditorState.createEmpty(),
    plugins
  }

  constructor(props) {
    super(props)
    this.persistNameToLocalStorageWithDebounce = debounce(
      this.persistNameToLocalStorage,
      128
    )
    this.persistBodyToLocalStorageWithDebounce = debounce(
      this.persistBodyToLocalStorage,
      512
    )
  }

  componentDidMount = () => setTimeout(this.initializeData, 128)

  initializeData = () => {
    let storedBody
    let storedName
    if (localStorage) {
      try {
        storedBody = toState(
          JSON.parse(localStorage.getItem(LS_BODY_KEY) || '')
        )
        storedName = localStorage.getItem(LS_NAME_KEY)
      } catch (err) {
        localStorage.removeItem(LS_BODY_KEY)
        localStorage.removeItem(LS_NAME_KEY)
      }
    }

    this.setState({
      name: this.state.name || storedName || '',
      body: this.state.body || storedBody || ''
    })
  }

  changeName = e => {
    const name = e.target.value
    this.persistNameToLocalStorageWithDebounce(name)
    if (/\n$/g.test(name)) {
      this.bodyEditor.focus()
      return
    }
    this.setState({ name })
  }

  changeBody = body => {
    this.persistBodyToLocalStorageWithDebounce(body)
    this.setState({ body })
  }

  clearEditorStateAfterSubmit = () => {
    try {
      localStorage.removeItem(LS_BODY_KEY)
      localStorage.removeItem(LS_NAME_KEY)
    } catch (err) {
      console.error(err)
    }
  }

  persistNameToLocalStorage = name => {
    return localStorage.setItem(LS_NAME_KEY, this.state.name)
  }

  persistBodyToLocalStorage = body => {
    // console.log(JSON.stringify(toJSON(this.state.body)))
    return localStorage.setItem(
      LS_BODY_KEY,
      JSON.stringify(toJSON(this.state.body))
    )
  }

  render() {
    const { saved, body } = this.state
    return (
      <MarkdownBody>
        <Input
          onChange={this.changeName}
          value={this.state.name}
          ref={ref => (this.nameTextarea = ref)}
          autoFocus
          aria-label="Title your workshop"
          placeholder="Getting Started with React.js"
          fontSize={5}
          style={{
            borderWidth: 0,
            paddingLeft: 0,
            fontWeight: 'bold',
            maxWidth: '100%'
          }}
        />
        <Editor
          editorState={body}
          onChange={this.changeBody}
          editorRef={editor => (this.bodyEditor = editor)}
          plugins={this.state.plugins}
          spellCheck={true}
          autoCapitalize="sentences"
          autoComplete="on"
          autoCorrect="on"
          stripPastedStyles={true}
          placeholder="Write in Markdown…"
        />
      </MarkdownBody>
    )
  }
}

export default Composer
