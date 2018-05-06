import React from 'react'
import { Box } from '@hackclub/design-system'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import api from 'api'

const Form = Box.withComponent('form')

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
  <Form color="white" onSubmit={handleSubmit}>
    <Field
      label="Email"
      name="email"
      type="email"
      placeholder="orpheus@hackclub.com"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      bg="#eeb523"
      w={1}
      mt={3}
    />
  </Form>
)

const statusMessage = status =>
  status
    ? {
        success: 'Sent! Check your email 📬',
        error: 'Something went wrong 😰'
      }[status]
    : 'Get your invitation'
const SlackForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email('invalid email address')
      .matches(/^((?!hackclub\.com).)*$/, 'cannot be @hackclub.com')
  }),
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus, resetForm }) => {
    api
      .post('v1/slack_invites', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        resetForm()
        setStatus('success')
        // associate submitted email with analytics if there isn't already an
        // email set - this will let us track workshop users
        analytics.ready(() => {
          if (!analytics.user().traits().email) {
            analytics.identify({ email: data.email })
          }
        })
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'SlackForm'
})(InnerForm)
export default SlackForm
