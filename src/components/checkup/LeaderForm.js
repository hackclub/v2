import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import yup from 'yup'

import { Field, Submit } from 'components/Forms'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="new_leader_name"
      value={values.new_leader_name}
      label="Full Name"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_name && errors.new_leader_name}
      mb={2}
    />
    <Field
      name="new_leader_phone_number"
      value={values.new_leader_phone_number}
      label="Phone Number (including country code if outside the US)"
      placeholder="(415)-555-555"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_phone_number && errors.new_leader_phone_number}
      mb={2}
    />
    <Field
      name="email"
      value={values.email}
      label="Email Address"
      placeholder="email"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
      mb={2}
    />
    <Field
      name="username"
      value={values.username}
      label="Hack Club Username (public)"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.username && errors.username}
      mb={2}
    />
    <Field
      name="new_leader_address"
      value={values.new_leader_address}
      label="Full Address"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_address && errors.new_leader_address}
      mb={2}
    />
    <Field
      name="new_leader_gender"
      value={values.new_leader_gender || 'select'}
      label="Gender"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_gender && errors.new_leader_gender}
      mb={2}
      type="select"
    >
      <option value="select" disabled>Select One</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="genderqueer">Genderqueer</option>
      <option value="agender">Agender</option>
      <option value="other_gender">Other gender</option>
    </Field>
    <Field
      name="new_leader_birthday"
      value={values.new_leader_birthday}
      label="Birthday"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_birthday && errors.new_leader_birthday}
      mb={2}
    />
    <Field
      name="new_leader_ethnicity"
      value={values.new_leader_ethnicity || 'select'}
      label="Ethnicity"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_ethnicity && errors.new_leader_ethnicity}
      mb={2}
      type="select"
    >
      <option value="select" disabled>Select One</option>
      <option value="hispanic_or_latino">Hispanic or Latino</option>
      <option value="white">White</option>
      <option value="black">Black</option>
      <option value="native_american_or_indian">
        Native American or Indian
      </option>
      <option value="asian_or_pacific_islander">
        Asian or Pacific Islander
      </option>
      <option value="other_ethnicity">Other ethnicity</option>
    </Field>
    <Field
      name="new_leader_expected_graduation"
      value={values.new_leader_expected_graduation}
      label="Expected Graduation Date"
      onChange={handleChange}
      onBlur={handleBlur}
      error={
        touched.new_leader_expected_graduation &&
        errors.new_leader_expected_graduation
      }
      mb={2}
    />
    <Field
      name="new_leader_personal_website"
      value={values.new_leader_personal_website}
      label="Personal Website"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={
        touched.new_leader_personal_website &&
        errors.new_leader_personal_website
      }
      mb={2}
    />
    <Field
      name="new_leader_github_url"
      value={values.new_leader_github_url}
      label="GitHub profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_github_url && errors.new_leader_github_url}
      mb={2}
    />
    <Field
      name="new_leader_linkedin_url"
      value={values.new_leader_linkedin_url}
      label="LinkedIn Profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_linkedin_url && errors.new_leader_linkedin_url}
      mb={2}
    />
    <Field
      name="new_leader_twitter_url"
      value={values.new_leader_twitter_url}
      label="Twitter Profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_twitter_url && errors.new_leader_twitter_url}
      mb={2}
    />
    <Field
      name="new_leader_facebook_url"
      value={values.new_leader_facebook_url}
      label="Facebook Profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.new_leader_facebook_url && errors.new_leader_facebook_url}
      mb={2}
    />
    {/* TODO: Update submit button */}
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value="Submit"
      bg="primary"
      f={4}
    />
  </form>
)

export default withFormik({
  mapPropsToValues: props => ({
    email: props.email || '',
    email_on_new_challenge_post_comments:
      props.email_on_new_challenge_post_comments || true,
    email_on_new_challenge_posts: props.email_on_new_challenge_posts,
    email_on_new_challenges: props.email_on_new_challenges,
    new_leader_username: props.new_leader.username || '',
    new_leader_address: props.new_leader.address || '',
    new_leader_gender: props.new_leader.gender || '',
    new_leader_birthday: props.new_leader.birthday || '',
    new_leader_ethnicity: props.new_leader.ethnicity || '',
    new_leader_expected_graduation: props.new_leader.expected_graduation || '',
    new_leader_facebook_url: props.new_leader.facebook_url || '',
    new_leader_github_url: props.new_leader.github_url || '',
    new_leader_linkedin_url: props.new_leader.linkedin_url || '',
    new_leader_name: props.new_leader.name || '',
    new_leader_personal_website: props.new_leader.personal_website || '',
    new_leader_phone_number: props.new_leader.phone_number || '',
    new_leader_twitter_url: props.new_leader.twitter_url || ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email('email'),
    email_on_new_challenge_post_comments: yup.boolean(),
    email_on_new_challenge_posts: yup.boolean(),
    email_on_new_challenges: yup.boolean(),
    new_leader_username: yup.string().nullable(),
    new_leader_address: yup.string().required('required'),
    new_leader_gender: yup
      .string()
      .required('required')
      .matches(/(male|female|genderqueer|agender|other_gender)/),
    new_leader_birthday: yup.date().nullable(),
    new_leader_ethnicity: yup
      .string()
      .required('required')
      .matches(
        /(hispanic_or_latino|white|black|native_american_or_indian|asian_or_pacific_islander|other_ethnicity)/
      ),
    new_leader_expected_graduation: yup.date().required('required'),
    new_leader_facebook_url: yup
      .string()
      .url()
      .nullable(),
    new_leader_github_url: yup
      .string()
      .url()
      .nullable(),
    new_leader_linkedin_url: yup
      .string()
      .url()
      .nullable(),
    new_leader_twitter_url: yup
      .string()
      .url()
      .nullable(),
    new_leader_personal_website: yup
      .string()
      .url()
      .nullable(),
    new_leader_name: yup.string().required('required'),
    new_leader_phone_number: yup.string().nullable()
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    const userData = {
      email: values.email,
      email_on_new_challenge_post_comments:
        values.email_on_new_challenge_post_comments,
      email_on_new_challenge_posts: values.email_on_new_challenge_posts,
      email_on_new_challenges: values.email_on_new_challenges
    }
    const leaderData = {
      username: values.new_leader_username,
      address: values.new_leader_address,
      gender: values.new_leader_gender,
      birthday: values.new_leader_birthday,
      ethnicity: values.new_leader_ethnicity,
      expected_graduation: values.new_leader_expected_graduation,
      facebook_url: values.new_leader_facebook_url,
      github_url: values.new_leader_github_url,
      linkedin_url: values.new_leader_linkedin_url,
      name: values.new_leader_name,
      personal_website: values.new_leader_personal_website,
      phone_number: values.new_leader_phone_number,
      twitter_url: values.new_leader_twitter_url
    }
    Promise.all([
      api.patch(`v1/new_leaders/${props.new_leader.id}`, { data: leaderData }),
      api.patch(`v1/users/${props.id}`, { data: userData })
    ])
      .then(() => {
        setSubmitting(false)
        setStatus('success')
      })
      .catch(err => {
        console.error(err)
        setSubmitting(false)
        setStatus('error')
      })
  }
})(InnerForm)
