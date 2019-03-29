import React, { Component } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
  theme,
  cx
} from '@hackclub/design-system'
import Gravatar from 'react-gravatar'
import ReactMarkdown from 'react-markdown'
import QuotedComment from 'components/challenge/QuotedComment'
import PropTypes from 'prop-types'
import { CommentByline, commentStyle } from 'components/challenge/style'
import { onlyContainsEmoji, timeSince } from 'helpers'
import { isEmpty } from 'lodash'
import styled, { css } from 'styled-components'

const gradient = (a, b) =>
  `linear-gradient(to bottom, ${cx(a)} 0%, ${cx(b)} 100%)`

const Root = styled(Flex)`
  button {
    transform: scale(0);
    will-change: transform;
    transition: 0.25s ${theme.transition} all;
    margin: 0;
  }
  &:hover button {
    transform: scale(1);
  }
`

const aviMargin = css`
  margin-top: 18px;
` // 14px (byline size) + 4px (margin)
const Avi = styled(Avatar.withComponent(Gravatar))`
  ${aviMargin};
`
const BlankAvi = styled(Box)`
  width: 28px;
  height: 28px;
`
const NestedAvi = styled(BlankAvi.withComponent('aside'))`
  ${aviMargin};
  position: relative;
  > button {
    position: absolute;
    background: rgba(255, 255, 255, 0.75);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      -webkit-backdrop-filter: saturate(180%) blur(2px);
    }
    ${theme.mediaQueries.reduceTransparency} {
      background: ${theme.colors.white} !important;
    }
  }
  img {
    margin-top: 0;
  }
`

const Group = styled(Flex)`
  flex-direction: column;
  flex: auto;
  max-width: 100%;
  align-items: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  margin-right: ${props => (props.mine ? theme.space[2] : 0)}px;
  margin-left: ${props => (props.mine ? 0 : theme.space[2])}px;
  text-align: left;
  &:hover time {
    opacity: 1;
  }
`

const Byline = CommentByline

const Time = styled(Text.withComponent('time'))`
  margin: 0 ${theme.space[2]}px;
  opacity: 0;
  transition: opacity 0.25s ${theme.transition};
`

const Bubble = styled(Box)`
  ${props =>
    !props.emoji &&
    css`
      background-color: ${props =>
        props.mine ? theme.colors.info : theme.colors.snow};
      background-image: ${props =>
        props.mine
          ? gradient('blue.5', 'blue.6')
          : gradient('gray.0', 'gray.1')};
      border-radius: 21px;
      min-height: 42px;
      padding: ${theme.space[1]}px;
    `};
  color: ${props => theme.colors[props.mine ? 'white' : 'black']};
  margin-top: ${theme.space[1]}px;
  max-width: 24rem;
`

const Body = styled(Box.withComponent(ReactMarkdown))`
  padding: 4px 8px;
  ${commentStyle};
`

const Megamoji = styled(Text)`
  font-size: ${theme.fontSizes[5]}px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`

const ReplyButton = props => (
  <IconButton
    glyph="reply"
    color="info"
    size={16}
    p={1}
    circle
    aria-label="Reply to this comment"
    style={{ marginTop: 0, marginLeft: 0 }}
    {...props}
  />
)
const DeleteButton = props => (
  <IconButton
    glyph="delete"
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
