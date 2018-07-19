import React, { Fragment, Component } from 'react'
import {
  Box,
  Flex,
  Icon,
  Button,
  Heading,
  Link,
  Text,
  Hide,
  BackgroundImage
} from '@hackclub/design-system'
import PropTypes from 'prop-types'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import Comments from 'components/challenge/Comments'
import { dt, tinyDt } from 'helpers'
import { sortBy } from 'lodash'
import api from 'api'

const Row = Flex.extend`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
  position: relative;
  a {
    flex: 1 1 auto;
  }
`

const Index = Hide.extend`
  width: ${({ theme }) => theme.space[3]}px;
  position: absolute;
  left: -${({ theme }) => theme.space[4]}px;
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
  width: 72px;
  box-shadow: none !important;
  cursor: ${props => props.cursor};
`

const CommentButton = Box.withComponent('button').extend`
  background: none;
  border: 0;
  appearance: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
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
    top: ${({ theme }) => theme.space[2]}px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: ${({ theme }) => theme.space[3]}px;
  }
`

const CommentsModal = Modal.extend`
  display: grid;
  grid-template-rows: auto 1fr 2rem;
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
  clickCount,
  disabled,
  loading,
  index
}) => (
  <Row
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    py={[2, 3]}
    px={[2, 0]}
    id={`post-${id}`}
  >
    <Index sm xs>
      <Text
        align="right"
        color={mine ? 'warning' : 'muted'}
        bold
        children={index}
      />
    </Index>
    <Box>
      <UpvoteButton
        bg={upvoted ? 'primary' : 'smoke'}
        color={upvoted ? 'white' : 'slate'}
        aria-label={upvoted ? 'Remove your upvote' : 'Upvote this post'}
        onClick={onUpvote}
        disabled={loading}
        cursor={disabled ? 'not-allowed' : loading ? 'wait' : 'pointer'}
      >
        <Icon size={20} name="arrow_upward" />
        <Text.span ml={1} f={2} children={upvotesCount} />
      </UpvoteButton>
      <Flex
        w={1}
        align="center"
        justify="center"
        mt={1}
        title={`${clickCount} views`}
      >
        <Icon size={16} name="remove_red_eye" color="gray.5" />
        <Text.span
          ml={1}
          f={1}
          color="muted"
          style={{ lineHeight: 1 }}
          children={clickCount}
        />
      </Flex>
    </Box>
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
  loading: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired
}
const ShirtPostBase = Box.extend`
  display: inline-block;
  position: relative;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: ${({ theme }) => theme.radius};
    box-shadow: ${({ theme }) => theme.boxShadows[0]};
    transition: ${({ theme }) => theme.transition} all;
    &:hover {
      box-shadow: ${({ theme }) => theme.boxShadows[2]};
    }
  }
  ${CommentButton} {
    padding: 0 !important;
  }
`
const ShirtIndex = Text.extend`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${({ theme }) => theme.space[3]}px;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.875);
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  letter-spacing: -0.02em;
  text-align: center;
  font-weight: bold;
`
const ShirtImage = BackgroundImage.extend`
  width: 100%;
  min-height: 12rem;
  max-height: 16rem;
`
const ShirtPostRow = ({
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
  loading,
  index
}) => (
  <ShirtPostBase
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    id={`post-${id}`}
  >
    <ShirtIndex bold children={index} />
    <ShirtImage src={'http://placehold.it/512x384' || url} />
    <Flex align="flex-start" p={3}>
      <Box align="left" w={1} color="black" mr={2}>
        <Heading.h3 f={3} m={0}>
          {name}
          <Text.span ml={2} f={0} mt={1} color="muted" regular>
            {tinyDt(createdAt)}
          </Text.span>
        </Heading.h3>
        <Description color="muted" f={2}>
          {description}
        </Description>
      </Box>
      <Box>
        <Flex w={1} align="center" justify="space-between" px={1} mb={1}>
          <CommentButton
            aria-label={`Open comments: ${commentsCount}`}
            onClick={onComment}
          >
            <Icon name="chat_bubble" color="info" size={32} />
            <Text.span bold color="white" children={commentsCount} />
          </CommentButton>
          <Link ml={1} href={url}>
            <Icon name="open_in_new" color="muted" size={24} />
          </Link>
        </Flex>
        <UpvoteButton
          bg={upvoted ? 'fuschia.5' : 'smoke'}
          color={upvoted ? 'white' : 'slate'}
          aria-label={upvoted ? 'Remove your upvote' : 'Upvote this post'}
          onClick={onUpvote}
          disabled={loading}
          cursor={disabled ? 'not-allowed' : loading ? 'wait' : 'pointer'}
        >
          <Icon size={20} name="arrow_upward" />
          <Text.span ml={1} f={2} children={upvotesCount} />
        </UpvoteButton>
      </Box>
    </Flex>
  </ShirtPostBase>
)
ShirtPostRow.propTypes = {
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
  loading: PropTypes.bool,
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
    this.schedule()
  }
  componentWillUnmount() {
    this.unSchedule()
  }
  unSchedule = () => {
    clearTimeout(this.poller)
  }
  schedule = () => {
    // run the update immediately
    this.updateRequest()
    // schedule future requests
    this.poller = setInterval(this.poll, 2048)
  }
  poll = () => {
    if (this.state.commentsOpen) {
      //update the page
      this.updateRequest()
    } else {
      //cancel the updates
      this.unSchedule()
    }
  }
  updateRequest = () => {
    api
      .get(`v1/users/current`)
      .catch(err => {
        if (err.status !== 401) {
          this.setState({ status: 'error' })
          console.log(error)
        }
      })
      .then(user =>
        api
          .get(`v1/posts/${this.props.id}/comments`, {}, { noAuth: !user })
          .then(data => {
            const comments = sortBy(data, ['created_at'])
            this.setState({
              comments,
              email: user && user.email,
              status: 'success'
            })
          })
      )
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
      disabled,
      shirt = false
    } = this.props
    const { status, commentsOpen, comments, email } = this.state
    const Element = shirt ? ShirtPostRow : PostRow
    return (
      <Fragment>
        <Element onComment={this.onOpen} {...this.props} />
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
