import React, { Component } from 'react'
import { Formik } from 'formik'
import api from 'api'
import { AutoSaver, Field } from 'components/Forms'

export default class extends Component {
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
      console.log(this.state.id, nextProps.note.id)
      this.setState({
        id: nextProps.note.id,
        note: nextProps.note
      })
    }
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
    const { note } = this.state

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
            <form onSubmit={handleSubmit}>
              <Field
                name="body"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.body}
                type="textarea"
                renderMarkdown
              />
              <AutoSaver
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                values={values}
              />
            </form>
          )
        }}
      </Formik>
    )
  }
}
