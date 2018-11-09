import React from 'react'
import { LargeButton, Text } from '@hackclub/design-system'
import { AutoSaver, Field, Fieldset, Form, FormWrapper } from 'components/Forms'
import { withFormik } from 'formik'
import { Link } from 'gatsby'
import api from 'api'

LargeButton.link = LargeButton.withComponent(Link)

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
            disabled={values.submitted_at !== null}
          />
          <Field
            name="leader_birthday"
            label="Birthday"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_birthday}
            error={touched.leader_birthday && errors.leader_birthday}
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
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
            name="leader_phone_number"
            label="Phone number (include country code if not in the United States)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_phone_number}
            error={touched.leader_phone_number && errors.leader_phone_number}
            disabled={values.submitted_at !== null}
            type="tel"
          />
          <Field
            name="leader_address"
            label="Your full address (where we can ship you stickers)"
            hint="Please include city, state / province, country, and postal code."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_address}
            error={touched.leader_address && errors.leader_address}
            disabled={values.submitted_at !== null}
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="stats">
          <Text color="gray.8" pb={3}>
            Demographic stats are collected to share in aggregate with donors
            and will not be used as part of application review.
          </Text>
          <Field
            name="leader_gender"
            label="Gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_gender || 'select'}
            error={touched.leader_gender && errors.leader_gender}
            disabled={values.submitted_at !== null}
            type="select"
          >
            <option value="select" disabled>
              Select One
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderqueer">Non-binary/genderqueer</option>
            <option value="agender">Agender</option>
            <option value="other_gender">Other</option>
          </Field>
          <Field
            name="leader_ethnicity"
            label="Ethnicity"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leader_ethnicity || 'select'}
            error={touched.leader_ethnicity && errors.leader_ethnicity}
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
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
            disabled={values.submitted_at !== null}
            type="url"
            optional
          />
        </Fieldset>
        <Fieldset section="skills">
          <Field
            name="skills_system_hacked"
            label={
              <>
                Please tell us about the time you most successfully hacked some
                (non-computer) system to your advantage.{' '}
                <a
                  href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Here are examples
                </a>{' '}
                of what we’re looking for.
              </>
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_system_hacked}
            error={touched.skills_system_hacked && errors.skills_system_hacked}
            disabled={values.submitted_at !== null}
            type="textarea"
          />
          <Field
            name="skills_impressive_achievement"
            label="Please tell us in one or two sentences about the most impressive thing you have built or achieved. Include links (and links to images) if possible."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_impressive_achievement}
            error={
              touched.skills_impressive_achievement &&
              errors.skills_impressive_achievement
            }
            disabled={values.submitted_at !== null}
            type="textarea"
          />
          <Field
            name="skills_is_technical"
            label="Are you technical? (You are a programmer who can teach without outside assistance)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skills_is_technical || 'select'}
            error={touched.skills_is_technical && errors.skills_is_technical}
            disabled={values.submitted_at !== null}
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
      </Form>
    </FormWrapper>
  )
}

const LeaderApplicationForm = withFormik({
  mapPropsToValues: props => props.params,
  handleSubmit: (data, { setSubmitting, props }) => {
    api
      .patch(`v1/leader_profiles/${props.id}`, { data })
      .then(json => {
        setSubmitting(false)
        // update name stored in analytics w/ latest value if it's changed
        // eslint-disable-next-line
        analytics.ready(() => {
          // eslint-disable-next-line
          if (analytics.user().traits().email !== json.leader_name) {
            // eslint-disable-next-line
            analytics.identify({ name: json.leader_name })
          }
        })
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
