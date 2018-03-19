import React, { Component, Fragment } from 'react'
import { Formik } from 'formik'
import api from 'api'
import { AutoSaver, Field } from 'components/Forms'
import { Box, Flex, IconButton } from '@hackclub/design-system'

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

  componentWillReceiveProps(nextProps) {
    if (this.state.id != nextProps.note.id) {
      this.setState({
        id: nextProps.note.id,
        note: nextProps.note
      })
    }
  }

  deleteNote(id) {
    const { authToken } = this.props
    console.log('making delete request')
    api.delete(`v1/notes/${id}`, { authToken }).then(json => {
      console.log('finished delete request')
      this.setState({ deleted: true })
    })
  }

  handleSubmit(values, { setSubmitting }) {
    const { authToken, applicationId } = this.props
    const { note, id } = this.state
    if (id) {
      api
        .patch(`v1/notes/${id}`, { authToken, data: values })
        .then(json => {
          setSubmitting(false)
        })
        .catch(e => {
          setSubmitting(false)
        })
    } else {
      api
        .post(`v1/new_club_applications/${applicationId}/notes`, {
          authToken,
          data: values
        })
        .then(json => {
          this.setState({ id: json.id })
          setSubmitting(false)
        })
        .catch(e => {
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
              deleted,
              values
            } = props

            return (
              <Box.form w={1} onSubmit={handleSubmit}>
                <Field
                  name="body"
                  label={`Note from user #${values.user_id}`}
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
      status: 'loading'
    }

    this.loadNotes = this.loadNotes.bind(this)
    this.addNote = this.addNote.bind(this)
  }
  componentDidMount() {
    this.loadNotes(this.props.application.id)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.application.id !== nextProps.application.id) {
      this.loadNotes(nextProps.application.id)
    }
  }
  loadNotes(id) {
    const { authToken } = this.props
    api
      .get(`v1/new_club_applications/${id}/notes`, { authToken })
      .then(json => {
        this.setState({
          notes: json
        })
      })
  }
  addNote() {
    this.setState({ notes: [...this.state.notes, { created_at: new Date() }] })
  }
  render() {
    const { authToken, application, updateApplicationList } = this.props
    const { status, notes } = this.state
    return (
      <Fragment>
        <IconButton name="add" bg="success" circle onClick={this.addNote} />
        {notes
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((note, index) => (
            <SingleNote
              key={index}
              note={note}
              applicationId={application.id}
              authToken={authToken}
            />
          ))}
      </Fragment>
    )
  }
}
