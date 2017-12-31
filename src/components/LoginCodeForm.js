import React from 'react'
import { api } from '../../data'
import { Box, Input, Text } from 'rebass'
import { Field } from '../components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'
import { withRouter } from 'react-static'

const defaultTitle = 'Cool! We just sent a confirmation code to that address'
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
    <Box is="label" className="loginCode" id="loginCode">
      <Text mb=".125rem" align="center" f={5}>
        {errors.loginCode || status || defaultTitle}
      </Text>
      <StyledInput
        name="loginCode"
        placeholder="Confirmation Code"
        value={values.loginCode}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
    </Box>
  </form>
)

const LoginCodeForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    loginCode: yup
      .string()
      .required(defaultTitle)
  }),
  handleSubmit: (data, { props, setSubmitting, setStatus }) => {
    const strippedLoginCode = data.loginCode.replace(/\D/g,'')
    fetch(`${api}/v1/applicants/${props.id}/exchange_login_code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login_code: strippedLoginCode})
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.statusText
        }
      })
      .then(json => {
        window.localStorage.setItem('authToken', json.auth_token)
        setSubmitting(false)
        props.history.push('/apply')
      })
      .catch(e => {
        console.error(e)
        setStatus("That doesn't look like the code we sent")
        setSubmitting(false)
      })
  },
  displayName: 'LoginCodeForm'
})(InnerForm)

export default withRouter(LoginCodeForm)
