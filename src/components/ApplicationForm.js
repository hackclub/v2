import React from 'react'
import { Container, Heading, Flex, Box, Text, Subhead, Link as A } from 'rebass'
import theme, { colors, mx } from '../theme'
import { Field, Submit } from './Forms'
import { withFormik } from 'formik'
import yup from 'yup'
import fetch from 'unfetch'

const Base = Container.extend.attrs({
  is: 'form',
  py: 4,
  px: 3,
  maxWidth: 40 * 16
})`
  display: grid;
  grid-gap: 1rem;
  ${mx[1]} {
    grid-template-columns: repeat(2, 1fr);
    h2, .textarea, #referer { grid-column: 1 / -1; }
    #start_date { display: none !important; }
  }
`

const Subheading = Heading.extend.attrs({
  f: 4,
  mt: 2,
  mb: 0,
  color: 'primary'
})``

const systems_hacked =
  'https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage'
const next12Months = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const genMonth = date => {
    const month = monthNames[date.getMonth()]
    const label = `${month} ${date.getFullYear()}`
    const iso = date.toISOString()
    return { label, iso }
  }
  const months = []
  const today = new Date()
  const asap = genMonth(today)
  asap.label = 'ASAP'
  months.push(asap)
  for (let i = 0; i < 12; i++) {
    today.setMonth(today.getMonth() + 1)
    months.push(genMonth(today))
  }
  return months
}

const statusMessage = status =>
  status
    ? {
        success: 'Submitted! 🎉',
        error: 'Something went wrong 😰'
      }[status]
    : 'Submit application 📝'
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status,
  months = next12Months()
}) => (
  <Base onSubmit={handleSubmit}>
    <Subheading>About you</Subheading>
    <Field
      label="First name"
      name="first_name"
      p="Cat"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.first_name}
      error={touched.first_name && errors.first_name}
    />
    <Field
      label="Last name"
      name="last_name"
      value={values.last_name}
      p="Hackworth"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.last_name && errors.last_name}
    />
    <Field
      label="Email"
      name="email"
      type="email"
      p="cat@hackclub.com"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <Field
      label="Phone number"
      name="phone"
      type="phone"
      p="(555) 555-5555"
      value={values.phone}
      onChange={handleChange}
    />
    <Field
      label="GitHub"
      name="github"
      p="cathackworth"
      value={values.github}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="Twitter"
      name="twitter"
      p="cathackworth"
      value={values.twitter}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Field
      label="High school name"
      name="high_school"
      p="Hacking High School"
      value={values.high_school}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.high_school && errors.high_school}
    />
    <Field
      label="When do you graduate?"
      name="year"
      type="select"
      value={values.year || "Select One"}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.year && errors.year}
    >
      <option value="Select One" disabled>Select one</option>
      <option value="9001">2022</option>
      <option value="9002">2021</option>
      <option value="9003">2020</option>
      <option value="9004">2019</option>
      <option value="9005">2018</option>
      <option value="9008">Graduated</option>
      <option value="9009">Teacher</option>
      <option value="9010">Other</option>
    </Field>
    <Field
      label="When do you want to start? *"
      name="start_date"
      type="select"
      value={values.start_date || 0}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.start_date && errors.start_date}
    >
      <option value={0} disabled>Select one</option>
      {months.map(({ iso, label }, i) => (
        <option value={iso} key={`start-${i}`} children={label} />
      ))}
    </Field>
    <Field
      label="How did you hear about us?"
      name="referer"
      type="text"
      value={values.referer}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.referer && errors.referer}
    />
    <Subheading>Your club</Subheading>
    <Field
      label="Please tell us about an interesting project, preferably outside of class, that you created or worked on."
      name="interesting_project"
      type="textarea"
      value={values.interesting_project}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.interesting_project && errors.interesting_project}
    />
    <Field
      label={
        <span>
          Please tell us about the time you most successfully hacked some
          (non-computer) system to your advantage. (<A
            href={systems_hacked}
            color="info"
          >
            See some kinds of responses we’re looking for.
          </A>)
        </span>
      }
      name="systems_hacked"
      type="textarea"
      value={values.systems_hacked}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.systems_hacked && errors.systems_hacked}
    />
    <Field
      label="What steps have you taken so far in starting your club?"
      name="steps_taken"
      type="textarea"
      value={values.steps_taken}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.steps_taken && errors.steps_taken}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value={statusMessage(status)}
    />
    <Text>
      * The soonest we’re accepting applications for is the
      2<sup>nd</sup> semester of the 2017–2018 school year.
    </Text>
  </Base>
)
const r = 'required'
const ApplicationForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    first_name: yup.string().required(r),
    last_name: yup.string().required(r),
    email: yup
      .string()
      .required(r)
      .email('invalid email address')
      .matches(/^((?!hackclub\.com).)*$/, 'cannot be @hackclub.com'),
    high_school: yup.string().required(r),
    year: yup.string().required(r),
    start_date: yup.string().required(r),
    referer: yup.string().required(r),
    interesting_project: yup.string().required(r),
    systems_hacked: yup.string().required(r),
    steps_taken: yup.string().required(r)
  }),
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, setStatus, resetForm }) => {
    console.log(data)
    fetch('https://api.hackclub.com/v1/club_applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res)
        resetForm()
        setStatus('success')
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'ApplicationForm'
})(InnerForm)
export default ApplicationForm
