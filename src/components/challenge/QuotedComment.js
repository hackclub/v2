import styled from 'styled-components'
import React from 'react'
import {
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  theme
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'
import { QuotedCommentByline, commentStyle } from 'components/challenge/style'

const DeleteButton = props => (
  <IconButton
    glyph="view-close"
    color="white"
    bg="muted"
    size={16}
    p={1}
    circle
    aria-label="Remove quoted comment"
    {...props}
  />
)

const Root = styled(Flex)`
  border-radius: 15px;
  align-items: flex-start;
  ~ .public-DraftEditorPlaceholder-inner {
    top: ${theme.space[2]}px !important;
  }
`

const Group = styled(Flex)`
  flex: 1 1 auto;
  flex-direction: column;
`

const Byline = QuotedCommentByline

const Body = styled(Box.withComponent(ReactMarkdown))`
  color: ${theme.colors.slate};
  border-left: 4px solid ${theme.colors.smoke};
  padding-left: ${theme.space[3]}px;
  margin-top: ${theme.space[1]}px;
  ${commentStyle};
`

const QuotedComment = ({ data, onDelete, ...props }) => (
  <Root {...props}>
    <Group mr={onDelete && 3}>
      <Byline color="gray.5">
        <Icon glyph="reply" size={16} />
        <Text.span
          color="muted"
          fontSize={1}
          mb={0}
          children={data.user.email}
        />
      </Byline>
      <Body source={data.body} />
    </Group>
    {onDelete && <DeleteButton onClick={onDelete} />}
  </Root>
)

export default QuotedComment
