import React from 'react'
import { Formik } from 'formik'
import {AutoSaver, Form, Field} from 'components/Forms'

export default props => {
  const { note, application, authToken } = props

  return (
    <Formik
      initialValues={note}
      onSubmit={(values, {props, setSubmitting}) => {
        console.log(values)
      }}
    >
    {
      props => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values
        } = props

        return (
          <Form onSubmit={handleSubmit}>
            <Field
              name="body"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.body}
              type="textarea"
              renderMarkdown
            />
            <AutoSaver
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              values={values}
            />
          </Form>
        )
      }
    }
    </Formik>
  )
}
