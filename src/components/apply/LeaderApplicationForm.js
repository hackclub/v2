import React from 'react'
import { Text } from '@hackclub/design-system'
import { AutoSaver, Field, Fieldset, Form, FormWrapper } from 'components/Forms'
import { withFormik } from 'formik'
import api from 'api'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const field = name => ({
    name,
    value: values[name] === null ? '' : values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && errors[name],
    disabled: values.submitted_at !== null
  })
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Fieldset section="leader">
          <Field {...field('leader_name')} label="Full Name" />
          <Field {...field('leader_birthday')} label="Birthday" type="date" />
          <Field
            {...field('leader_year_in_school')}
            label="Year in school"
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
            {...field('leader_phone_number')}
            label="Phone number (include country code if not in the United States)"
            type="tel"
          />
          <Field
            {...field('leader_address')}
            label="Your full address (where we can ship you stickers)"
            hint="Please include city, state / province, country, and postal code."
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="stats">
          <Text color="slate" pb={3}>
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
          <Field {...field('leader_ethnicity')} label="Ethnicity" type="select">
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
            {...field('presence_personal_website')}
            label="Personal website link"
            placeholder="https://"
            type="url"
            optional
          />
          <Field
            {...field('presence_github_url')}
            label="GitHub link"
            placeholder="https://"
            type="url"
            optional
          />
          <Field
            {...field('presence_linkedin_url')}
            label="LinkedIn link"
            placeholder="https://"
            type="url"
            optional
          />
          <Field
            {...field('presence_facebook_url')}
            label="Facebook link"
            placeholder="https://"
            type="url"
            optional
          />
          <Field
            {...field('presence_twitter_url')}
            label="Twitter link"
            placeholder="https://"
            type="url"
            optional
          />
        </Fieldset>
        <Fieldset section="skills">
          <Field
            {...field('skills_system_hacked')}
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
            type="textarea"
          />
          <Field
            {...field('skills_impressive_achievement')}
            label="Please tell us in one or two sentences about the most impressive thing you have built or achieved. Include links (and links to images) if possible."
            type="textarea"
          />
          <Field
            {...field('skills_is_technical')}
            label="Are you technical? (You are a programmer who can teach without outside assistance)"
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
          if (analytics.user().traits().email != json.leader_name) {
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
