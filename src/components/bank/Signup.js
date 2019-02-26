import React from 'react'
import styled from 'styled-components'
import { Field, LargeButton, theme } from '@hackclub/design-system'
import { withFormik } from 'formik'
import { placeholder } from 'polished'
import { Submit } from 'components/Forms'
import * as yup from 'yup'
import api from 'api'

const Base = styled.form`
  label {
    color: ${theme.colors.gray[3]} !important;
  }
  input[type='text'],
  input[type='url'],
  textarea {
    background: ${theme.colors.black} !important;
    border-color: ${theme.colors.slate} !important;
    color: ${theme.colors.white} !important;
    &:focus {
      box-shadow: 0 0 0 2px ${theme.colors.slate};
    }
    ${placeholder({ color: theme.colors.muted })};
  }
`

const params = values =>
  '?' +
  Object.keys(values)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(values[key]))
    .join('&')

const InnerForm = ({ values, errors, touched, handleChange, handleBlur }) => (
  <Base
    method="get"
    target="_blank"
    action={`https://bank.hackclub.com/apply${params(values)}`}
  >
    <Field
      label="Event name"
      name="name"
      placeholder="Hack Chicago"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.name && errors.name}
      mb={2}
    />
    <Field
      label="URL"
      name="url"
      placeholder="https://hackchicago.io"
      value={values.url}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.url && errors.url}
      mb={2}
    />
    <Field
      label="Tell us about your event"
      name="about_event"
      value={values.about_event}
      type="textarea"
      onChange={handleChange}
      onBlur={handleBlur}
      mb={[3, 4]}
    />
    <Submit.lg bg="info" width={1} value="Continue your application" />
  </Base>
)
const Signup = withFormik({
  validationSchema: yup.object().shape({
    name: yup.string().required('required'),
    url: yup
      .string()
      .url()
      .required('required'),
    about_event: yup.string()
  }),
  enableReinitialize: true,
  displayName: 'Signup'
})(InnerForm)
export default Signup
