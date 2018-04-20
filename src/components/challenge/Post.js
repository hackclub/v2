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
import { dt } from 'helpers'
import { kebabCase } from 'lodash'

const Row = Flex.extend`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
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
  cursor: ${props => props.cursor};
`

const year = new Date().getFullYear()
const shortDt = d =>
  dt(d)
    .replace(`/${year}`, '')
    .replace(`${year}-`, '')

const Post = ({
  name,
  url,
  description,
  createdAt,
  mine,
  upvotes,
  upvoted = false,
  onUpvote,
  disabled
}) => (
  <Row py={[2, 3]} id={kebabCase(name)}>
    <UpvoteButton
      bg={upvoted ? 'primary' : 'smoke'}
      color={upvoted ? 'white' : 'slate'}
      onClick={onUpvote}
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      <Icon name="arrow_upward" />
      <Text.span ml={1} f={2} children={upvotes} />
    </UpvoteButton>
    <Link href={url} target="_blank" color="black">
      <Box w={1} px={3}>
        <Heading.h3 f={3} m={0} children={name} />
        <Text color="muted" f={2}>
          {description}
        </Text>
      </Box>
      <Flex flexDirection="column" align="center">
        <Icon name="open_in_new" color="info" size={24} />
        <Text.span f={0} mt={1} color="muted">
          {shortDt(createdAt)}
        </Text.span>
      </Flex>
    </Link>
  </Row>
)

Post.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  mine: PropTypes.bool,
  disabled: PropTypes.bool,
  upvotes: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired
}

export default Post
