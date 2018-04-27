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
import api from 'api'
import { remove } from 'lodash'

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

  onDelete = id => {
    const { data } = this.state
    api
      .delete(`v1/post_comments/${id}`)
      .then(() => {
        this.setState(state => ({
          data: remove(state.data, comment => comment.id === id)
        }))
      })
      .catch(e => {})
  }

  render() {
    const { status, name, url, id, email } = this.props
    const { data } = this.state
    console.log(this.props, this.state)
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
        {data.map((c, i) => (
          <Comment
            key={c.id}
            createdAt={c.created_at}
            mine={c.user.email === email}
            following={i > 0 ? data[i - 1].user.email === c.user.email : false}
            user={c.user}
            body={c.body}
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
