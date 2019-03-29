import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import {
  BackgroundImage,
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Icon,
  Link,
  Text,
  theme
} from '@hackclub/design-system'
import PropTypes from 'prop-types'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import Comments from 'components/challenge/Comments'
import { dt, tinyDt } from 'helpers'
import { sortBy } from 'lodash'
import api from 'api'

const Row = styled(Flex)`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.smoke};
  position: relative;
  a {
    flex: 1 1 auto;
  }
`

const Index = styled(Hide)`
  width: ${theme.space[3]}px;
  position: absolute;
  left: -${theme.space[5]}px;
`

const Description = styled(Text)`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
`

const UpvoteButton = styled(Button.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  box-shadow: none !important;
  cursor: ${props => props.cursor};
  svg {
    margin: -${theme.space[1]}px;
  }
`

const CommentButton = styled(Box.withComponent('button'))`
  background: none;
  border: 0;
  appearance: none;
  font-family: inherit;
  font-size: ${theme.fontSizes[0]}px;
  line-height: 1.875;
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
    top: 8px;
  }
  ${theme.mediaQueries.md} {
    padding-right: ${theme.space[3]}px;
  }
`

const CommentsModal = styled(Modal)`
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
      <Text align="right" color={mine ? 'warning' : 'muted'} children={index} />
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
        <Icon size={32} glyph={upvoted ? 'thumbsup-fill' : 'thumbsup'} />
        <Text.span ml={1} fontSize={2} children={upvotesCount} />
      </UpvoteButton>
      <Flex
        width={1}
        align="center"
        justify="center"
        color="gray.6"
        title={`${clickCount} views`}
      >
        <Icon size={24} glyph="view" />
        <Text.span
          ml={1}
          fontSize={1}
          color="muted"
          style={{ lineHeight: 1 }}
          children={clickCount}
        />
      </Flex>
    </Box>
    <Link width={1} href={url} target="_blank" color="black" px={3}>
      <Heading.h3 fontSize={3} m={0}>
        {name}
        <Text.span
          mt={1}
          ml={2}
          fontSize={0}
          color="muted"
          regular
          children={tinyDt(createdAt)}
        />
      </Heading.h3>
      <Description color="muted" fontSize={2}>
        {description}
      </Description>
    </Link>
    <CommentButton
      aria-label={`Open comments: ${commentsCount}`}
      color={commentsCount === 0 ? 'gray.5' : 'info'}
      onClick={onComment}
    >
      <Icon
        glyph={commentsCount === 0 ? 'message-simple' : 'message-simple-fill'}
        size={36}
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
const GridPostBase = styled(Box)`
  display: inline-block;
  position: relative;
  overflow: hidden;
  ${theme.mediaQueries.md} {
    border-radius: ${theme.radius};
    box-shadow: ${theme.boxShadows[0]};
    transition: ${theme.transition} all;
    &:hover {
      box-shadow: ${theme.boxShadows[2]};
    }
  }
  ${CommentButton} {
    padding: 0 !important;
  }
`
const GridIndex = styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${theme.space[3]}px;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.875);
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[0]}px;
  letter-spacing: -0.02em;
  text-align: center;
  font-weight: bold;
`
const GridImage = styled(BackgroundImage)`
  width: 100%;
  min-height: 12rem;
  max-height: 16rem;
`
const GridPostRow = ({
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
  <GridPostBase
    bg={mine ? 'yellow.0' : 'white'}
    title={mine ? '👑 Your post!' : `${name} posted on ${dt(createdAt)}`}
    id={`post-${id}`}
  >
    <GridIndex bold children={index} />
    <GridImage src={url} />
    <Flex align="flex-start" p={3}>
      <Box align="left" width={1} color="black" mr={2}>
        <Heading.h3 fontSize={3} m={0}>
          {name}
          <Text.span ml={2} fontSize={0} mt={1} color="muted" regular>
            {tinyDt(createdAt)}
          </Text.span>
        </Heading.h3>
        <Description color="muted" fontSize={2}>
          {description}
        </Description>
      </Box>
      <Box>
        <Flex width={1} align="center" justify="space-between" px={1} mb={1}>
          <CommentButton
            aria-label={`Open comments: ${commentsCount}`}
            onClick={onComment}
            color="info"
          >
            <Icon glyph="message-simple-fill" size={32} />
            <Text.span bold color="white" children={commentsCount} />
          </CommentButton>
          <Link ml={1} href={url} target="_blank" color="muted">
            <Icon glyph="external" size={24} />
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
          <Icon size={28} glyph="up-caret" />
          <Text.span ml={1} fontSize={2} children={upvotesCount} />
        </UpvoteButton>
      </Box>
    </Flex>
  </GridPostBase>
)
GridPostRow.propTypes = {
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
    this.poller = setInterval(this.poll, 2000)
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
          console.log(err)
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
    const { id, name, url } = this.props
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
