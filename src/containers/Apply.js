import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Absolute,
  Link as A
} from 'rebass'
import theme, { colors, mx } from '../theme'
import { Head } from 'react-static'
import { withFormik } from 'formik'
import yup from 'yup'
import axios from 'axios'
import Nav from '../components/Nav'
import { Field, Submit } from '../components/Forms'
import Footer from '../components/Footer'

const Header = Box.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  p: 3
})`text-align: center;`

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
    h2, .textarea { grid-column: 1 / -1; }
  }
`

const Subheading = Heading.extend.attrs({
  f: 4,
  mt: 2,
  mb: 0,
  color: 'primary'
})``

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
  months
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
      name="graduate"
      type="select"
      value={values.graduate}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.graduate && errors.graduate}
    >
      <option value="9010">Other</option>
      <option value="9001">2022</option>
      <option value="9002">2021</option>
      <option value="9003">2020</option>
      <option value="9004">2019</option>
      <option value="9005">2018</option>
      <option value="9006">2017</option>
      <option value="9007">2016</option>
      <option value="9009">Teacher</option>
      <option value="9008">Graduated</option>
    </Field>
    <Subheading>Your club</Subheading>
    <Field
      label="When do you want to start?"
      name="start"
      type="select"
      value={values.start}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.start && errors.start}
    >
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
  </Base>
)
const r = 'required'
const ApplicationForm = withFormik({
  mapPropsToValues: ({ params }) => ({ ...params }),
  validationSchema: yup.object().shape({
    first_name: yup.string().required(r),
    last_name: yup.string().required(r),
    email: yup.string().email('invalid email address').required(r),
    high_school: yup.string().required(r),
    graduate: yup.string().required(r),
    referer: yup.string().required(r),
    interesting_project: yup.string().required(r),
    systems_hacked: yup.string().required(r),
    steps_taken: yup.string().required(r)
  }),
  handleSubmit: (data, { setSubmitting, setStatus }) => {
    console.log(data)
    axios
      .post('https://hackclub.com/v1/club_applications', data)
      .then(res => {
        console.log(res)
        setSubmitting(false)
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
const systems_hacked =
  'https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage'
export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Apply – Hack Club</title>
    </Head>
    <Header>
      <Nav />
      <Heading is="h1" color="white" f={[5, 6]} mt={4}>
        Submit your application
      </Heading>
    </Header>
    <ApplicationForm months={next12Months()} />
    <Footer />
  </Provider>
)
