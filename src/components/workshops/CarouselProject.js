import React, { Component, Fragment } from 'react'
import api from 'api'
import {
  Box,
  Flex,
  Label,
  Heading,
  Link as A,
  Text,
  Image,
  Button,
  IconButton,
  theme,
} from '@hackclub/design-system'

class CarouselProject extends Component {
  render() {
    const { project, isOriginal = false, liveFrame = false } = this.props
    const { user = null, live_url, code_url, screenshot } = project

    const username = user && user.username ? user.username : '???'

    const authorString = isOriginal
      ? `Original by ${username}`
      : `Rehacked by ${username}`

    const imageUrl = liveFrame
      ? (function() {
          const url = live_url.startsWith('http') ? url : 'http://' + url
          const accessKey = 'd7d3cada424e0439f48de1a1b50160dd'
          return `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${url}&viewport=1440x900&format=PNG`
        })()
      : 'http://api.hackclub.com' + screenshot.file_path

    return (
      <Flex
        mx={0}
        my={1}
        pl={isOriginal ? 3 : 3}
        pr={isOriginal ? 3 : 3}
        py={3}
        bg="#FFF"
        style={{
          borderBottomLeftRadius: isOriginal ? 20 : 5,
          borderBottomRightRadius: isOriginal ? 5 : 20,
          borderTopLeftRadius: isOriginal ? 20 : 5,
          borderTopRightRadius: isOriginal ? 5 : 20,
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column',
        }}
      >
        <Heading.h4
          mb={2}
          style={{
            alignSelf: isOriginal ? 'flex-end' : 'flex-start',
          }}
        >
          {authorString}
        </Heading.h4>
        <Box
          mb={2}
          style={{
            paddingBottom: '50%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 5,
            border: '2px solid #F0F0F0',
          }}
        >
          <Image
            src={imageUrl}
            style={{
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </Box>
        <Flex
          m={0}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <A mr={2} href={live_url} style={{ whiteSpace: 'nowrap' }}>
            Live Version
          </A>
          <A ml={2} href={code_url}>
            Code
          </A>
        </Flex>
      </Flex>
    )
  }
}

export default CarouselProject
