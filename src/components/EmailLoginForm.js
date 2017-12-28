import React from 'react'
import { api } from '../../data'
import { Field, Submit } from '../components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const statusMessage = status => (
  status
    ? {
      success: 'Login code sent! Check your email.',
      error: 'Something went wrong'
    }[status]
    : 'Get login code'
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
      mt="6px"
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
    fetch(`${api}/v1/applicants/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.statusText
        }
      })
      .then(json => {
        window.localStorage.setItem('applicantId', json.id)
        setStatus('success')
        props.submitCallback()
        setSubmitting(false)
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
