import React from 'react'
import { withFormik } from 'formik'
import yup from 'yup'
import storage from 'storage'
import api from 'api'
import { AutoSaver, Field, Submit } from 'components/Forms'
import { Button, Text } from '@hackclub/design-system'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Start date"
        name="start"
        value={values.start || ''}
        error={touched.start && errors.start}
        onChange={handleChange}
        onBlur={handleBlur}
        type="date"
      />
      <Field
        label="End date"
        name="end"
        value={values.end || ''}
        error={touched.end && errors.end}
        onChange={handleChange}
        onBlur={handleBlur}
        type="date"
      />
      <Field
        label="Event Name"
        name="name"
        value={values.name || ''}
        error={touched.name && errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Field
        label="Event Website"
        name="website"
        value={values.website || ''}
        error={touched.website && errors.website}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="https://"
      />
      <Field
        label="Total attendance"
        name="total_attendance"
        value={values.total_attendance || ''}
        error={touched.total_attendance && errors.total_attendance}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
      />
      <Field
        label="First time hackathon estimate"
        name="first_time_hackathon_estimate"
        value={values.first_time_hackathon_estimate || ''}
        error={
          touched.first_time_hackathon_estimate &&
          errors.first_time_hackathon_estimate
        }
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
      />
      <Field
        label="Address"
        name="address"
        value={values.address || ''}
        error={touched.address && errors.address}
        onChange={handleChange}
        onBlur={handleBlur}
        type="textarea"
      />
      <Button onClick={handleSubmit}>
        {isSubmitting ? 'Submitting...' : values.id ? 'Update' : 'Create'}
      </Button>
    </form>
  )
}

export default withFormik({
  validationSchema: yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required(),
    name: yup.string().required(),
    website: yup
      .string()
      .url()
      .required(),
    address: yup.string().required()
  }),
  mapPropsToValues: props => props.event,
  enableReinitialize: true,
  handleSubmit: (values, { props }) => {
    const authToken = storage.get('authToken')
    const apiFunction = values.id ? api.patch : api.post
    const apiEndpoint = values.id ? `v1/events/${values.id}` : `v1/events`
    apiFunction(apiEndpoint, { authToken, data: values }).then(event => {
      props.updateEvent(event)
    })
  }
})(InnerForm)
