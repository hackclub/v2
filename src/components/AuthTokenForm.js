import React from 'react'
import { Field } from '../components/Forms'
import { withFormik } from 'formik'
import fetch from 'unfetch'

const statusMessage = status => (
  status
    ? {
      success: 'Logging in!',
      error: 'Something went wrong'
    }[status]
    : 'Sign In'
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
      label="Sign-in token"
      name="token"
      value={values.token}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.token && errors.token}
    />
  </form>
)

const AuthTokenForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  handleSubmit: (data, { props, setSubmitting, setErrors, setStatus }) => {
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
  displayName: 'AuthTokenForm'
})(InnerForm)

export default AuthTokenForm
