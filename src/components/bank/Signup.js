import React from 'react'
import styled from 'styled-components'
import { Field, Submit, theme } from '@hackclub/design-system'
import { withFormik } from 'formik'

const Base = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.space[2]}px;
  input[type='submit'],
  label {
    grid-column: span 2;
    margin-bottom: 0;
  }
  label div {
    color: ${theme.colors.gray[3]} !important;
  }
  label[id$='First Name'],
  label[id$='Last Name'] {
    grid-column: span 1 !important;
  }
  input[type='text'],
  input[type='email'],
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

const InnerForm = ({ values, errors, touched, handleChange, handleBlur }) => (
  <Base
    method="get"
    target="_blank"
    action="https://airtable.com/shrW33gWaPnSDBhYj"
  >
    <Field
      label="Project name"
      name="prefill_Event Name"
      placeholder="Windy City Hacks"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="First name"
      name="prefill_First Name"
      placeholder="Fiona"
      value={values.first_name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Last name"
      name="prefill_Last Name"
      placeholder="Hackworth"
      value={values.last_name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Email address"
      name="prefill_Email Address"
      placeholder="fiona@hackclub.com"
      type="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Submit.lg
      bg="info"
      width={1}
      mt={[2, 3]}
      value={`Finish ${
        10 - Object.values(values).filter((n) => n !== '').length
      } fields to apply`}
    />
  </Base>
)
const Signup = withFormik({
  enableReinitialize: true,
  displayName: 'Signup'
})(InnerForm)
export default Signup
