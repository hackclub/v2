import React, { Fragment, Component } from 'react'
import {
  Box,
  Flex,
  Icon,
  Button,
  Heading,
  Link,
  Text
} from '@hackclub/design-system'
import PropTypes from 'prop-types'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import Comments from 'components/challenge/Comments'
import { dt, tinyDt } from 'helpers'
import { kebabCase } from 'lodash'
import api from 'api'

const Row = Flex.extend`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
  a {
    flex: 1 1 auto;
  }
`

const UpvoteButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 5rem;
  box-shadow: none !important;
  cursor: ${props => props.cursor};
`

const CommentButton = Box.withComponent('button').extend`
  background: none;
  border: 0;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  cursor: pointer;
  position: relative;
  span {
    position: absolute;
    width: 100%;
    top: ${props => props.theme.space[2]}px;
  }
`

const PostRow = ({
  id,
  name,
  url,
  description,
  createdAt,
  mine,
  commentsCount,
  upvotesCount,
  upvoted = false,
  onUpvote,
  onComment,
  disabled
}) => (
  <Row
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    py={[2, 3]}
    id={kebabCase(name)}
  >
    <UpvoteButton
      bg={upvoted ? 'primary' : 'smoke'}
      color={upvoted ? 'white' : 'slate'}
      onClick={onUpvote}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      <Icon name="arrow_upward" />
      <Text.span ml={1} f={2} children={upvotesCount} />
    </UpvoteButton>
    <Link w={1} href={url} target="_blank" color="black" px={3}>
      <Heading.h3 f={3} m={0}>
        {name}
        <Text.span ml={2} f={0} mt={1} color="muted" regular>
          {tinyDt(createdAt)}
        </Text.span>
      </Heading.h3>
      <Text color="muted" f={2}>
        {description}
      </Text>
    </Link>
    <CommentButton onClick={onComment}>
      <Icon
        name="chat_bubble"
        color={commentsCount === 0 ? 'gray.5' : 'info'}
        size={32}
      />
      <Text.span bold color="white" children={commentsCount} />
    </CommentButton>
  </Row>
)
PostRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  mine: PropTypes.bool,
  disabled: PropTypes.bool,
  commentsCount: PropTypes.number.isRequired,
  upvotesCount: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired
}
class Post extends Component {
  state = {
    status: 'loading',
    email: null,
    commentsOpen: false,
    comments: []
  }
  onOpen = e => {
    this.setState({ commentsOpen: true })
    let { email } = this.state
    if (typeof localStorage !== 'undefined') {
      email = localStorage.getItem('userEmail')
      this.setState({ email })
    }
    api
      .get(`v1/posts/${this.props.id}/comments`)
      .then(data => {
        this.setState({ comments: data, status: 'success' })
      })
      .catch(err => {
        this.setState({ status: 'error' })
      })
  }
  onClose = e => {
    this.setState({ commentsOpen: false })
  }
  render() {
    const {
      id,
      name,
      url,
      description,
      createdAt,
      mine,
      commentsCount,
      upvotesCount,
      upvoted = false,
      onUpvote,
      disabled
    } = this.props
    const { status, commentsOpen, comments, email } = this.state
    return (
      <Fragment>
        <PostRow onComment={this.onOpen} {...this.props} />
        {commentsOpen && (
          <Fragment>
            <Modal align="left" p={[3, 4]} style={{ minHeight: '16rem' }}>
              <CloseButton onClick={this.onClose} />
              <Comments
                name={name}
                url={url}
                status={status}
                id={id}
                email={email}
                data={comments}
              />
            </Modal>
            <Overlay onClick={this.onClose} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}
export default Post
