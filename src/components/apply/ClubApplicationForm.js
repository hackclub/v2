import React from 'react'
import { AutoSaver, Fieldset, Field, Form, FormWrapper } from 'components/Forms'
import { withFormik } from 'formik'
import * as yup from 'yup'
import api from 'api'

export const clubApplicationSchema = yup.object().shape({
  high_school_name: yup.string().required(),
  high_school_type: yup
    .string()
    .matches(/(public_school|private_school|charter_school)/)
    .required(),
  high_school_address: yup.string().required(),
  leaders_team_origin_story: yup.string().required(),
  progress_general: yup.string().required(),
  progress_student_interest: yup.string().required(),
  progress_meeting_yet: yup.string().required(),
  idea_why: yup.string().required(),
  idea_other_coding_clubs: yup.string().required(),
  idea_other_general_clubs: yup.string().required(),
  formation_registered: yup.string().required(),
  other_surprising_or_amusing_discovery: yup.string().required(),
  point_of_contact_id: yup.number().required()
})

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  console.log(handleChange)
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
        <Fieldset section="school">
          <Field {...field('high_school_name')} label="Name of high school" />
          <Field
            {...field('high_school_url')}
            label="Link to your high school’s website, if any"
            type="url"
            optional
          />
          <Field
            {...field('high_school_type')}
            label="Type of school"
            type="select"
          >
            <option disabled value="select">
              Select One
            </option>
            <option value="public_school">Public school</option>
            <option value="private_school">Private school</option>
            <option value="charter_school">Charter school</option>
          </Field>
          <Field
            {...field('high_school_address')}
            label="High school’s full address"
            hint="Please include city, state / province, country, and postal code."
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="leaders">
          <Field
            {...field('point_of_contact_id')}
            label="President / equivalent position"
            type="select"
          >
            <option disabled value="select">
              Select One
            </option>
            {values.leader_profiles.map(profile => (
              <option value={profile.user.id} key={profile.user.id}>
                {profile.user.email}
              </option>
            ))}
          </Field>
          <Field
            {...field('leaders_team_origin_story')}
            label="How long have you known your other club leaders and how did you meet?"
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="progress">
          <Field
            {...field('progress_general')}
            label="How far along are you in starting your club?"
            type="textarea"
          />
          <Field
            {...field('progress_student_interest')}
            label="Have you already polled for interest at your school? Are students interested? If you’ve already had meetings, how many people came?"
            type="textarea"
          />
          <Field
            {...field('progress_meeting_yet')}
            label="Have you begun meeting yet?"
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="idea">
          <Field
            {...field('idea_why')}
            label="Why did you decide to start a Hack Club? Have you run anything like a Hack Club before? Why do you think the club is going to work?"
            type="textarea"
          />
          <Field
            {...field('idea_other_coding_clubs')}
            label="Has your school had coding clubs before? What’s going to be new about your Hack Club?"
            type="textarea"
          />
          <Field
            {...field('idea_other_general_clubs')}
            label="What successful clubs exist at your school? What makes them successful? Why will you be just as successful, if not more, than them?"
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="formation">
          <Field
            {...field('formation_registered')}
            label="Have you already registered your club with your school?"
          />
          <Field
            {...field('formation_misc')}
            label="Please provide any other relevant information about your relationship with the school. For example, do you already have a teacher sponsor?"
            type="textarea"
            optional
          />
        </Fieldset>
        <Fieldset section="other">
          <Field
            {...field('other_surprising_or_amusing_discovery')}
            label="What is something surprising or amusing you discovered?"
            hint="Doesn’t have to be about Hack Club or coding."
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="curious">
          <Field
            {...field('curious_what_convinced')}
            label="What convinced you to start a Hack Club?"
            type="textarea"
            optional
          />
          <Field
            {...field('curious_how_did_hear')}
            label="How did you hear about Hack Club? If you heard about us at an event, mention it here."
            type="textarea"
            optional
          />
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

const ClubApplicationForm = withFormik({
  mapPropsToValues: ({ params }) => params,
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, props }) => {
    api
      .patch(`v1/new_club_applications/${props.id}`, { data })
      .then(() => {
        setSubmitting(false)
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'ClubApplicationForm'
})(InnerForm)

export default ClubApplicationForm
