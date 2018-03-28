import React from 'react'
import { Container, Box } from '@hackclub/design-system'
import { Field, Submit } from 'components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import api from 'api'

const Form = Container.withComponent('form')

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
  <Form p={3} maxWidth={24} onSubmit={handleSubmit}>
    <Field
      label="Your Name"
      name="name"
      placeholder="Prof Orpheus"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.name && errors.name}
      mb={2}
    />
    <Field
      label="Your Email"
      name="email"
      type="email"
      placeholder="orpheus@hackclub.com"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
      mb={2}
    />
    <Field
      label="Domain"
      name="requested_domain"
      placeholder="proforpheus.tech"
      value={values.requested_domain}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.requested_domain && errors.requested_domain}
      mb={2}
    />
    <Field
      label="Secret code"
      name="secret_code"
      placeholder="Get from your club leader"
      value={values.secret_code}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.secret_code && errors.secret_code}
      mb={3}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
      w={1}
    />
  </Form>
)

const statusMessage = status =>
  status
    ? {
        success: 'Requested! Check your email 📬',
        error: 'Something went wrong 😰'
      }[status]
    : 'Get Your Domain'
const RedeemTechDomainForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    name: yup.string().required('required'),
    email: yup
      .string()
      .required('required')
      .email('invalid email address'),
    requested_domain: yup
      .string()
      .required('required')
      .matches(/^[A-Z0-9.-]+\.tech$/i, 'must be a valid .tech domain'),
    secret_code: yup.string().required('required')
  }),
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus, resetForm }) => {
    api
      .post('v1/tech_domain_redemptions', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        resetForm()
        setStatus('success')
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'RedeemTechDomainForm'
})(InnerForm)
export default RedeemTechDomainForm
