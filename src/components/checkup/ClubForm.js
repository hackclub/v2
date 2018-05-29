import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import yup from 'yup'

import { Field, Submit } from 'components/Forms'

const submitStatus = status =>
  ({
    success: 'Success',
    redirect: 'Success',
    loading: 'Loading...',
    clean: 'Verify',
    invalid: 'Invalid'
  }[status] || 'Update')
const submitColor = status =>
  ({
    success: 'success',
    redirect: 'success',
    loading: 'warning',
    clean: 'info',
    invalid: 'error'
  }[status] || 'primary')

const InnerForm = ({
  values,
  isValid,
  dirty,
  status,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  let buttonState = ''
  const interacted = Object.keys(touched).length > 0
  if (isSubmitting) {
    buttonState = 'loading'
  } else if (dirty || status === 'success') {
    buttonState = status
  } else if (!interacted) {
    buttonState = 'clean'
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="high_school_name"
        value={values.high_school_name}
        label="School name"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_name && errors.high_school_name}
        mb={2}
      />
      <Field
        name="high_school_address"
        value={values.high_school_address}
        label="Full school address"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_address && errors.high_school_address}
        mb={2}
      />
      <Field
        name="high_school_url"
        value={values.high_school_url}
        placeholder="https://"
        label="School URL"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_url && errors.high_school_url}
        mb={2}
      />
      <Field
        name="high_school_type"
        value={values.high_school_type || 'select'}
        label="School type"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_type && errors.high_school_type}
        mb={2}
        type="select"
      >
        <option value="select">Select One</option>
        <option value="public_school">Public</option>
        <option value="private_school">Private</option>
        <option value="charter_school">Charter</option>
      </Field>
      <Submit
        disabled={isSubmitting}
        onClick={handleSubmit}
        value={submitStatus(buttonState)}
        bg={submitColor(buttonState)}
        my={3}
        w={1}
        f={4}
      />
    </form>
  )
}

export default withFormik({
  mapPropsToValues: props => props,
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    setStatus('loading')
    api
      .patch(`v1/new_clubs/${props.id}`, { data: values })
      .then(_res => {
        setSubmitting(false)
        setStatus('success')
        setTimeout(() => {
          location.href = props.redirectUrl
        }, 1000)
        setTimeout(() => {
          setStatus('redirecting')
        }, 3000)
      })
      .catch(err => {
        console.error(err)
        setSubmitting(false)
        setStatus('error')
      })
  },
  validationSchema: yup.object().shape({
    high_school_name: yup.string().required('required'),
    high_school_address: yup.string().required('required'),
    high_school_url: yup.string().nullable(),
    high_school_type: yup
      .string()
      .typeError('required')
      .matches(/(public_school|private_school|charter_school)/, 'required')
  })
})(InnerForm)
