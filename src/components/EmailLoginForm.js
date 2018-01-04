import React from 'react'
import { api } from '../../data'
import { Label, Input, Text } from 'rebass'
import { brand } from '../theme'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const StyledInput = Input.extend.attrs({
  f: 3,
  p: '0.5rem',
  mb: '3rem',
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
    <StyledLabel className="email" id="email">
      <Text mb="2rem" align="center" f={4}>
        Enter your email.
      </Text>
      <StyledInput
        name="email"
        placeholder="Email Address"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        autoComplete="off"
        autoFocus
      />
    </StyledLabel>
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
    email: yup.string().email("That doesn't look like a valid email.")
  }),
  handleSubmit: (data, { props, setSubmitting }) => {
    if (!data.email) {
      setSubmitting(false)
      return null
    }
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
        props.submitCallback({ applicantId: json.id })
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
