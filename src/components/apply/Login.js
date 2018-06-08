import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Flex, Heading, colors } from '@hackclub/design-system'
import LoginForm from 'components/apply/LoginForm'
import Flag from 'components/Flag'

const Base = Flex.extend.attrs({
  flexDirection: 'column',
  justify: 'center',
  align: 'center'
})`
  width: 100vw;
  height: 100vh;
`

const FixedFlag = Flag.extend`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

const Login = ({ userType = 'applicant', color, heading, bg }) => {
  const resultColor =
    color ||
    {
      admin: colors.green[5],
      applicant: 'white'
    }[userType]
  const resultBg =
    bg ||
    {
      admin: '#000',
      applicant: 'primary'
    }[userType]
  const resultHeading =
    heading ||
    {
      admin: 'Admin login',
      applicant: 'Start your application'
    }[userType]

  return (
    <Fragment>
      <Helmet title="Log in – Hack Club" />
      <FixedFlag />
      <Base color={resultColor} bg={resultBg}>
        <Heading.h1 f={2} mb={3} caps color={resultColor}>
          {resultHeading}
        </Heading.h1>
        <LoginForm
          color={resultColor}
          bg={resultBg}
          inputProps={{ mx: 'auto', w: 24 * 16 }}
          textProps={{ align: 'center', f: 4 }}
        />
      </Base>
    </Fragment>
  )
}

export default Login
