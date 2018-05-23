import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import yup from 'yup'

import { Field, Submit } from 'components/Forms'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="high_school_name"
      value={values.high_school_name}
      label="School Name"
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
      value={values.high_school_type}
      label="School type"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.high_school_type && errors.high_school_type}
      mb={2}
      type="select"
    >
      <option value="">Select One</option>
      <option value="public_school">Public</option>
      <option value="private_school">Private</option>
      <option value="charter_school">Charter</option>
    </Field>
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value="Submit"
      bg="primary"
      f={4}
    />
  </form>
)

export default withFormik({
  mapPropsToValues: props => props,
  validationSchema: yup.object().shape({
    high_school_name: yup.string().required('required'),
    high_school_address: yup.string().required('required'),
    high_school_url: yup.string().nullable(),
    high_school_type: yup
      .string()
      .required('required')
      .matches(/(public_school|private_school|charter_school)/)
  })
})(InnerForm)
