import React from 'react'
import { api } from '../../data'
import { Field, Submit } from '../components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'
import { withRouter } from 'react-static'

const statusMessage = status => (
  status
    ? {
      success: 'Logging in!',
      error: 'Something went wrong'
    }[status]
    : 'Login'
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
      label="Login code"
      name="login_code"
      value={values.loginCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.loginCode && errors.loginCode}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      mt="6px"
    />
  </form>
)

const LoginCodeForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    login_code: yup
      .string()
      .required('required')
  }),
  handleSubmit: (data, { props, setSubmitting, setErrors, setStatus }) => {
    fetch(`${api}/v1/applicants/exchange_login_code`, {
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
        window.localStorage.setItem('loginCode', json.auth_token)
        setStatus('success')
        props.history.push('/apply')
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'LoginCodeForm'
})(InnerForm)

export default withRouter(LoginCodeForm)
