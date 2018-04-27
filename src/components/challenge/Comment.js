import React, { Fragment } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Text,
  cx
} from '@hackclub/design-system'
import Gravatar from 'react-gravatar'
import MarkdownBody from 'components/MarkdownBody'
import PropTypes from 'prop-types'
import { timeSince } from 'helpers'

const gradient = (a, b) =>
  `linear-gradient(to bottom, ${cx(a)} 0%, ${cx(b)} 100%)`

const Avi = Avatar.withComponent(Gravatar).extend`
  margin-top: 18px; // 14px (byline size) + 4px (margin)
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

const Bubble = MarkdownBody.extend`
  background-color: ${props =>
    props.mine ? props.theme.colors.primary : props.theme.colors.snow};
  background-image: ${props =>
    props.mine ? gradient('blue.5', 'blue.6') : gradient('gray.0', 'gray.1')};
  color: ${props =>
    props.mine ? props.theme.colors.white : props.theme.colors.black};
  border-radius: ${props => props.theme.space[3]}px;
  vertical-align: middle;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
  margin-top: ${props => props.theme.space[1]}px;
`

const Comment = ({ createdAt, mine, user, body, onDelete, ...props }) => (
  <Flex mt={3} flexDirection={mine ? 'row-reverse' : 'row'}>
    <Avi email={user.email} size={28} />
    <Group mine={mine}>
      <Byline mine={mine}>
        <Text.span bold>{user.email}</Text.span>
        <Time title={createdAt} children={timeSince(createdAt)} />
      </Byline>
      <Bubble mine={mine} fontSize="14px" lineHeight="1.375" children={body} />
    </Group>
  </Flex>
)

export default Comment

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  mine: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}
