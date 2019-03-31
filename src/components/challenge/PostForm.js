import React from 'react'
import { Field, Submit } from '@hackclub/design-system'
import { withFormik } from 'formik'
import * as yup from 'yup'
import api from 'api'

const statusMessage = status =>
  status
    ? {
        success: 'Success!',
        error: 'Something went wrong 🚨'
      }[status]
    : 'Submit your entry'
const statusColor = status =>
  status === 'success' || status === 'error' ? status.toString() : 'info'
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      label="Name"
      name="name"
      placeholder="My Project"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.name && errors.name}
      bg="white"
      mb={2}
    />
    <Field
      label="Description"
      name="description"
      placeholder="Your name, or write something…"
      value={values.description}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.description && errors.description}
      bg="white"
      mb={2}
    />
    <Field
      label="URL"
      name="url"
      placeholder="https://my-project.repl.co"
      value={values.url}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.url && errors.url}
      bg="white"
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      bg={statusColor(status)}
      fontSize={2}
      width={1}
    />
  </form>
)
const PostForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    name: yup.string().required('required'),
    description: yup.string(),
    url: yup
      .string()
      .url()
      .required('required')
  }),
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus, resetForm, props }) => {
    const id = props.challengeId
    api
      .post(`v1/challenges/${id}/posts`, { data })
      .then(project =>
        api.post(`v1/posts/${project.id}/upvotes`).then(_ => {
          resetForm()
          setStatus('success')
          setTimeout(() => {
            if (typeof window.location !== 'undefined') {
              window.location.reload()
            }
          }, 1024)
        })
      )
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'PostForm'
})(InnerForm)
export default PostForm
