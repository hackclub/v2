import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import * as yup from 'yup'
import { Text, Link } from '@hackclub/design-system'
import { Field, Submit } from 'components/Forms'

const submitStatus = status =>
  ({
    success: 'Success',
    redirect: 'Success',
    loading: 'Loading…',
    clean: 'Verify',
    invalid: 'Invalid'
  }[status] || 'Update')
const submitColor = status =>
  ({
    success: 'success',
    redirect: 'success',
    loading: 'muted',
    clean: 'info',
    invalid: 'error'
  }[status] || 'primary')

const InnerForm = ({
  dirty,
  redirectUrl,
  isValid,
  status,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  let buttonState = ''
  const interacted = Object.keys(touched).length > 0
  if (isSubmitting) {
    buttonState = 'loading'
  } else if (dirty || status === 'success') {
    buttonState = status
  } else if (!interacted) {
    buttonState = 'clean'
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        value={values.name}
        label="Full Name"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name}
        mb={2}
      />
      <Field
        name="phone_number"
        value={values.phone_number}
        label="Phone Number (including country code if outside the US)"
        placeholder="(415)-555-555"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone_number && errors.phone_number}
        mb={2}
      />
      <Field
        name="email"
        value={values.email}
        label="Your Personal Email"
        placeholder="email"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        mb={2}
        disabled
      />
      <Field
        name="address"
        value={values.address}
        label="Mailing Address (as it would appear on an envelope)"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && errors.address}
        mb={2}
        type="textarea"
      />
      <Field
        name="gender"
        value={values.gender || 'select'}
        label="Gender"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.gender && errors.gender}
        mb={2}
        type="select"
      >
        <option value="select">Select One</option>
        <option value="agender">Agender</option>
        <option value="female">Female</option>
        <option value="genderqueer">Genderqueer</option>
        <option value="male">Male</option>
        <option value="other_gender">Other gender</option>
      </Field>
      <Field
        name="birthday"
        value={values.birthday}
        placeholder="YYYY-MM-DD"
        label="Birthday"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.birthday && errors.birthday}
        type="date"
        mb={2}
      />
      <Field
        name="ethnicity"
        value={values.ethnicity || 'select'}
        label="Ethnicity"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.ethnicity && errors.ethnicity}
        mb={2}
        type="select"
      >
        <option value="select">Select One</option>
        <option value="asian_or_pacific_islander">
          Asian or Pacific Islander
        </option>
        <option value="black">Black</option>
        <option value="hispanic_or_latino">Hispanic or Latino</option>
        <option value="native_american_or_indian">
          Native American or Indian
        </option>
        <option value="white">White</option>
        <option value="other_ethnicity">Other ethnicity</option>
      </Field>
      <Field
        name="expected_graduation"
        value={values.expected_graduation}
        label="What month do you expect to graduate from high school?"
        placeholder="YYYY-MM"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.expected_graduation && errors.expected_graduation}
        type="month"
        mb={2}
      />
      <Field
        name="personal_website"
        value={values.personal_website}
        label="Personal Website"
        placeholder="https://"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.personal_website && errors.personal_website}
        mb={2}
      />
      <Field
        name="github_url"
        value={values.github_url}
        label="GitHub profile"
        placeholder="https://"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.github_url && errors.github_url}
        mb={2}
      />
      <Field
        name="linkedin_url"
        value={values.linkedin_url}
        label="LinkedIn Profile"
        placeholder="https://"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.linkedin_url && errors.linkedin_url}
        mb={2}
      />
      <Field
        name="twitter_url"
        value={values.twitter_url}
        label="Twitter Profile"
        placeholder="https://"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.twitter_url && errors.twitter_url}
        mb={2}
      />
      <Field
        name="facebook_url"
        value={values.facebook_url}
        label="Facebook Profile"
        placeholder="https://"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.facebook_url && errors.facebook_url}
        mb={2}
      />
      {/* TODO: Update submit button */}
      <Submit
        disabled={isSubmitting}
        onClick={handleSubmit}
        value={submitStatus(buttonState)}
        bg={submitColor(buttonState)}
        mt={3}
        width={1}
        fontSize={4}
      />
      {status === 'redirecting' && (
        <Text>
          Redirecting you to <Link href={redirectUrl}>the next step</Link>.
        </Text>
      )}
    </form>
  )
}

export default withFormik({
  mapPropsToValues: props => {
    const values = {}
    const combinedProps = {
      ...props.new_leader,
      email: props.email
    }
    Object.keys(combinedProps).forEach(key => {
      values[key] = props[key] || props.new_leader[key] || ''
      if (values[key] === '1900-01-01') {
        values[key] = ''
      }
      // Date.parse has inconsistent results with timezones. This is an issue b/c we're setting the date to the first of the month so some timezones would roll over into the previous month
      if (key === 'expected_graduation' && values[key] != null) {
        const dateArray = values[key].split('-')
        values[key] = `${dateArray[0]}-${dateArray[1]}`
      }
    })

    return values
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email('email'),
    address: yup
      .string()
      .required('required')
      .test({
        // eslint-disable-next-line
        message: '${path} should not be a single line',
        test: value => {
          try {
            return value.trim().split(/\r\n|\r|\n/).length > 1
          } catch (_e) {
            return false
          }
        }
      }),
    gender: yup
      .string()
      .matches(/(male|female|genderqueer|agender|other_gender)/, 'required'),
    birthday: yup
      .date()
      .typeError('YYYY-MM-DD')
      .nullable(),
    ethnicity: yup
      .string()
      .matches(
        /(hispanic_or_latino|white|black|native_american_or_indian|asian_or_pacific_islander|other_ethnicity)/,
        'required'
      ),
    expected_graduation: yup
      .date()
      .typeError('YYYY-MM or YYYY-MM-DD')
      .required('required'),
    facebook_url: yup
      .string()
      .url()
      .nullable(),
    github_url: yup
      .string()
      .url()
      .nullable(),
    linkedin_url: yup
      .string()
      .url()
      .nullable(),
    twitter_url: yup
      .string()
      .url()
      .nullable(),
    personal_website: yup
      .string()
      .url()
      .nullable(),
    name: yup.string().required('required'),
    phone_number: yup.string().nullable()
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    const userData = {
      email: values.email
    }
    // Expected graduation is going to walk
    const leaderData = {
      address: values.address,
      gender: values.gender,
      birthday: values.birthday,
      ethnicity: values.ethnicity,
      expected_graduation: new Date(values.expected_graduation).toISOString(),
      facebook_url: values.facebook_url,
      github_url: values.github_url,
      linkedin_url: values.linkedin_url,
      name: values.name,
      personal_website: values.personal_website,
      phone_number: values.phone_number,
      twitter_url: values.twitter_url
    }
    return Promise.all([
      api.patch(`v1/new_leaders/${props.new_leader.id}`, { data: leaderData }),
      api.patch(`v1/users/${props.id}`, { data: userData })
    ])
      .then(() => {
        setSubmitting(false)
        setStatus('success')
        setTimeout(() => {
          window.location.href = props.redirectUrl
        }, 1000)
        setTimeout(() => {
          setStatus('redirecting')
        }, 3000)
      })
      .catch(err => {
        console.error(err)
        setSubmitting(false)
        setStatus('error')
      })
  }
})(InnerForm)
