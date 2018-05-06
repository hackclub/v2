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
import FlipMove from 'react-flip-move'
import Auth from 'components/Auth'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Comment from 'components/challenge/Comment'
import NewComment from 'components/challenge/NewComment'
import NoComments from 'components/challenge/NoComments'
import PropTypes from 'prop-types'
import api from 'api'
import { isEmpty, remove } from 'lodash'

const Header = Flex.extend`
  flex-shrink: 0;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
`

const Container = Box.extend`
  flex-shrink: 0;
  flex: 1 1 auto;
  position: relative;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: ${props => props.theme.space[3]}px;
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
    this.forceUpdate()
  }

  onDelete = id => {
    const { data } = this.state
    api
      .delete(`v1/post_comments/${id}`)
      .then(() => {
        this.setState(state => ({
          data: remove(state.data, comment => comment.id !== id)
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
          <Heading.h2 f={[4, 5]} children={name} />
          <Link href={url} target="_blank" ml={2}>
            <Icon name="open_in_new" color="info" size={24} />
          </Link>
        </Header>
        <Container>
          <Auth
            headline="Sign in to comment"
            type="public"
            cardProps={{
              p: 3,
              my: 3,
              bg: 'info',
              boxShadowSize: 'md'
            }}
            textProps={{
              justify: 'center',
              py: [2, 3],
              f: [1, 2],
              color: 'muted'
            }}
          />
          {status === 'loading' ? (
            <LoadingBar py={6} />
          ) : (
            isEmpty(data) && <NoComments />
          )}
          {status === 'error' && <ErrorPage />}
          <FlipMove
            typeName={null}
            duration={256}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
          >
            {data.map((c, i) => (
              <Comment
                key={`post-${c.id}`}
                id={c.id}
                createdAt={c.created_at}
                mine={c.user.email === email}
                following={
                  i > 0
                    ? data[i - 1].user.email === c.user.email &&
                      new Date(c.created_at).getDate() ===
                        new Date(data[i - 1].created_at).getDate()
                    : false
                }
                user={c.user}
                body={c.body}
                onDelete={this.onDelete}
              />
            ))}
          </FlipMove>
        </Container>
        {status === 'success' && (
          <NewComment id={id} email={email} onSubmit={this.onSubmit} />
        )}
      </Fragment>
    )
  }
}

export default Comments
