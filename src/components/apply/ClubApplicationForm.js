import React, { Fragment } from 'react'
import { api } from 'data.json'
import {
  Aside,
  AutoSaver,
  ConfirmClose,
  Field,
  Fieldset,
  Form,
  FormAndTableRow,
  FormWrapper,
  Submit
} from 'components/Forms'
import {
  Button,
  Container,
  Heading,
  Flex,
  LargeButton
} from '@hackclub/design-system'
import { withFormik } from 'formik'
import Link from 'gatsby-link'
import yup from 'yup'

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

LargeButton.link = LargeButton.withComponent(Link)

const InnerForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    id,
    authToken,
    disableAutosave
  } = props
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Fieldset section="school">
          <Field
            name="high_school_name"
            label="Name of high school"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_name}
            error={touched.high_school_name && errors.high_school_name}
            disabled={values.submitted_at !== null}
          />
          <Field
            name="high_school_url"
            label="Link to your high school’s website, if any"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_url}
            error={touched.high_school_url && errors.high_school_url}
            disabled={values.submitted_at !== null}
            optional
          />
          <Field
            name="high_school_type"
            label="Type of school"
            type="select"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_type || 'select'}
            error={touched.high_school_type && errors.high_school_type}
            disabled={values.submitted_at !== null}
          >
            <option disabled value="select">
              Select One
            </option>
            <option value="public_school">Public school</option>
            <option value="private_school">Private school</option>
            <option value="charter_school">Charter school</option>
          </Field>
          <Field
            name="high_school_address"
            label="High school’s full address"
            hint="Please include city, state / province, country, and postal code (if available)."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_address}
            error={touched.high_school_address && errors.high_school_address}
            type="textarea"
            disabled={values.submitted_at !== null}
          />
        </Fieldset>
        <Fieldset section="leaders">
          <Field
            name="point_of_contact_id"
            label="Point of contact"
            hint="To reduce emails, we just send emails to this designated person on your team."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.point_of_contact_id || 'select'}
            error={touched.point_of_contact_id && errors.point_of_contact_id}
            type="select"
            disabled={values.submitted_at !== null}
          >
            <option disabled value="select">
              Select One
            </option>
            {values.leader_profiles.map((profile, index) => (
              <option value={profile.user.id} key={index}>
                {profile.user.email}
              </option>
            ))}
          </Field>
          <Field
            name="leaders_team_origin_story"
            label="How long have you known your other club leaders and how did you meet?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leaders_team_origin_story}
            error={
              touched.leaders_team_origin_story &&
              errors.leaders_team_origin_story
            }
            type="textarea"
            disabled={values.submitted_at !== null}
          />
        </Fieldset>
        <Fieldset section="progress">
          <Field
            name="progress_general"
            label="How far along are you in starting your club?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.progress_general}
            error={touched.progress_general && errors.progress_general}
            type="textarea"
            disabled={values.submitted_at !== null}
          />
          <Field
            name="progress_student_interest"
            label="Have you already polled for interest at your school? Are students interested? If you’ve already had meetings, how many people came?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.progress_student_interest}
            error={
              touched.progress_student_interest &&
              errors.progress_student_interest
            }
            type="textarea"
            disabled={values.submitted_at !== null}
          />
          <Field
            name="progress_meeting_yet"
            label="Have you begun meeting yet? If not, we encourage you to not begin meeting until we accept you."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.progress_meeting_yet}
            error={touched.progress_meeting_yet && errors.progress_meeting_yet}
            type="textarea"
            disabled={values.submitted_at !== null}
          />
        </Fieldset>
        <Fieldset section="idea">
          <Field
            name="idea_why"
            label="Why did you decide to start a Hack Club? Have you ran anything like a Hack Club before? Why do you think the club is going to work?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.idea_why}
            error={touched.idea_why && errors.idea_why}
            type="textarea"
            disabled={values.submitted_at !== null}
          />
          <Field
            name="idea_other_coding_clubs"
            label="Has your school had coding clubs before? What’s going to be new about your Hack Club?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.idea_other_coding_clubs}
            error={
              touched.idea_other_coding_clubs && errors.idea_other_coding_clubs
            }
            type="textarea"
            disabled={values.submitted_at !== null}
          />
          <Field
            name="idea_other_general_clubs"
            label="What other clubs exist at your school? Why will you be just as successful, if not more, than them?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.idea_other_general_clubs}
            error={
              touched.idea_other_general_clubs &&
              errors.idea_other_general_clubs
            }
            type="textarea"
            disabled={values.submitted_at !== null}
          />
        </Fieldset>
        <Fieldset section="formation">
          <Field
            name="formation_registered"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.formation_registered}
            error={touched.formation_registered && errors.formation_registered}
            label="Have you already registered your club with your school?"
            disabled={values.submitted_at !== null}
          />
          <Field
            name="formation_misc"
            label="Please provide any other relevant information about the structure or formation of the club."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.formation_misc}
            error={touched.formation_misc && errors.formation_misc}
            type="textarea"
            disabled={values.submitted_at !== null}
            optional
          />
        </Fieldset>
        <Fieldset section="other">
          <Field
            name="other_surprising_or_amusing_discovery"
            label="What is something surprising or amusing you discovered?"
            hint="Surprise us ;)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.other_surprising_or_amusing_discovery}
            error={
              touched.other_surprising_or_amusing_discovery &&
              errors.other_surprising_or_amusing_discovery
            }
            type="textarea"
            disabled={values.submitted_at !== null}
          />
        </Fieldset>
        <Fieldset section="curious">
          <Field
            name="curious_what_convinced"
            label="What convinced you to start a Hack Club?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.curious_what_convinced}
            error={
              touched.curious_what_convinced && errors.curious_what_convinced
            }
            type="textarea"
            disabled={values.submitted_at !== null}
            optional
          />
          <Field
            name="curious_how_did_hear"
            label="How did you hear about Hack Club?"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.curious_how_did_hear}
            error={touched.curious_how_did_hear && errors.curious_how_did_hear}
            type="textarea"
            disabled={values.submitted_at !== null}
            optional
          />
        </Fieldset>
        {!disableAutosave &&
         <AutoSaver
           handleSubmit={handleSubmit}
           isSubmitting={isSubmitting}
           values={values}
         />
        }
      </Form>
    </FormWrapper>
  )
}

const ClubApplicationForm = withFormik({
  mapPropsToValues: props => props.params,
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, props, resetForm }) => {
    fetch(`${api}/v1/new_club_applications/${props.id}`, {
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
  displayName: 'ClubApplicationForm'
})(InnerForm)

export default ClubApplicationForm
