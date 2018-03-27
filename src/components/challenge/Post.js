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
  a {
    display: inline-flex;
    align-items: center;
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
`

const Post = ({
  name,
  url,
  description,
  createdAt,
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
    <Link href={url} target="_blank" color="black">
      <Box w={1} px={3}>
        <Heading.h3 f={3} m={0} children={name} />
        <Text color="muted" f={2} children={description} />
      </Box>
      <Icon name="open_in_new" color="gray.4" size={20} />
    </Link>
  </Row>
)

Post.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  upvotes: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired
}

export default Post
