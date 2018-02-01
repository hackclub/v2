import React from 'react'
import { api } from 'data.json'
import { Heading, Label, Input, Text, cx } from '@hackclub/design-system'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const StyledInput = Input.extend.attrs({
  mx: 'auto',
  mb: 5,
  w: 24 * 16
})`
  text-align: center;
  background: ${props => props.color};
  color: ${props => cx(props.bg)};
  border: none;
  :focus {
    box-shadow: none !important;
  }
  ::placeholder {
    text-align: center;
    color: ${props => cx(props.bg)};
    opacity: 0.5;
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
  userType,
  color,
  bg,
  status
}) => (
  <form onSubmit={handleSubmit}>
    <Heading.h1 f={2} mb={3} caps color={color}>
      {userType === 'admin' ? 'Admin login' : 'Start your application'}
    </Heading.h1>
    <Label className="email" id="email">
      <Text mb={2} align="center" f={4} color={color} normal>
        Enter your email
      </Text>
      <StyledInput
        name="email"
        placeholder="Email address"
        color={color}
        bg={bg}
        value={values.email}
        onChange={e => {
          e.target.value = e.target.value.trim()
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
      style={errors.email ? null : { visibility: 'hidden' }}
    >
      {errors.email || 'placeholder'}
    </Text>
  </form>
)

const EmailLoginForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validateOnChange: false,
  validationSchema: yup.object().shape({
    email: yup.string().email('That doesn’t look like a valid email.')
  }),
  handleSubmit: (data, { props, setSubmitting }) => {
    if (!data.email) {
      setSubmitting(false)
      return null
    }
    fetch(`${api}/v1/users/auth`, {
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
        window.localStorage.setItem('userId', json.id)
        setSubmitting(false)
        props.submitCallback({ userId: json.id, email: data.email })
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
