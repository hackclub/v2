import React from 'react'
import { Formik } from 'formik'
import { AutoSaver, Field, Form } from 'components/Forms'
import { Heading } from '@hackclub/design-system'
import api from 'api'

export default props => {
  const { application, authToken, updateApplicationList } = props

  const transformedApplication = {
    ...application,
    interview_duration: application.interview_duration
      ? application.interview_duration / 60
      : null,
    interviewed_at: application.interviewed_at
      ? application.interviewed_at.substr(0, 10)
      : null
  }

  return (
    <Formik
      initialValues={transformedApplication}
      enableReinitialize={true}
      onSubmit={(values, { props, setSubmitting }) => {
        const transformedValues = { ...values }
        if (values.interview_duration) {
          transformedValues.interview_duration = values.interview_duration * 60
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
              name="interview_notes"
              label="Interview notes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.interview_notes}
              type="textarea"
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
            />
          </Form>
        )
      }}
    </Formik>
  )
}
