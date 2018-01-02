import React from 'react'
import { api } from '../../data'
import { Field, Submit, Form, Subheading } from '../components/Forms'
import Button from '../components/Button'
import { withFormik } from 'formik'
import { Link } from 'react-static'
import { Text } from 'rebass'
import yup from 'yup'
import theme from '../theme'

const ApplicationList = props => {
  let profiles = {
    complete: [],
    incomplete: []
  }
  props.values.applicant_profiles.forEach(profile => {
    profiles[profile.completed_at === null ? 'incomplete' : 'complete'].push(profile)
  })

  const profileList = (title, type, color) => {
    const list = profiles[type]
    if (list.length === 0) {
      return null
    } else {
      return (
        <div>
          <Text>{title} Profiles</Text>
          <ul>
            {list.map((profile, index) => (
              <Button is={Link}
                      to={profile.id == props.id ? `/apply/leader?id=${profile.id}` : '/apply'}
                      bg={color}
                      children={profile.applicant.email}
                      key={index} />
            ))}
          </ul>
        </div>
      )
    }
  }

  return (
    <div>
      {profileList('Complete', 'complete', 'success')}
      {profileList('Incomplete', 'incomplete', 'primary')}
    </div>
  )
}

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
    <form onSubmit={handleSubmit}>
      <ApplicationList values={values} id={props.id} />
      <Field name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             p="Co-leader's email address"
             value={values.email || ''}
             error={touched.email && errors.email}
             disabled={isSubmitting}
      />
    </form>
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
