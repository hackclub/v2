import React, { Fragment, Component } from 'react'
import {
  Box,
  Flex,
  Icon,
  Button,
  Heading,
  Link,
  Text,
  Hide
} from '@hackclub/design-system'
import PropTypes from 'prop-types'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import Comments from 'components/challenge/Comments'
import { dt, tinyDt } from 'helpers'
import { sortBy } from 'lodash'
import api from 'api'

const Row = Flex.extend`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
  a {
    flex: 1 1 auto;
  }
`

const Description = Text.extend`
  word-wrap: break-word;
  /*
  word-break is duplicated here because it has a different use in WebKit:
  https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container
  */
  word-break: break-all;
  word-break: break-word;
`

const UpvoteButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 72px;
  box-shadow: none !important;
  cursor: ${props => props.cursor};
`

const CommentButton = Box.withComponent('button').extend`
  background: none;
  border: 0;
  appearance: none;
  font-family: inherit;
  font-size: ${props => props.theme.fontSizes[0]}px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none !important;
  cursor: pointer;
  position: relative;
  padding-right: 0;
  margin: 0;
  span {
    position: absolute;
    width: 100%;
    top: ${props => props.theme.space[2]}px;
  }
  ${props => props.theme.mediaQueries.md} {
    padding-right: ${props => props.theme.space[3]}px;
  }
`

const CommentsModal = Modal.extend`
  display: flex;
  flex-direction: column;
  min-height: 16rem;
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
  disabled,
  index
}) => (
  <Row
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    py={[2, 3]}
    px={[2, 0]}
    id={`post-${id}`}
  >
    <Hide sm={true} xs={true}>
      <Text pr={3} color={mine ? 'yellow.3' : 'slate'} bold>
        {index}
      </Text>
    </Hide>
    <UpvoteButton
      bg={upvoted ? 'primary' : 'smoke'}
      color={upvoted ? 'white' : 'slate'}
      aria-label={upvoted ? 'Remove your upvote' : 'Upvote this post'}
      onClick={onUpvote}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      <Icon size={20} name="arrow_upward" />
      <Text.span ml={1} f={2} children={upvotesCount} />
    </UpvoteButton>
    <Link w={1} href={url} target="_blank" color="black" px={3}>
      <Heading.h3 f={3} m={0}>
        {name}
        <Text.span ml={2} f={0} mt={1} color="muted" regular>
          {tinyDt(createdAt)}
        </Text.span>
      </Heading.h3>
      <Description color="muted" f={2}>
        {description}
      </Description>
    </Link>
    <CommentButton
      aria-label={`Open comments: ${commentsCount}`}
      onClick={onComment}
    >
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
        const comments = sortBy(data, ['created_at'])
        this.setState({ comments, status: 'success' })
        this.poll()
      })
      .catch(err => {
        this.setState({ status: 'error' })
      })
  }
  componentWillUnmount() {
    this.unSchedule()
  }
  unSchedule = () => {
    clearTimeout(this.poller)
  }
  schedule = () => {
    this.poller = setTimeout(this.poll, 2048)
  }
  poll = () => {
    api
      .get(`v1/posts/${this.props.id}/comments`)
      .then(data => {
        const comments = sortBy(data, ['created_at'])
        this.setState({ comments })
        this.schedule()
      })
      .catch(err => {
        console.error(err)
      })
  }
  onClose = e => {
    this.setState({ commentsOpen: false })
    this.unSchedule()
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
            <CommentsModal align="left" p={[3, 4]}>
              <CloseButton onClick={this.onClose} />
              <Comments
                name={name}
                url={url}
                status={status}
                id={id}
                email={email}
                data={comments}
              />
            </CommentsModal>
            <Overlay onClick={this.onClose} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}
export default Post
