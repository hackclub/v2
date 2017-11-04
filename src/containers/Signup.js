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
import Nav from '../components/Nav'
import { Form, Field, Submit } from '../components/Forms'
import { required } from '../validations'
import Footer from '../components/Footer'

const Header = styled(Form).extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  p: 3
})`text-align: center;`

const Base = Container.extend.attrs({
  py: 4,
  px: 3,
  maxWidth: 40 * 16
})`
  display: grid;
  grid-gap: 1rem;
  ${mx[1]} {
    grid-template-columns: repeat(2, 1fr);
    h2, .textarea { grid-column: 1 / span 2; }
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
  var months = []
  var today = new Date()
  var asap = genMonth(today)
  asap.label = 'ASAP'
  months.push(asap)
  for (var i = 0; i < 12; i++) {
    today.setMonth(today.getMonth() + 1)
    months.push(genMonth(today))
  }
  return months
}

const systems_hacked =
  'https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage'
export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Sign up – Hack Club</title>
    </Head>
    <Header>
      <Nav />
      <Heading is="h1" color="white" f={[5, 6]} mt={4}>
        Submit your application
      </Heading>
    </Header>
    <Base>
      <Subheading>About you</Subheading>
      <Field
        label="First name"
        name="first_name"
        p="Cat"
        validations={[required]}
      />
      <Field
        label="Last name"
        name="last_name"
        p="Hackworth"
        validations={[required]}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        p="cat@hackclub.com"
        validations={[required]}
      />
      <Field
        label="Phone number"
        name="phone"
        type="phone"
        p="(555) 555-5555"
        validations={[required]}
      />
      <Field label="GitHub" name="github" p="cathackworth" />
      <Field label="Twitter" name="twitter" p="cathackworth" />
      <Field
        label="High school name"
        name="high_school"
        p="Hacking High School"
        validations={[required]}
      />
      <Field
        label="When do you graduate?"
        name="graduate"
        type="select"
        validations={[required]}
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
        children={next12Months().map(({ iso, label }) => (
          <option value={iso} key={iso} children={label} />
        ))}
        validations={[required]}
      />
      <Field label="How did you hear about us?" name="referer" type="text" />
      <Field
        label="Please tell us about an interesting project, preferably outside of class, that you created or worked on."
        name="interesting_project"
        type="textarea"
        validations={[required]}
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
        validations={[required]}
      />
      <Field
        label="What steps have you taken so far in starting your club?"
        name="steps_taken"
        type="textarea"
        validations={[required]}
      />
      <Submit />
    </Base>
    <Footer />
  </Provider>
)
