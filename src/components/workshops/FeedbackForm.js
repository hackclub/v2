import React from 'react'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import { map, last, keys, omit } from 'lodash'
import yup from 'yup'
import api from 'api'

const questions = {
  thoughts: 'Overall thoughts?',
  improve: 'How would you improve this workshop?'
}

const schema = {}
map(keys(questions), key => {
  schema[key] = yup.string()
})

const statusMessage = status =>
  status
    ? {
        success: 'Sent, thank you!',
        error: 'Something went wrong 🚨'
      }[status]
    : 'Submit your feedback'
const statusColor = status =>
  status === 'success' || status === 'error' ? status.toString() : 'cyan.8'
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
    {map(questions, (question, key) => (
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
