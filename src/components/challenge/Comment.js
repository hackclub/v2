import React, { Fragment } from 'react'
import { Avatar, Box, Flex, Text, cx } from '@hackclub/design-system'
import Gravatar from 'react-gravatar'
import ReactMarkdown from 'react-markdown'
import MarkdownBody from 'components/MarkdownBody'
import PropTypes from 'prop-types'
import { timeSince } from 'helpers'

const gradient = (a, b) =>
  `linear-gradient(to bottom, ${cx(a)} 0%, ${cx(b)} 100%)`

const Avi = Avatar.withComponent(Gravatar).extend`
  margin-top: 18px; // 14px (byline size) + 4px (margin)
`
const BlankAvi = Box.extend`
  width: 27px;
  height: 27px;
`

const Group = Flex.extend`
  flex-direction: column;
  flex: auto;
  max-width: 100%;
  align-items: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  margin-right: ${props => (props.mine ? props.theme.space[2] : 0)}px;
  margin-left: ${props => (props.mine ? 0 : props.theme.space[2])}px;
  &:hover time {
    opacity: 1;
  }
`

const Byline = Flex.withComponent('p').extend`
  margin: 0;
  line-height: 1;
  flex-direction: ${props => (props.mine ? 'row-reverse' : 'row')};
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes[1]}px;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  max-width: 100%;
`

const Time = Text.withComponent('time').extend`
  margin: 0 ${props => props.theme.space[2]}px;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  &:hover {
    transition: opacity 0.25s ease-in;
  }
`

const Bubble = Box.withComponent(ReactMarkdown).extend`
  background-color: ${props =>
    props.mine ? props.theme.colors.info : props.theme.colors.snow};
  background-image: ${props =>
    props.mine ? gradient('blue.5', 'blue.6') : gradient('gray.0', 'gray.1')};
  color: ${props =>
    props.mine ? props.theme.colors.white : props.theme.colors.black};
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.375;
  min-height: 36px;
  vertical-align: middle;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;
  padding: ${props => props.theme.space[2]}px ${props =>
  props.theme.space[3]}px;
  margin-top: ${props => props.theme.space[1]}px;

  > :first-child {
    margin-top: 0 !important;
  }
  > :last-child {
    margin-bottom: 0 !important;
  }

  h1,
  h2,
  h3 {
    font-size: inherit;
    margin-top: 0;
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  ol,
  ul,
  blockquote {
    padding-left: ${props => props.theme.space[3]}px;
  }

  blockquote {
    border-left: 2px solid currentColor;
    padding-left: ${props => props.theme.space[2]}px;
    margin-left: 0;
  }

  p,
  li {
    margin-top: ${props => props.theme.space[1]}px;
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`

const Comment = ({
  following,
  createdAt,
  mine,
  user,
  body,
  onDelete,
  ...props
}) => (
  <Flex mt={following ? 0 : 3} flexDirection={mine ? 'row-reverse' : 'row'}>
    {following ? <BlankAvi /> : <Avi email={user.email} size={27} />}
    <Group mine={mine}>
      {!following && (
        <Byline mine={mine}>
          <Text.span bold>{user.email}</Text.span>
          <Time title={createdAt} children={timeSince(createdAt)} />
        </Byline>
      )}
      <Bubble mine={mine} source={body} />
    </Group>
  </Flex>
)

export default Comment

Comment.propTypes = {
  following: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}
