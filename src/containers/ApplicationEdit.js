import React, { Component } from 'react'
import { api } from '../../data'
import { Field, Submit } from '../components/Forms'
import LoadingAnimation from '../components/LoadingAnimation'
import { withFormik } from 'formik'
import { Heading } from 'rebass'
import fetch from 'unfetch'

const Subheading = Heading.extend.attrs({
  f: 4,
  mt: 2,
  mb: 0,
  color: 'primary'
})``

const id = () => {
  const pairs = window.location.search.split(/\?|&/)
  for (var i = 0; i < pairs.length; i++) {
    let pair = pairs[i]
    let k = pair.split('=')[0]
    let v = pair.split('=')[1]
    if (k === 'id') {
      return parseInt(v)
    }
  }
}
const authToken = () => (
  window.localStorage.getItem('authToken')
)
const formToObj = form => {
  var obj = {}
  const formData = new FormData(form)
  formData.forEach((v, k) => {
    obj[v] = k
  })
  return obj
}

const ClubForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  saveDraft = (e) => {
    const draftButton = e.target
    draftButton.value = 'Saving...'
    draftButton.disabled = true
    const data = formToObj(e.target.form)
    fetch(`${api}/v1/club_applications/${id()}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${authToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => (res.json()))
      .then(json => {})
      .catch(e => {alert(e)})
  }
}) => (
  <form onSubmit={handleSubmit}>
    <Subheading>School</Subheading>
    <Field name="high_school_name"
           label="Name of high school"
    />
    <Field name="high_school_url"
           label="Link to your high school's website, if any"
    />
    <Field name="high_school_type"
           label="Type of school"
           type="select"
           defaultValue="select">
      <option disabled value="select">Select One</option>
      <option>Public</option>
      <option>Private</option>
      <option>Charter</option>
    </Field>
    <Field name="high_school_address"
           label="High school's full address"
           type="textarea" />
    <Subheading>Leaders</Subheading>
    <Field name="leaders_video_url"
           label="Please enter the URL of a 1 minute unlisted (not private) YouTube video introducing the leaders"
    />
    <Field name="leaders_interesting_project"
           label="Please tell us about an interesting project, preferably outside of class, that two or more of you created together. Include URLs if possible."
           type="textarea" />
    <Field name="leaders_team_origin_story"
           label="How long have you known your other club leaders and how did you meet?"
           type="textarea" />
    <Subheading>Progress</Subheading>
    <Field name="progress_general"
           label="How far along are you in starting your club?"
           type="textarea" />
    <Field name="progress_student_interest"
           label="Have you already polled for interest at your school? Are students interested? If you've already had meetings, how many people came?"
           type="textarea" />
    <Field name="progress_meeting_yet"
           label="Have you begun meeting yet? We encourage you to not begin meeting until we accept you."
           type="textarea" />
    <Subheading>Idea</Subheading>
    <Field name="idea_why"
           label="Why did you decide to start a Hack Club? Have you ran anything like a Hack Club before? Why do you think the club is going to work?"
           type="textarea" />
    <Field name="idea_other_coding_clubs"
           label="Has your school had coding clubs before? What's going to be new about your Hack Club?"
           type="textarea" />
    <Field name="idea_other_general_clubs"
           label="What other clubs exist at your school? Why will you be just as successful, if not more, than them?"
           type="textarea" />
    <Subheading>Formation</Subheading>
    <Field name="formation_registered"
           label="Have you already registerd your club with your school?"
    />
    <Field name="formation_misc"
           label="Do you already have a teacher sponsor? What is their email?"
           type="textarea" />
    <Subheading>Other</Subheading>
    <Field name="other_surprising_or_amusing_discovery"
           label="What convinced you to start a Hack Club?"
           type="textarea" />
    <Subheading>Curious</Subheading>
    <Field name="curious_what_convinced"
           label="What convinced you to start a Hack Club?"
           type="textarea" />
    <Field name="curious_how_did_hear"
           label="How did you hear about Hack Club?"
           type="textarea" />
    <Submit
      onClick={saveDraft}
      value="Save as draft"
    />

    {/* TODO: Add a submit button that submits instead of saving a draft */}
    {/* <Submit
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit}
        value="Submit"
        /> */}
  </form>
)

const FormikForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  handleSubmit: (values, {props, setSubmitting, setErrors}) => {
    // this will submit as a final draft
  }
})(ClubForm)

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading'
    }
  }

  componentDidMount() {
    fetch(`${api}/v1/club_applications/${id()}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken()}`, },
    })
      .then(res => {
        if (res.ok) {
          res.json()
        } else {
          throw res
        }})
      .then(json => {
        this.loadedForm = json
      })
      .catch(e => {alert(e)})
  }

  render() {
    if (this.state.status === 'loading') {
      return(<LoadingAnimation />)
    } else {
      return(<FormikForm {...this.loadedForm} />)
    }
  }
}
