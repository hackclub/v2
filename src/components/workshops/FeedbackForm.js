import React from 'react'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import { map, last, keys, omit } from 'lodash'
import * as yup from 'yup'
import api from 'api'
import { workshopFeedback } from 'data.json'

const statusMessage = status =>
  status
    ? {
        success: 'Sent, thank you!',
        error: 'Something went wrong 🚨'
      }[status]
    : 'Submit your feedback'
const statusColor = status =>
  status === 'success' || status === 'error' ? status.toString() : 'primary'
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status
}) => (
  <form onSubmit={handleSubmit}>
    {map(workshopFeedback, (question, key) => (
      <Field
        label={question}
        name={key}
        type="textarea"
        rows={2}
        value={values[key]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[key] && errors[key]}
        bg="white"
        key={key}
      />
    ))}
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      bg={statusColor(status)}
      f={2}
      mt={2}
    />
  </form>
)
const schema = map(keys(workshopFeedback), key => ({
  [key]: yup.string()
}))
const FeedbackForm = withFormik({
  validationSchema: yup.object().shape(schema),
  enableReinitialize: true,
  handleSubmit: (data, { props, setStatus, setSubmitting, resetForm }) => {
    const feedback = {}
    map(omit(data, 'slug'), (res, id) => {
      feedback[questions[id]] = res
    })
    const body = JSON.stringify({
      workshop_slug: last(props.slug.split('/')),
      feedback
    })
    api
      .post(`v1/workshop_feedbacks`, {
        headers: { 'Content-Type': 'application/json' },
        body
      })
      .then(res => {
        resetForm()
        setStatus('success')
      })
      .catch(e => {
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'FeedbackForm'
})(InnerForm)
export default FeedbackForm
