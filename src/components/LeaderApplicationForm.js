import React from 'react'
import { Field, Submit, Base, Subheading } from '../components/Forms'
import { withFormik } from 'formik'

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
  return(
    <Base is="form" onSubmit={handleSubmit}>
      <Subheading>Leader</Subheading>
      <Field name="leader_name"
             label="Full Name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_name}
             error={touched.leader_name && errors.leader_name}
      />
      <Field name="leader_email"
             label="Email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_email}
             error={touched.leader_email && errors.leader_email}
      />
      <Field name="leader_birthdate"
             label="Birthdate"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_birthdate}
             error={touched.leader_birthdate && errors.leader_birthdate}
             type="date"
      />
      <Field name="leader_year_in_school"
             label="Year in school"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_year_in_school || 'select'}
             error={touched.leader_year_in_school && errors.leader_year_in_school}
             type="select"
      >
        <option value='select'>Select One</option>
      </Field>
      <Field name="leader_gender"
             label="Gender"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_gender || 'select'}
             error={touched.leader_gender && errors.leader_gender}
             type="select"
      >
        <option value='select'>Select One</option>
      </Field>
      <Field name="leader_ethnicity"
             label="Ethnicity"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_ethnicity || 'select'}
             error={touched.leader_ethnicity && errors.leader_ethnicity}
             type="select"
      >
        <option value='select'>Select One</option>
      </Field>
      <Field name="leader_phone_number"
             label="Phone number"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_phone_number}
             error={touched.leader_phone_number && errors.leader_phone_number}
      />
      <Field name="leader_address"
             label="Mailing address"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.leader_address}
             error={touched.leader_address && errors.leader_address}
             type="textarea"
      />
      <Subheading>Presence</Subheading>
      <Field name="presence_personal_website"
             label="Personal website"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.presence_personal_website}
             error={touched.presence_personal_website && errors.presence_personal_website}
      />
      <Field name="presence_github_url"
             label="Link to GitHub account"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.presence_github_url}
             error={touched.presence_github_url && errors.presence_github_url}
      />
      <Field name="presence_linkedin_url"
             label="Link to LinkedIn profile"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.presence_linkedin_url}
             error={touched.presence_linkedin_url && errors.presence_linkedin_url}
      />
      <Field name="presence_facebook_url"
             label="Link to Facebook profile"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.presence_facebook_url}
             error={touched.presence_facebook_url && errors.presence_facebook_url}
      />
      <Field name="presence_twitter_url"
             label="Link to Twitter account"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.presence_twitter_url}
             error={touched.presence_twitter_url && errors.presence_twitter_url}
      />
      <Subheading>Skills</Subheading>
      <Field name="skills_system_hacked"
             label="Please tell us about the time you most successfully hacked some (non-computer) system to your advanced."
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.skills_system_hacked}
             error={touched.skills_system_hacked && errors.skills_system_hacked}
             type="textarea"
      />
      <Field name="skills_impressive_achievement"
             label="Please tell us in one or two sentences about the most impressive thing you have built or achieved."
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.skills_impressive_achievement}
             error={touched.skills_impressive_achievement && errors.skills_impressive_achievement}
             type="textarea"
      />
      <Field name="skills_is_technical"
             label="Are you a technical leader? (You are a programmer who can teach without outside assistance)"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.skills_is_technical}
             error={touched.skills_is_technical && errors.skills_is_technical}
             type="checkbox"
      />
      <Submit
        value="Save as draft"
        disabled={isSubmitting}
      />
    </Base>
  )
}

const LeaderApplicationForm = withFormik({
  mapPropsToValues: params => params,
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus }) => {
    alert('TODO: handle submission')
  },
  displayName: 'LeaderApplicationForm'
})(InnerForm)
export default LeaderApplicationForm
