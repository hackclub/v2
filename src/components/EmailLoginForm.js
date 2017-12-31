import React from 'react'
import { api } from '../../data'
import { Box, Input, Text } from 'rebass'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const defaultTitle = 'Login to apply'
const StyledInput = Input.extend.attrs({
  bg: 'white',
  color: 'primary'
})`
text-align: center;
::placeholder {
  text-align: center;
}
`
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
    <Box is="label" className="email" id="email">
      <Text mb=".125rem" align="center" f={5}>
        {errors.email || defaultTitle}
      </Text>
      <StyledInput
        name="email"
        placeholder="Your email address"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
    </Box>
  </form>
)

const EmailLoginForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validateOnChange: false,
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required(defaultTitle)
      .email('That email address is invalid')
  }),
  handleSubmit: (data, { errors, setErrors, props, setSubmitting }) => {
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
        setSubmitting(false)
        props.submitCallback({applicantId: json.id})
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
