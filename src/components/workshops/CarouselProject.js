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
  state = { status: 'loading' }

  render() {
    const { project, isOriginal = false, liveFrame = false } = this.props
    const { user = null, live_url, code_url, screenshot } = project

    const username = user && user.username ? user.username : '???'

    const authorString = isOriginal
      ? `Original by ${username}`
      : `Rehacked by ${username}`

    const imageUrl = liveFrame
      ? (function() {
          const url = live_url
          const accessKey = 'd7d3cada424e0439f48de1a1b50160dd'
          return `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${url}&viewport=1440x900&format=PNG`
        })()
      : 'http://api.hackclub.com' + screenshot.file_path

    return (
      <Flex
        m={1}
        p={4}
        bg="#FFF"
        style={{
          borderRadius: 5,
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column',
        }}
      >
        <Heading.h4
          m={1}
          style={{
            alignSelf: isOriginal ? 'flex-end' : 'flex-start',
          }}
        >
          {authorString}
        </Heading.h4>
        <Box
          m={1}
          style={{
            paddingBottom: '50%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid #EEE',
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
          m={2}
          style={{
            justifyContent: 'space-between',
          }}
        >
          <A href={live_url}>Live Version</A>
          <A href={code_url}>Code</A>
        </Flex>
      </Flex>
    )
  }
}

export default CarouselProject
