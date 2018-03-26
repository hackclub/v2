import React from 'react'
import { Container, Box } from '@hackclub/design-system'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const Form = Container.withComponent('form')

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
  <Form p={3} maxWidth={24} onSubmit={handleSubmit}>
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
      bg="info"
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
    : 'Get Invitation'
const Cloud9Form = withFormik({
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
    console.log(data)
    fetch('https://api.hackclub.com/v1/cloud9/send_invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res)
        resetForm()
        setStatus('success')

        // associate submitted email with analytics if there isn't already an
        // email set - this will let us track workshop users that go through the
        // cloud9 setup
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
  displayName: 'Cloud9Form'
})(InnerForm)
export default Cloud9Form
