import React from 'react'
import { Container, Box } from 'rebass'
import { Field, Submit } from './Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

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
  <Container is="form" p={3} maxWidth={20 * 16} onSubmit={handleSubmit}>
    <Field
      label="Email"
      name="email"
      type="email"
      p="cat@hackclub.com"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      w={1}
      mt={3}
    />
  </Container>
)

const statusMessage = status =>
  status
    ? {
        success: 'Invitation sent! Check your email 📬',
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
