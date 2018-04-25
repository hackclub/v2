import React, { Fragment } from 'react'
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
import { dt, tinyDt } from 'helpers'
import { kebabCase } from 'lodash'

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

const Post = ({
  name,
  url,
  description,
  createdAt,
  mine,
  comments,
  upvotes,
  upvoted = false,
  onUpvote,
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
      <Text.span ml={1} f={2} children={upvotes} />
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
    <CommentButton>
      <Icon
        name="chat_bubble"
        color={comments === 0 ? 'gray.5' : 'info'}
        size={32}
      />
      <Text.span bold color="white" children={comments} />
    </CommentButton>
  </Row>
)
Post.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  mine: PropTypes.bool,
  disabled: PropTypes.bool,
  comments: PropTypes.number.isRequired,
  upvotes: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired
}
export default Post
