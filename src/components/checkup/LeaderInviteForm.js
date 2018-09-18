import React from 'react'
import { withFormik } from 'formik'
import api from 'api'
import * as yup from 'yup'
import { Field } from 'components/Forms'
import { SendForm, SendButton } from '../SendForm'
import { isEmpty } from 'lodash'

const getStatus = {
  bg: {
    submitting: 'smoke',
    success: 'success',
    error: 'warning'
  },
  icon: {
    success: 'checkmark',
    error: 'important'
  }
}

const InnerForm = ({
  values,
  errors,
  touched,
  status,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid
}) => (
  <SendForm onSubmit={handleSubmit}>
    <Field
      name="email"
      value={values.email}
      label="Co-lead’s email"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <SendButton
      disabled={isSubmitting || !(status === 'success' || isValid)}
      onClick={handleSubmit}
      aria-label="Send this invitation"
      disabled={isEmpty(values.email)}
      bg={getStatus.bg[status] || 'info'}
      glyph={getStatus.icon[status] || 'send'}
    />
  </SendForm>
)

export default withFormik({
  mapPropsToValues: props => ({
    email: props.email || ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email('invalid email')
  }),
  handleSubmit: (
    values,
    { props, setSubmitting, setStatus, setErrors, resetForm }
  ) => {
    setStatus('loading')
    api
      .post(`v1/new_clubs/${props.clubId}/invite_leader`, { data: values })
      .then(_res => {
        props.callback()
        resetForm()
        setStatus('success')
      })
      .catch(err => {
        console.error(err)
        setStatus('error')
        setErrors({
          email: err.errors.user
        })
        setSubmitting(false)
      })
  }
})(InnerForm)
