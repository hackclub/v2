import React, { Component } from 'react'
import { Formik } from 'formik'
import api from 'api'
import { AutoSaver, Field } from 'components/Forms'
import { Box, IconButton } from '@hackclub/design-system'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'

Box.form = Box.withComponent('form')

class SingleNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.note.id,
      note: props.note
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(nextProps) {
    if (this.state.id !== nextProps.note.id) {
      this.setState({
        id: nextProps.note.id,
        note: nextProps.note
      })
    }
  }

  deleteNote(id) {
    api.delete(`v1/notes/${id}`).then(json => {
      this.setState({ deleted: true })
    })
  }

  handleSubmit(values, { setSubmitting }) {
    const { modelType, modelId } = this.props
    const { id } = this.state
    if (id) {
      api
        .patch(`v1/notes/${id}`, { data: values })
        .then(() => {
          setSubmitting(false)
        })
        .catch(e => {
          setSubmitting(false)
        })
    } else {
      api
        .post(`v1/${modelType}/${modelId}/notes`, {
          data: values
        })
        .then(json => {
          this.setState({ id: json.id })
          setSubmitting(false)
        })
        .catch(() => {
          setSubmitting(false)
        })
    }
  }

  render() {
    const { id, note, deleted } = this.state

    if (deleted) {
      return null
    } else {
      return (
        <Formik
          initialValues={note}
          enableReinitialize={true}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values
            } = props

            return (
              <Box.form width={1} onSubmit={handleSubmit}>
                <Field
                  name="body"
                  label={`Note from ${values.author}`}
                  onBlur={e => {
                    if (id && values.body === '') {
                      this.deleteNote(id)
                    }
                    handleBlur(e)
                  }}
                  onChange={handleChange}
                  value={values.body}
                  type="textarea"
                  bg="rgba(250,247,133,0.5)"
                  renderMarkdown
                />
                <AutoSaver
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  values={values}
                  saveNotification="underline"
                />
              </Box.form>
            )
          }}
        </Formik>
      )
    }
  }
}

export default class NotesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      status: 'loading',
      authors: {}
    }

    this.addNote = this.addNote.bind(this)
    this.loadNotes = this.loadNotes.bind(this)
  }
  componentDidMount() {
    this.loadNotes(this.props.modelId)
  }
  componentDidUpdate(nextProps) {
    if (this.props.modelId !== nextProps.modelId) {
      this.loadNotes(nextProps.modelId)
    }
  }
  loadNotes(id) {
    const { authors } = this.state
    const { modelType, modelId } = this.props

    this.setState({ notes: [], status: 'loading' })

    api
      .get(`v1/${modelType}/${modelId}/notes`)
      .then(notes => {
        const notesPromises = notes.map(
          note =>
            new Promise((resolve, reject) => {
              const userId = note.user_id
              if (authors[userId]) {
                this.setState(state => ({
                  notes: [...state.notes, { ...note, author: authors[userId] }]
                }))
                resolve()
              } else {
                api
                  .get(`v1/users/${userId}`)
                  .then(user => {
                    authors[userId] = user.email
                    this.setState(state => ({
                      notes: [...state.notes, { ...note, author: user.email }],
                      authors
                    }))
                    resolve()
                  })
                  .catch(err => {
                    reject(err)
                  })
              }
            })
        )
        Promise.all(notesPromises).then(() => {
          this.setState({ status: 'success' })
        })
      })
      .catch(err => {
        this.setState({ status: 'error' })
      })
  }
  addNote() {
    this.setState(state => ({
      notes: [...state.notes, { created_at: new Date() }]
    }))
  }
  render() {
    const { modelType, modelId } = this.props
    const { status, notes } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        return (
          <>
            <IconButton
              glyph="post"
              bg="success"
              circle
              onClick={this.addNote}
            />
            {notes
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((note, index) => (
                <SingleNote
                  key={index}
                  note={note}
                  modelId={modelId}
                  modelType={modelType}
                />
              ))}
          </>
        )
      default:
        return <ErrorPage />
    }
  }
}
