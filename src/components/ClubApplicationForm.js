import React, { Fragment } from 'react'
import { api } from '../../data'
import {
  Aside,
  ConfirmClose,
  FormWrapper,
  Fieldset,
  FormAndTableRow,
  Field,
  Submit,
  Form,
  TableOfContents
} from '../components/Forms'
import LeaderInviteForm from '../components/LeaderInviteForm'
import Button from '../components/Button'
import { Container, Flex, Box } from '@hackclub/design-system'
import { withFormik } from 'formik'

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
    params
  } = props
  const markSubmitted = e => {
    e.preventDefault()
    if (values.submitted_at) {
      alert(
        'Application already submitted. If you want to make further edits, just "Save Draft"'
      )
    } else {
      fetch(`${api}/v1/new_club_applications/${id}/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(res => {
          if (res.ok) {
            alert(
              'Application submitted! You’ll get a confirmation email shortly.'
            )
          } else {
            throw res
          }
        })
        .catch(e => {
          console.error(e)
          if (e.status === 422) {
            alert(
              'Can’t submit. Finish filling out the application and make sure all co-leads have filled out their profiles.'
            )
          } else {
            alert('Something went terribly wrong')
          }
        })
    }
  }
  return (
    <FormWrapper>
      {values != params ? <ConfirmClose /> : null}
      <Form onSubmit={handleSubmit}>
        <Fieldset section="school">
          <Field
            name="high_school_name"
            label="Name of high school"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_name}
            error={touched.high_school_name && errors.high_school_name}
          />
          <Field
            name="high_school_url"
            label="Link to your high school’s website, if any"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_url}
            error={touched.high_school_url && errors.high_school_url}
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
            label="High school’s full address (include city, state/province, country)"
            hint="We use this address in a map of our clubs so it needs to be in the same format you’d write on an envelope."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.high_school_address}
            error={touched.high_school_address && errors.high_school_address}
            type="textarea"
          />
        </Fieldset>
        <Fieldset section="leaders">
          <LeaderInviteForm params={values} id={id} authToken={authToken} />
          <Field
            name="point_of_contact_id"
            label="Point of contact"
            hint="To reduce emails, we just send emails to this designated person on your team."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.point_of_contact_id || 'select'}
            error={touched.point_of_contact_id && errors.point_of_contact_id}
            type="select"
          >
            <option disabled value="select">
              Select One
            </option>
            {values.applicant_profiles.map((profile, index) => (
              <option value={profile.applicant.id} key={index}>
                {profile.applicant.email}
              </option>
            ))}
          </Field>
          <Field
            name="leaders_video_url"
            label={
              <Fragment>
                Please enter the URL of a 1 minute unlisted (not private)
                YouTube video introducing the leaders.{' '}
                <a href="https://github.com/hackclub/hackclub/blob/master/clubs/youtube_video.md">
                  Click here for instructions
                </a>.
              </Fragment>
            }
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leaders_video_url}
            error={touched.leaders_video_url && errors.leaders_video_url}
          />
          <Field
            name="leaders_interesting_project"
            label="Please tell us about an interesting project, preferably outside of class, that two or more of you created together. Include URLs if possible."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.leaders_interesting_project}
            error={
              touched.leaders_interesting_project &&
              errors.leaders_interesting_project
            }
            type="textarea"
          />
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
          />
          <Field
            name="progress_meeting_yet"
            label="Have you begun meeting yet? If not, we encourage you to not begin meeting until we accept you."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.progress_meeting_yet}
            error={touched.progress_meeting_yet && errors.progress_meeting_yet}
            type="textarea"
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
          />
          <Field
            name="formation_misc"
            label="Please provide any other relevant information about the structure or formation of the club."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.formation_misc}
            error={touched.formation_misc && errors.formation_misc}
            type="textarea"
            optional
          />
        </Fieldset>
        <Fieldset section="other">
          <Field
            name="other_surprising_or_amusing_discovery"
            label="What is something surprising or amusing you discovered?"
            hint="Suprise us ;)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.other_surprising_or_amusing_discovery}
            error={
              touched.other_surprising_or_amusing_discovery &&
              errors.other_surprising_or_amusing_discovery
            }
            type="textarea"
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
            optional
          />
        </Fieldset>
        <Container maxWidth={24}>
          <Submit
            value="Save Draft"
            disabled={isSubmitting}
            w={1}
            my={2}
            bg="white"
            color="primary"
          />
          <Submit
            value="Submit Application"
            disabled={isSubmitting}
            onClick={markSubmitted}
            w={1}
            my={2}
          />
        </Container>
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
        alert('Saved!')
        setSubmitting(false)
        resetForm()
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
