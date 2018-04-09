// via https://github.com/withspectrum/spectrum/blob/alpha/shared/draft-utils.js

export const EditorState = require('draft-js/lib/EditorState')
export const ContentState = require('draft-js/lib/ContentState')
export const convertFromRaw = require('draft-js/lib/convertFromRawToDraftState')
export const convertToRaw = require('draft-js/lib/convertFromDraftStateToRaw')

export const toPlainText = editorState =>
  editorState.getCurrentContent().getPlainText()

export const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: []
    }
  ]
})

export const fromPlainText = text => {
  if (!text || text === '')
    return EditorState.createWithContent(emptyContentState)
  return EditorState.createWithContent(ContentState.createFromText(text))
}

export const toJSON = editorState =>
  convertToRaw(editorState.getCurrentContent())

export const toState = json =>
  EditorState.createWithContent(convertFromRaw(json))
