import React from 'react'
import styled from 'styled-components'
import { Flex, Link, Avatar } from '@hackclub/design-system'
import { isEmpty } from 'lodash'

const Mention = styled(Link).attrs({ color: 'inherit' })`
  display: inline-flex;
  align-items: center;
`

const Author = ({ text, ...props }) => {
  if (isEmpty(text)) return null
  // This iterates over each word in authorText, finds GitHub usernames (any
  // text that looks like "@orpheus", and turns them into links.
  const parsedAuthorText = text.split(' ').map((word, index, arr) => {
    const matches = word.match(/@(\w+)/)
    const processedWord = matches ? (
      <Mention href={`https://github.com/${matches[1]}`} target="_blank" ml={1}>
        <Avatar src={`https://github.com/${matches[1]}.png`} size={24} mr={1} />
        {word}
      </Mention>
    ) : (
      word
    )

    // This pads returned results with spaces, making our final array look the
    // following:
    //   [ 'Hack', ' ', 'Club', ' ', 'staff' ]
    // if last item in array, don't give an extra space
    return index === arr.length - 1 ? processedWord : [processedWord, ' ']
  })

  return (
    <Flex align="center" justify="center" {...props}>
      By {parsedAuthorText}
    </Flex>
  )
}

export default Author
