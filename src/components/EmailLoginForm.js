import React from 'react'
import { Field, Submit } from '../components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const statusMessage = status => (
  status
    ? {
      success: 'Sign-in token sent!',
      error: 'Something went wrong'
    }[status]
    : 'Get sign-in token'
)
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
    />
  </form>
)

const EmailLoginForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email()
  }),
  handleSubmit: (data, { props, setSubmitting, setStatus }) => {
    fetch('https://api.hackclub.com/v1/TODO', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          console.log(res)
          setStatus('success')
          props.submitCallback()
        } else {
          throw res.statusText
        }
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
