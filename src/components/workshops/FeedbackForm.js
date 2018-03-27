import React from 'react'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import api from 'api'

const statusMessage = status =>
  status
    ? {
        success: 'Thanks!',
        error: 'Something went wrong 🚨'
      }[status]
    : 'Submit your feedback'
const statusColor = status =>
  status === 'success' || status === 'error' ? status.toString() : 'cyan.7'
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
    <Field
      label="Did you have fun?"
      name="fun"
      value={values.fun}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.fun && errors.fun}
      bg="white"
      mb={2}
    />
    <Field
      label="Did you learn something new?"
      name="learning"
      value={values.learning}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.learning && errors.learning}
      bg="white"
      mb={2}
    />
    <Field
      label="Any other feedback?"
      name="notes"
      // type="textarea"
      value={values.fun}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.notes && errors.notes}
      bg="white"
      mb={3}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      bg={statusColor(status)}
      f={2}
    />
  </form>
)
const FeedbackForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    fun: yup.string(),
    learning: yup.string(),
    notes: yup.string()
  }),
  enableReinitialize: true,
  handleSubmit: (data, { props, setSubmitting, setStatus, resetForm }) => {
    api
      .post(`v1/workshop_feedback/${props.slug}`, data)
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
