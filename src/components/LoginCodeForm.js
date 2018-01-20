import React, { Component } from 'react'
import { api } from '../data.json'
import { Label, Input, Text } from '@hackclub/design-system'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const StyledInput = Input.extend.attrs({
  f: 4,
  mx: 'auto',
  mb: 5,
  w: 24 * 16,
  bg: 'white'
})`
  border: none;
  text-align: center;
  ::placeholder {
    text-align: center;
    color: ${props => props.theme.colors.primary};
    opacity: 0.5;
  }
`

class InnerForm extends Component {
  constructor(props) {
    super(props)
    this.state = { previousLength: 0 }
  }

  formatAsLoginCode(event, rawInput) {
    const typedDash = rawInput.slice(rawInput.length - 2) == '--'
    let digits = rawInput.replace(/[^0-9]/g, '')
    const isRemovingDash =
      this.state.previousLength === 3 && digits.length === 3 && !typedDash

    // remove the last digit with the trailing dash
    if (isRemovingDash) {
      digits = digits.slice(0, -1)
    }

    let result = ''
    result += digits.substring(0, 3) // the first 3 digits
    if (digits.length >= 3) {
      result += '-'
    }
    result += digits.substring(3, 6) // the next 3 digits

    this.setState({ previousLength: digits.length })

    return result
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
        <Label className="loginCode" id="loginCode" align="center">
          <Text color="white" mb={3} align="center" f={4}>
            Cool! We just sent a login code to your email.
          </Text>
          <StyledInput
            name="loginCode"
            placeholder="Login Code"
            value={values.loginCode}
            onChange={e => {
              e.target.value = this.formatAsLoginCode(e, e.target.value)
              handleChange(e)
            }}
            onBlur={handleBlur}
            disabled={isSubmitting}
            autoComplete="off"
            autoFocus
          />
        </Label>
        <Text
          f={1}
          mt="-2.5rem"
          align="center"
          style={errors.loginCode ? null : { visibility: 'hidden' }}
        >
          {errors.loginCode || 'placeholder'}
        </Text>
      </form>
    )
  }
}

const LoginCodeForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    loginCode: yup.string()
  }),
  handleSubmit: (data, { props, setSubmitting, setErrors }) => {
    if (!data.loginCode) {
      setSubmitting(false)
      return null
    }
    const strippedLoginCode = data.loginCode.replace(/\D/g, '')
    fetch(`${api}/v1/applicants/${props.id}/exchange_login_code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login_code: strippedLoginCode })
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
        setErrors({ loginCode: 'That doesn’t look like the code we sent.' })
        setSubmitting(false)
      })
  },
  displayName: 'LoginCodeForm'
})(InnerForm)

export default LoginCodeForm
