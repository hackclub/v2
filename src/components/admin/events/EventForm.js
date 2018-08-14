import React, { Fragment } from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'
import api from 'api'
import { Field, Submit } from 'components/Forms'
import { Button, Text, Label } from '@hackclub/design-system'

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
      label={
        <Fragment>
          Should this event be listed on{' '}
          <a href="https://hackathons.hackclub.com" target="_blank">
            hackathons.hackclub.com
          </a>?
        </Fragment>
      }
      name="public"
      value={values.public}
      error={touched.public && errors.public}
      onChange={handleChange}
      onBlur={handleBlur}
      type="select"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </Field>
    <Field
      label="Affiliated with Hack Club"
      name="hack_club_associated"
      value={values.hack_club_associated}
      error={touched.hack_club_associated && errors.hack_club_associated}
      onChange={handleChange}
      onBlur={handleBlur}
      type="select"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </Field>
    <Field
      label="How is it associated"
      name="hack_club_associated_notes"
      value={values.hack_club_associated_notes || ''}
      error={
        touched.hack_club_associated_notes && errors.hack_club_associated_notes
      }
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Affiliated with MLH"
      name="mlh_associated"
      value={values.mlh_associated}
      error={touched.mlh_associated && errors.mlh_associated}
      onChange={handleChange}
      onBlur={handleBlur}
      type="select"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </Field>
    <Field
      label="Collegiate event"
      name="collegiate"
      value={values.collegiate}
      error={touched.collegiate && errors.collegiate}
      onChange={handleChange}
      onBlur={handleBlur}
      type="select"
    >
      <option value="false">No</option>
      <option value="true">Yes</option>
    </Field>
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
      {isSubmitting ? 'Submitting…' : values.id ? 'Update' : 'Create'}
    </Button>
  </form>
)

export default withFormik({
  validationSchema: yup.object().shape({
    public: yup.string().required(),
    hack_club_associated: yup.string().required(),
    hack_club_associated_notes: yup.string().nullable(),
    mlh_associated: yup.string().required(),
    collegiate: yup.string().required(),
    start: yup.date().required(),
    end: yup.date().required(),
    name: yup.string().required(),
    website: yup
      .string()
      .url()
      .required(),
    address: yup.string().required()
  }),
  mapPropsToValues: props => ({
    public: 'false',
    hack_club_associated: 'false',
    mlh_associated: 'false',
    collegiate: 'false',
    ...props.event
  }),
  enableReinitialize: true,
  handleSubmit: (values, { props }) => {
    const apiFunction = values.id ? api.patch : api.post
    const apiEndpoint = values.id ? `v1/events/${values.id}` : `v1/events`
    const filteredEvents = {}
    Object.keys(values).forEach(key => {
      if (['banner', 'logo'].indexOf(key) !== -1 && values[key]) {
        filteredEvents[`${key}_id`] = values[key].id
      } else if (key === 'hack_club_associated') {
        filteredEvents[key] = values[key] === 'true'
      } else {
        filteredEvents[key] = values[key]
      }
    })
    apiFunction(apiEndpoint, { data: filteredEvents }).then(event => {
      props.updateEvent(event)
    })
  }
})(InnerForm)
