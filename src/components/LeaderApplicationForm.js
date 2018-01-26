import React, { Fragment } from 'react'
import { api } from '../../data'
import { Container, LargeButton } from '@hackclub/design-system'
import {
  FormWrapper,
  Aside,
  ConfirmClose,
  Fieldset,
  Field,
  Submit,
  Form,
  AutoSaver
} from '../components/Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import { Link, Prompt } from 'react-static'

export const leaderApplicationSchema = yup.object().shape({
  leader_name: yup.string().required(),
  leader_birthday: yup.string().required(),
  leader_year_in_school: yup
    .string()
    .notOneOf(['select'])
    .required(),
  leader_gender: yup
    .string()
    .notOneOf(['select'])
    .required(),
  leader_ethnicity: yup
    .string()
    .notOneOf(['select'])
    .required(),
  leader_phone_number: yup.string().required(),
  leader_address: yup.string().required(),
  skills_system_hacked: yup.string().required(),
  skills_impressive_achievement: yup.string().required(),
  skills_is_technical: yup
    .string()
    .notOneOf(['select'])
    .required()
})

const InnerForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    params
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
          />
          <Field
            name="leader_birthday"
            label="Birthday"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_birthday}
            error={touched.leader_birthday && errors.leader_birthday}
            type="date"
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
          >
            <option value="select" disabled>
              Select One
            </option>
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
          >
            <option value="select" disabled>
              Select One
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="agender">Agender</option>
            <option value="other_gender">Other</option>
          </Field>
          <Field
            name="leader_ethnicity"
            label="Ethnicity"
            hint="Demographic information is collected to share in aggregate with donors and will not be used as part of application review."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_ethnicity || 'select'}
            error={touched.leader_ethnicity && errors.leader_ethnicity}
            type="select"
          >
            <option value="select" disabled>
              Select One
            </option>
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
            label="Phone number (include country code if not in the United States)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_phone_number}
            error={touched.leader_phone_number && errors.leader_phone_number}
            type="tel"
          />
          <Field
            name="leader_address"
            label="Your full address (include city, state/province, country)"
            hint="Please enter your address exactly as we should write it on an envelope."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_address}
            error={touched.leader_address && errors.leader_address}
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="presence">
          <Field
            name="presence_personal_website"
            label="Personal website link"
            placeholder="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_personal_website}
            error={
              touched.presence_personal_website &&
              errors.presence_personal_website
            }
            type="url"
            optional
          />
          <Field
            name="presence_github_url"
            label="GitHub link"
            placeholder="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_github_url}
            error={touched.presence_github_url && errors.presence_github_url}
            type="url"
            optional
          />
          <Field
            name="presence_linkedin_url"
            label="LinkedIn link"
            placeholder="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_linkedin_url}
            error={
              touched.presence_linkedin_url && errors.presence_linkedin_url
            }
            type="url"
            optional
          />
          <Field
            name="presence_facebook_url"
            label="Facebook link"
            placeholder="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_facebook_url}
            error={
              touched.presence_facebook_url && errors.presence_facebook_url
            }
            type="url"
            optional
          />
          <Field
            name="presence_twitter_url"
            label="Twitter link"
            placeholder="https://"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.presence_twitter_url}
            error={touched.presence_twitter_url && errors.presence_twitter_url}
            type="url"
            optional
          />
        </Fieldset>
        <Fieldset section="skills">
          <Field
            name="skills_system_hacked"
            label={
              <Fragment>
                Please tell us about the time you most successfully hacked some
                (non-computer) system to your advantage.{' '}
                <a href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage">
                  Here are examples
                </a>{' '}
                of what we’re looking for.
              </Fragment>
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_system_hacked}
            error={touched.skills_system_hacked && errors.skills_system_hacked}
            type="textarea"
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
          />
          <Field
            name="skills_is_technical"
            label="Are you a technical leader? (You are a programmer who can teach without outside assistance)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_is_technical || 'select'}
            error={touched.skills_is_technical && errors.skills_is_technical}
            type="select"
          >
            <option value="select" disabled>
              Select One
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Field>
        </Fieldset>
        <AutoSaver
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          values={values}
        />
        <Container>
          <LargeButton.link to="/apply">« Back</LargeButton.link>
        </Container>
      </Form>
    </FormWrapper>
  )
}

const LeaderApplicationForm = withFormik({
  mapPropsToValues: props => props.params,
  handleSubmit: (data, { setSubmitting, props }) => {
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
