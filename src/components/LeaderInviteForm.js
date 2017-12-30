import React from 'react'
import { api } from '../../data'
import { Field, Submit, Base, Subheading } from '../components/Forms'
import Button from '../components/Button'
import { withFormik } from 'formik'
import yup from 'yup'

const InnerForm = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props
  return (
    <Base is="form" onSubmit={handleSubmit}>
      <ul>
        {values.applicant_profiles.map((profile, index) => (
          <li key={index}>
            {profile.applicant.email}
            {profile.completed_at === null ? " (Incomplete)" : " (Complete)"}
          </li>
        ))}
      </ul>
      <Field name="email"
             label="Invite a co-leader"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email || ''}
             error={touched.email && errors.email}
      />
      <Submit
        value="Send invite"
        disabled={isSubmitting}
      />
    </Base>
  )
}

const LeaderInviteForm = withFormik({
  mapPropsToValues: props => ( props.params ),
  handleSubmit: (data, {resetForm, props}) => {
    fetch(`${api}/v1/new_club_applications/${props.id}/add_applicant`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }})
      .then(json => {
        alert(`Invite sent to ${data.email}. Refresh for their email to be added to the list.`)
        resetForm()
      })
      .catch(e => {alert(e)})
  },
  validationSchema: yup.object().shape({
    email: yup.string()
              .required()
              .email()
  }),
  displayName: 'LeaderInviteForm'
})(InnerForm)

export default LeaderInviteForm
