import React from 'react'
import { withFormik } from 'formik'
import yup from 'yup'
import { Button } from '@hackclub/design-system'
import { AutoSaver, Field, Submit } from 'components/Forms'

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
      label="Name"
      name="high_school_name"
      value={values.high_school_name || ''}
      error={touched.high_school_name && errors.high_school_name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="URL"
      name="high_school_url"
      value={values.high_school_url || ''}
      error={touched.high_school_url && errors.high_school_url}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Address"
      name="high_school_address"
      value={values.high_school_address || ''}
      error={touched.high_school_address && errors.high_school_address}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Button onClick={handleSubmit}>
      {isSubmitting ? 'Submitting...' : 'Update'}
    </Button>
  </form>
)

export default withFormik({
  mapPropsToValues: props => ({
    high_school_name: 'test',
    high_school_url: 'test',
    high_school_address: 'test'
  }),
  validationSchema: yup.object().shape({
    high_school_name: yup.string().required(),
    high_school_url: yup.string().url(),
    high_school_address: yup.string().required()
  })
})(InnerForm)
