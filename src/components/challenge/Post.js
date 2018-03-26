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
import { kebabCase } from 'lodash'

const Row = Flex.extend`
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.smoke};
`

const UpvoteButton = Button.button.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  box-shadow: none !important;
`

const Post = ({
  name,
  url,
  description,
  upvotes,
  upvoted = false,
  onUpvote
}) => (
  <Row py={[2, 3]} id={kebabCase(name)}>
    <UpvoteButton
      bg={upvoted ? 'primary' : 'smoke'}
      color={upvoted ? 'white' : 'slate'}
      onClick={onUpvote}
    >
      <Icon name="arrow_upward" />
      <Text.span ml={1} f={2} children={upvotes} />
    </UpvoteButton>
    <Link href={url} target="_blank" ml={3} color="black">
      <Heading.h3 f={3} m={0} children={name} />
      <Text color="muted" children={description} />
    </Link>
  </Row>
)

Post.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired
}

export default Post
