import React, { Fragment } from 'react'
import { Box, Flex, Text, Icon, IconButton } from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'
import { QuotedCommentByline, commentStyle } from 'components/challenge/style'
import MarkdownBody from 'components/MarkdownBody'
import PropTypes from 'prop-types'

const DeleteButton = props => (
  <IconButton
    name="close"
    color="white"
    bg="muted"
    size={16}
    p={1}
    circle
    aria-label="Remove quoted comment"
    {...props}
  />
)

const Root = Flex.extend`
  border-radius: 15px;
  align-items: flex-start;

  ~ .public-DraftEditorPlaceholder-inner {
    top: ${({ theme }) => theme.space[2]}px !important;
  }
`

const Group = Flex.extend`
  flex: 1 1 auto;
  flex-direction: column;
`

const Byline = QuotedCommentByline

const Body = Box.withComponent(ReactMarkdown).extend`
  color: ${({ theme }) => theme.colors.slate};
  border-left: 4px solid ${({ theme }) => theme.colors.smoke};
  padding-left: ${({ theme }) => theme.space[3]}px;
  margin-top: ${({ theme }) => theme.space[1]}px;
  ${commentStyle};
`

const QuotedComment = ({ data, onDelete, ...props }) => (
  <Root {...props}>
    <Group mr={onDelete && 3}>
      <Byline>
        <Icon name="reply" size={16} color="gray.5" />
        <Text.span color="muted" f={1} mb={0} children={data.user.email} />
      </Byline>
      <Body source={data.body} />
    </Group>
    {onDelete && <DeleteButton onClick={onDelete} />}
  </Root>
)

export default QuotedComment
