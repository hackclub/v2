import React from 'react'
import { Formik } from 'formik'
import { AutoSaver, Field, Form } from 'components/Forms'
import { Heading } from '@hackclub/design-system'
import api from 'api'

export default props => {
  const { application, authToken, updateApplicationList } = props

  const transformedApplication = {
    ...application,
    rejected_at: application.rejected_at
      ? application.rejected_at.substr(0, 10)
      : null
  }

  return (
    <Formik
      initialValues={transformedApplication}
      enableReinitialize={true}
      onSubmit={(values, { props, setSubmitting }) => {
        const transformedValues = { ...values }
        if (values.reject_duration) {
          transformedValues.reject_duration = values.reject_duration * 60
        }
        api
          .patch(`v1/new_club_applications/${values.id}`, {
            authToken,
            data: transformedValues
          })
          .then(json => {
            updateApplicationList(json)
            setSubmitting(false)
          })
          .catch(e => {
            setSubmitting(false)
          })
      }}
    >
      {props => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values
        } = props

        return (
          <Form onSubmit={handleSubmit}>
            <Heading>App #{values.id}</Heading>
            <Field
              name="rejected_reason"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rejected_reason || 'select'}
              type="select"
            >
              <option value="select" disabled>Select One</option>
              <option value="other">Other</option>
            </Field>
            <Field
              name="rejected_notes"
              label="Rejection notes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rejected_notes}
              type="textarea"
              renderMarkdown
            />
            <Field
              name="rejected_at"
              label="Reject date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rejected_at}
              type="date"
            />
            <AutoSaver
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              values={values}
            />
          </Form>
        )
      }}
    </Formik>
  )
}
