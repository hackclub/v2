import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import { Button } from '@hackclub/design-system'
import { Field } from 'components/Forms'

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
      name="name"
      value={values.name || ''}
      error={touched.name && errors.name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="URL"
      name="url"
      value={values.url || ''}
      error={touched.url && errors.url}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Address"
      name="address"
      value={values.address || ''}
      error={touched.address && errors.address}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Button onClick={handleSubmit}>
      {isSubmitting ? 'Submitting…' : 'Update'}
    </Button>
  </form>
)

export default withFormik({
  mapPropsToValues: props => ({ ...props }),
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    url: yup.string().url(),
    address: yup.string().required()
  })
})(InnerForm)
