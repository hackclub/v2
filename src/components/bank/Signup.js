import React from 'react'
import styled from 'styled-components'
import { Field, Submit, theme } from '@hackclub/design-system'
import { withFormik } from 'formik'

const Base = styled.form`
  label {
    color: ${theme.colors.gray[3]} !important;
  }
  input[type='text'],
  input[type='url'],
  input[type='number'] {
    background: ${theme.colors.dark} !important;
    border-color: ${theme.colors.dark};
    color: ${theme.colors.white} !important;
    &:focus {
      border-color: ${theme.colors.info};
      box-shadow: none;
    }
    &::placeholder {
      color: ${theme.colors.slate};
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
      placeholder="Windy City Hacks"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.name && errors.name}
      mb={2}
    />
    <Field
      label="URL"
      name="url"
      placeholder="https://windyhacks.com"
      value={values.url}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.url && errors.url}
      mb={2}
    />
    <Field
      label="Estimated attendance"
      name="expected_attendance"
      value={values.expected_attendance}
      type="number"
      placeholder={200}
      onChange={handleChange}
      onBlur={handleBlur}
      mb={[3, 4]}
    />
    <Submit.lg bg="info" width={1} value="Continue your application" />
  </Base>
)
const Signup = withFormik({
  enableReinitialize: true,
  displayName: 'Signup'
})(InnerForm)
export default Signup
