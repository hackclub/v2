import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import * as yup from 'yup'

import { Field, Submit } from 'components/Forms'

const submitStatus = status =>
  ({
    success: 'Success',
    redirect: 'Success',
    loading: 'Loading…',
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
        name="club_website"
        value={values.club_website}
        placeholder="https://"
        label="Club’s website"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.club_website && errors.club_website}
        mb={2}
      />
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
        name="high_school_start_month"
        value={values.high_school_start_month}
        label="When does your school year start?"
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.high_school_start_month && errors.high_school_start_month
        }
        mb={2}
        type="select"
      >
        <option value="select">Select One</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </Field>
      <Field
        name="high_school_end_month"
        value={values.high_school_end_month}
        label="When does your school year end?"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_end_month && errors.high_school_end_month}
        mb={2}
        type="select"
      >
        <option value="select">Select One</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </Field>
      <Field
        name="high_school_address"
        value={values.high_school_address}
        label="School’s mailing address (include country if not in US)"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_address && errors.high_school_address}
        mb={2}
        type="textarea"
      />
      <Field
        name="high_school_url"
        value={values.high_school_url}
        placeholder="https://"
        label="School’s website"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.high_school_url && errors.high_school_url}
        mb={2}
      />
      <Field
        name="high_school_type"
        value={values.high_school_type}
        label="Type of school"
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
        mt={3}
        width={1}
        fontSize={4}
      />
    </form>
  )
}

export default withFormik({
  mapPropsToValues: props => {
    const values = { ...props }
    values.high_school_type = props.high_school_type || 'select'
    values.high_school_start_month = props.high_school_start_month || 'select'
    values.high_school_end_month = props.high_school_end_month || 'select'
    values.send_check_ins = false
    return values
  },
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
    club_website: yup
      .string()
      .url('invalid url')
      .nullable(),
    high_school_name: yup.string().required('required'),
    high_school_start_month: yup
      .number()
      .typeError('required')
      .required('required'),
    high_school_end_month: yup
      .number()
      .typeError('required')
      .required('required'),
    high_school_address: yup
      .string()
      .required('required')
      .test({
        message: 'A mailing address should not be a single line',
        test: value => {
          try {
            return value.trim().split(/\r\n|\r|\n/).length > 1
          } catch (_e) {
            return false
          }
        }
      }),
    high_school_url: yup
      .string()
      .url('invalid url')
      .nullable(),
    high_school_type: yup
      .string()
      .typeError('required')
      .matches(/(public_school|private_school|charter_school)/, 'required')
      .required('required')
  })
})(InnerForm)
