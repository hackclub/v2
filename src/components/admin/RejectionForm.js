import React from 'react'
import { Formik } from 'formik'
import { AutoSaver, Field } from 'components/Forms'
import { Box } from '@hackclub/design-system'
import api from 'api'

const Form = Box.withComponent('form')

export default props => {
  const { application, authToken, updateApplicationList } = props

  const rejected_timestamp = application.rejected_at || new Date().toISOString()
  const initialValues = {
    ...application,
    rejected_notes: application.rejected_notes || '',
    rejected_at: rejected_timestamp.substr(0, 10),
    rejected_reason: application.rejected_reason || 'other'
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, { props, setSubmitting }) => {
        const transformedValues = { ...values }
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
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        ...props
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="rejected_notes"
            label="Rejection notes"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.rejected_notes}
            type="textarea"
            bg="rgba(250,247,133,0.5)"
            renderMarkdown
          />
          <Field
            name="rejected_reason"
            label="Rejection reason"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.rejected_reason || ''}
            type="select"
          >
            <option value="">
              Select One
            </option>
            <option value="other">Other</option>
          </Field>
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
      )}
    </Formik>
  )
}
