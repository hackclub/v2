import React from 'react'
import { Flex, Heading } from '@hackclub/design-system'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Flag from 'components/Flag'
import LoginForm from 'components/auth/LoginForm'

const Base = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const FixedFlag = styled(Flag)`
  position: fixed;
  top: 0;
  left: 1rem;
  z-index: 1;
`

const Login = ({ userType = 'applicant', color, heading, bg }) => {
  const resultColor =
    color ||
    {
      admin: 'green.5',
      applicant: 'white',
      owner: 'white'
    }[userType]
  const resultBg =
    bg ||
    {
      admin: 'black',
      applicant: 'primary',
      owner: 'orange.5'
    }[userType]
  const resultHeading =
    heading ||
    {
      admin: 'Admin login',
      applicant: 'Start your application',
      owner: '⚙️ Operations login 🔧'
    }[userType]
  return (
    <Base color={resultColor} bg={resultBg}>
      <Helmet title="Log in – Hack Club" />
      <FixedFlag />
      <Heading.h1
        fontSize={[4, 5]}
        mb={3}
        color={resultColor}
        children={resultHeading}
      />
      <LoginForm
        color={resultColor}
        bg={resultBg}
        inputProps={{ mx: 'auto', width: 24 * 16 }}
        textProps={{ align: 'center', fontSize: 4 }}
      />
    </Base>
  )
}
export default Login
