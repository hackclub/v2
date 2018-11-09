import React from 'react'
import { Heading, Text } from '@hackclub/design-system'
import LoginForm from 'components/auth/LoginForm'
import PostForm from 'components/challenge/PostForm'
import LoadingBar from 'components/LoadingBar'
import ErrorMessage from 'components/admin/ErrorPage'

const Form = ({ status, closed = false, challengeId }) => {
  switch (status) {
    case 'loading':
      return <LoadingBar />
    case 'success':
      return closed ? (
        <>
          <Heading.h2 mt={0} mb={2} fontSize={4}>
            Submissions closed
          </Heading.h2>
          <Text>
            We’ll be sending out prizes soon. Thanks for submitting, everyone!
          </Text>
        </>
      ) : (
        <>
          <Heading.h2 mt={0} mb={2} fontSize={4}>
            Post your project
          </Heading.h2>
          <PostForm challengeId={challengeId} />
        </>
      )
    case 'needsToAuth':
      return (
        <>
          <Heading.h2 mt={0} mb={3} fontSize={[3, 4]}>
            Sign in to {!closed && 'post + '}
            upvote
          </Heading.h2>
          <LoginForm
            bg="black"
            color="white"
            inputProps={{ width: 18 * 16 }}
            textProps={{ color: 'black', align: 'left' }}
          />
        </>
      )
    default:
      return <ErrorMessage />
  }
}

export default Form
