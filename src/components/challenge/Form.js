import React, { Fragment } from 'react'
import { Heading, Text } from '@hackclub/design-system'
import LoginForm from 'components/auth/LoginForm'
import PostForm from 'components/challenge/PostForm'
import LoadingBar from 'components/LoadingBar'
import ErrorMessage from 'components/admin/ErrorPage'

const Form = ({ status, closed = true, challengeId }) => {
  switch (status) {
    case 'loading':
      return <LoadingBar />
    case 'success':
      return closed ? (
        <Fragment>
          <Heading.h2 mt={0} mb={2} f={4}>
            Submissions closed!
          </Heading.h2>
          <Text>
            You can still vote on your favorite submissions until Wednesday
            (5/23).
          </Text>
        </Fragment>
      ) : (
        <Fragment>
          <Heading.h2 mt={0} mb={2} f={[3, 4]}>
            Post your project
          </Heading.h2>
          <PostForm challengeId={challengeId} />
        </Fragment>
      )
    case 'needsToAuth':
      return (
        <Fragment>
          <Heading.h2 mt={0} mb={3} f={[3, 4]}>
            Sign in to {!closed && 'post + '}upvote
          </Heading.h2>
          <LoginForm
            bg="black"
            color="white"
            inputProps={{ w: 18 * 16 }}
            textProps={{ color: 'black', align: 'left' }}
          />
        </Fragment>
      )
    default:
      return <ErrorMessage />
  }
}

export default Form
