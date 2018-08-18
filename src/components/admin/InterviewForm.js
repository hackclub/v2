import React from 'react'
import { Box } from '@hackclub/design-system'
import { Formik } from 'formik'
import { AutoSaver, Field } from 'components/Forms'
import api from 'api'

const Form = Box.withComponent('form')

export default props => {
  const { application, updateApplication } = props

  const intialValues = {
    ...application,
    interview_notes: application.interview_notes || '',
    interview_duration: application.interview_duration
      ? application.interview_duration / 60
      : '',
    interviewed_at: application.interviewed_at
      ? application.interviewed_at.substr(0, 10)
      : ''
  }

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={(values, { props, setSubmitting }) => {
        const transformedValues = { ...values }
        if (values.interview_duration) {
          transformedValues.interview_duration = values.interview_duration * 60
        }
        api
          .patch(`v1/new_club_applications/${values.id}`, {
            data: transformedValues
          })
          .then(json => {
            updateApplication(json)
            setSubmitting(false)
          })
          .catch(e => {
            setSubmitting(false)
          })
      }}
    >
      {(
        { handleChange, handleBlur, handleSubmit, isSubmitting, values },
        ...props
      ) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="interview_notes"
            label="Interview notes"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.interview_notes}
            type="textarea"
            bg="rgba(250,247,133,0.5)"
            renderMarkdown
          />
          <Field
            name="interviewed_at"
            label="Interview date"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.interviewed_at}
            type="date"
          />
          <Field
            name="interview_duration"
            label="Interview duration (minutes)"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.interview_duration}
            type="number"
          />
          <AutoSaver
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            values={values}
            saveNotification="underline"
          />
        </Form>
      )}
    </Formik>
  )
}
