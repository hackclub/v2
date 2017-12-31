import React, { Component } from 'react'
import { api } from '../../data'
import { Label, Input, Text } from 'rebass'
import { brand} from '../theme'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const StyledInput = Input.extend.attrs({
  f: 3,
  p: '0.5rem',
  mb: '3rem',
  mx: 'auto',
  width: '20rem',
  bg: 'white',
  color: 'primary'
})`
text-align: center;
justify: center;
::placeholder {
  text-align: center;
  color: ${brand.primary};
  opacity: 0.5;
}
`

const StyledLabel = Label.extend`
display: block;
text-align: center;
`

class InnerForm extends Component {
  formatAsLoginCode(rawInput) {
    // groups of 3 digits
    const matchGroups = rawInput.replace(/[^0-9]/g, '') // strip nums
                                .match(/.{1,3}/g) // group in 3s

    return (matchGroups || []) // empty array if no matches
      .slice(0, 2) // no more than 2 groups
      .join('-')
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      status
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <StyledLabel className="loginCode" id="loginCode">
          <Text mb="2rem" align="center" f={4}>
            {'Cool! We just sent a login code to that address.'}
          </Text>
          <StyledInput
            name="loginCode"
            placeholder="Login Code."
            value={values.loginCode}
            onChange={(e) => {
              e.target.value = this.formatAsLoginCode(e.target.value)
              handleChange(e)
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
            autoComplete="off"
            autoFocus
          />
        </StyledLabel>
        <Text f={1} mt='-2.5rem' align="center" style={errors.loginCode ? null : {visibility: 'hidden'} }>
          {errors.loginCode || 'placeholder'}
        </Text>
      </form>
    )
  }
}

const LoginCodeForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    loginCode: yup
      .string()
  }),
  handleSubmit: (data, { props, setSubmitting, setErrors }) => {
    if (!data.loginCode) {
      setSubmitting(false)
      return null
    }
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
        window.location.reload()
      })
      .catch(e => {
        console.error(e)
        setErrors({loginCode: "That doesn't look like the code we sent"})
        setSubmitting(false)
      })
  },
  displayName: 'LoginCodeForm'
})(InnerForm)

export default LoginCodeForm
