import React, { Component, Fragment } from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Button,
  Icon
} from '@hackclub/design-system'
import Auth from 'components/Auth'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Comment from 'components/challenge/Comment'
import NewComment from 'components/challenge/NewComment'
import PropTypes from 'prop-types'

const Header = Flex.extend`
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
`

class Comments extends Component {
  state = { data: [] }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    data: nextProps.data
  })

  onSubmit = data => {
    this.setState(state => {
      data: state.data.push(data)
    })
  }

  render() {
    const { status, name, url, id, email } = this.props
    const { data } = this.state
    return (
      <Fragment>
        <Header pb={1}>
          <Heading.h2 f={5} children={name} />
          <Link href={url} target="_blank" ml={2}>
            <Icon name="open_in_new" color="info" size={24} />
          </Link>
        </Header>
        <Auth
          headline="Sign in to comment"
          type="public"
          cardProps={{
            p: 3,
            my: 3,
            bg: 'info',
            boxShadowSize: 'md'
          }}
          textProps={{ my: 3, color: 'muted' }}
        />
        {status === 'loading' && <LoadingBar />}
        {status === 'error' && <ErrorPage />}
        {data.map(comment => (
          <Comment
            key={comment.id}
            createdAt={comment.created_at}
            mine={comment.user.email === email}
            user={comment.user}
            body={comment.body}
            onDelete={this.onDelete}
          />
        ))}
        {status === 'success' && (
          <Fragment>
            <NewComment id={id} email={email} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Comments
