import React from 'react'
import { withFormik } from 'formik'
import api from 'api'
import yup from 'yup'
import { Field, Submit } from 'components/Forms'

const getStatus = {
  bg: {
    submitting: 'gray.2',
    success: 'success',
    error: 'warning'
  },
  value: {
    submitting: 'Inviting...',
    success: 'Invited!',
    error: 'Something went wrong'
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
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="email"
      value={values.email}
      label="Co-lead’s Email"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={getStatus.value[status] || 'Invite leader'}
      bg={getStatus.bg[status] || 'primary'}
      f={4}
    />
  </form>
)

export default withFormik({
  mapPropsToValues: props => ({
    email: props.email || ''
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
