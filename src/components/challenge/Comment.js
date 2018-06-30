import React, { Component } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
  cx
} from '@hackclub/design-system'
import Gravatar from 'react-gravatar'
import ReactMarkdown from 'react-markdown'
import QuotedComment from 'components/challenge/QuotedComment'
import PropTypes from 'prop-types'
import { CommentByline, commentStyle } from 'components/challenge/style'
import { onlyContainsEmoji, timeSince } from 'helpers'
import { isEmpty } from 'lodash'
import { css } from 'styled-components'

const gradient = (a, b) =>
  `linear-gradient(to bottom, ${cx(a)} 0%, ${cx(b)} 100%)`

const Root = Flex.extend`
  button {
    transform: scale(0);
    will-change: transform;
    transition: 0.25s ease-out all;
    margin: 2px;
  }
  &:hover button {
    transform: scale(1);
  }
`

const aviMargin = css`
  margin-top: 18px;
` // 14px (byline size) + 4px (margin)
const Avi = Avatar.withComponent(Gravatar).extend`
  ${aviMargin};
`
const BlankAvi = Box.extend`
  width: 28px;
  height: 28px;
`
const NestedAvi = BlankAvi.withComponent('aside').extend`
  ${aviMargin};
  position: relative;
  > button {
    position: absolute;
    background: rgba(255, 255, 255, 0.75);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      -webkit-backdrop-filter: saturate(180%) blur(2px);
    }
    ${({ theme }) => theme.mediaQueries.reduceTransparency} {
      background: ${({ theme }) => theme.colors.white} !important;
    }
  }
  img {
    margin-top: 0;
  }
`

const Group = Flex.extend`
  flex-direction: column;
  flex: auto;
  max-width: 100%;
  align-items: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  margin-right: ${props => (props.mine ? props.theme.space[2] : 0)}px;
  margin-left: ${props => (props.mine ? 0 : props.theme.space[2])}px;
  text-align: left;
  &:hover time {
    opacity: 1;
  }
`

const Byline = CommentByline

const Time = Text.withComponent('time').extend`
  margin: 0 ${({ theme }) => theme.space[2]}px;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  &:hover {
    transition: opacity 0.25s ease-in;
  }
`

const Bubble = Box.extend`
  ${props =>
    !props.emoji &&
    css`
      background-color: ${props =>
        props.mine ? props.theme.colors.info : props.theme.colors.snow};
      background-image: ${props =>
        props.mine
          ? gradient('blue.5', 'blue.6')
          : gradient('gray.0', 'gray.1')};
      border-radius: 18px;
      padding: ${({ theme }) => theme.space[1]}px;
      min-height: 36px;
    `};
  color: ${props =>
    props.mine ? props.theme.colors.white : props.theme.colors.black};
  margin-top: ${({ theme }) => theme.space[1]}px;
  max-width: 24rem;
`

const Body = Box.withComponent(ReactMarkdown).extend`
  padding: ${({ theme }) => theme.space[1]}px ${({ theme }) =>
  theme.space[3] - theme.space[1]}px;
  ${commentStyle};
`

const Megamoji = Text.extend`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
`

const ReplyButton = props => (
  <IconButton
    name="reply"
    color="info"
    size={16}
    p={1}
    circle
    aria-label="Reply to this comment"
    {...props}
  />
)
const DeleteButton = props => (
  <IconButton
    name="close"
    color="error"
    size={16}
    p={1}
    circle
    aria-label="Delete this comment"
    {...props}
  />
)

// NOTE(@lachlanjc): this would be nicer as stateless, but react-flip-move needs
// refs, so it has to be a class.
class Comment extends Component {
  render() {
    const {
      id,
      following,
      createdAt,
      mine,
      parent,
      user,
      body,
      onReply,
      onDelete
    } = this.props
    const emoji = onlyContainsEmoji(body)
    return (
      <Root
        mt={following ? 0 : 3}
        flexDirection={mine ? 'row-reverse' : 'row'}
        align="center"
      >
        {following ? (
          mine ? (
            <DeleteButton bg="red.0" onClick={e => onDelete(id)} />
          ) : (
            <ReplyButton bg="blue.0" onClick={e => onReply(id)} />
          )
        ) : mine ? (
          <NestedAvi>
            <DeleteButton onClick={e => onDelete(id)} />
            <Avi email={user.email} size={28} />
          </NestedAvi>
        ) : (
          <NestedAvi>
            <ReplyButton onClick={e => onReply(id)} />
            <Avi email={user.email} size={28} />
          </NestedAvi>
        )}
        <Group mine={mine}>
          {!following && (
            <Byline mine={mine}>
              <Text.span bold>{user.username}</Text.span>
              <Time title={createdAt} children={timeSince(createdAt)} />
            </Byline>
          )}
          <Bubble emoji={emoji} mine={mine}>
            {!isEmpty(parent) && (
              <QuotedComment
                bg={emoji ? 'snow' : 'white'}
                px={3}
                py={2}
                data={parent}
              />
            )}
            {emoji ? <Megamoji children={body} /> : <Body source={body} />}
          </Bubble>
        </Group>
      </Root>
    )
  }
}

export default Comment

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  following: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  parent: PropTypes.object,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
