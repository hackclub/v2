import React from 'react'
import { api } from '../../data'
import { Container } from '@hackclub/design-system'
import {
  FormWrapper,
  Aside,
  Fieldset,
  Field,
  Submit,
  Form
} from '../components/Forms'
import { withFormik } from 'formik'
import { Link } from 'react-static'

const InnerForm = props => {
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
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Fieldset section="leader">
          <Field
            name="leader_name"
            label="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_name}
            error={touched.leader_name && errors.leader_name}
            required
          />
          <Field
            name="leader_email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_email}
            error={touched.leader_email && errors.leader_email}
            required
          />
          <Field
            name="leader_birthday"
            label="Birthday"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_birthday}
            error={touched.leader_birthday && errors.leader_birthday}
            type="date"
            required
          />
          <Field
            name="leader_year_in_school"
            label="Year in school"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_year_in_school || 'select'}
            error={
              touched.leader_year_in_school && errors.leader_year_in_school
            }
            type="select"
            required
          >
            <option value="select">Select One</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="other_year">Other year</option>
          </Field>
          <Field
            name="leader_gender"
            label="Gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_gender || 'select'}
            error={touched.leader_gender && errors.leader_gender}
            type="select"
            required
          >
            <option value="select">Select One</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="agender">Agender</option>
            <option value="other">Other</option>
          </Field>
          <Field
            name="leader_ethnicity"
            label="Ethnicity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_ethnicity || 'select'}
            error={touched.leader_ethnicity && errors.leader_ethnicity}
            type="select"
            required
          >
            <option value="select">Select One</option>
            <option value="hispanic_or_latino">Hispanic or Latino</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="native_american_or_indian">
              Native American or American Indian
            </option>
            <option value="asian_or_pacific_islander">
              Asian or Pacific Islander
            </option>
            <option value="other_ethnicity">Other ethnicity</option>
          </Field>
          <Field
            name="leader_phone_number"
            label="Phone number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_phone_number}
            error={touched.leader_phone_number && errors.leader_phone_number}
            required
          />
          <Field
            name="leader_address"
            label="Your full address (include city, state/province, country)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_address}
            error={touched.leader_address && errors.leader_address}
            type="textarea"
            required
          />
        </Fieldset>
        <Fieldset section="presence">
          <Field
            name="presence_personal_website"
            label="Personal website URL"
            p="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_personal_website}
            error={
              touched.presence_personal_website &&
              errors.presence_personal_website
            }
          />
          <Field
            name="presence_github_url"
            label="GitHub URL"
            p="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_github_url}
            error={touched.presence_github_url && errors.presence_github_url}
          />
          <Field
            name="presence_linkedin_url"
            label="LinkedIn URL"
            p="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_linkedin_url}
            error={
              touched.presence_linkedin_url && errors.presence_linkedin_url
            }
          />
          <Field
            name="presence_facebook_url"
            label="Facebook URL"
            p="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_facebook_url}
            error={
              touched.presence_facebook_url && errors.presence_facebook_url
            }
          />
          <Field
            name="presence_twitter_url"
            label="Twitter URL"
            p="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_twitter_url}
            error={touched.presence_twitter_url && errors.presence_twitter_url}
          />
        </Fieldset>
        <Fieldset section="skills">
          <Field
            name="skills_system_hacked"
            label="Please tell us about the time you most successfully hacked some (non-computer) system to your advantage."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_system_hacked}
            error={touched.skills_system_hacked && errors.skills_system_hacked}
            type="textarea"
            required
          />
          <Field
            name="skills_impressive_achievement"
            label="Please tell us in one or two sentences about the most impressive thing you have built or achieved."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_impressive_achievement}
            error={
              touched.skills_impressive_achievement &&
              errors.skills_impressive_achievement
            }
            type="textarea"
            required
          />
          <Field
            name="skills_is_technical"
            label="Are you a technical leader? (You are a programmer who can teach without outside assistance)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_is_technical || 'select'}
            error={touched.skills_is_technical && errors.skills_is_technical}
            type="select"
            required
          >
            <option value="select" disabled>
              Select One
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Field>
        </Fieldset>
        <Container maxWidth={24}>
          <Submit value="Save Draft" disabled={isSubmitting} w={1} my={2} lg />
        </Container>
      </Form>
    </FormWrapper>
  )
}

const LeaderApplicationForm = withFormik({
  mapPropsToValues: props => props.params,
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus, props }) => {
    fetch(`${api}/v1/applicant_profiles/${props.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${props.authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(json => {
        alert('Saved!')
        setSubmitting(false)
      })
      .catch(e => {
        console.error(e)
        alert(e)
        setSubmitting(false)
      })
  },
  displayName: 'LeaderApplicationForm'
})(InnerForm)

export default LeaderApplicationForm
