import React, { Component, Fragment } from 'react'
import api from 'api'
import styled from 'styled-components'
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

const ProjectOuter = styled(Flex).attrs({
  mx: 0,
  my: 1,
  py: 3,
  bg: '#FFF',
})`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
`

const TextBar = styled(Flex).attrs({
  m: 0,
  mb: 0,
})`
  flex-direction: column;
  align-items: ${props => (props.isOriginal ? 'flex-end' : 'flex-start')};
  ${theme.mediaQueries.md} {
    align-items: center;
    justify-content: space-between;
    flex-direction: ${props => (props.isOriginal ? 'row-reverse' : 'row')};
  }
`
const LinkBar = styled(Flex).attrs({
  m: 0,
  mb: 0,
})``

const AuthorHeading = styled(Heading.h4).attrs({
  m: 0,
  mx: 1,
})`
  white-space: nowrap;
`

class CarouselProject extends Component {
  render() {
    const { project, isOriginal = false, liveFrame = false } = this.props
    const { user = null, live_url, code_url, screenshot } = project

    const username = user && user.username ? user.username : '???'

    const authorString = isOriginal ? `By ${username}` : `By ${username}`

    const imageUrl = liveFrame
      ? (function() {
          const url = live_url.startsWith('http') ? url : 'http://' + url
          const accessKey = 'd7d3cada424e0439f48de1a1b50160dd'
          return `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${url}&viewport=1440x900&format=PNG`
        })()
      : 'http://api.hackclub.com' + screenshot.file_path

    return (
      <ProjectOuter
        pl={isOriginal ? 3 : 3}
        pr={isOriginal ? 3 : 3}
        isOriginal={isOriginal}
        style={{
          borderBottomLeftRadius: isOriginal ? 20 : 5,
          borderBottomRightRadius: isOriginal ? 5 : 20,
          borderTopLeftRadius: isOriginal ? 20 : 5,
          borderTopRightRadius: isOriginal ? 5 : 20,
        }}
      >
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
        <TextBar isOriginal={isOriginal}>
          <AuthorHeading
            isOriginal={isOriginal}
            pl={isOriginal ? 1 : 0}
            pr={isOriginal ? 0 : 1}
          >
            {authorString}
          </AuthorHeading>
          <LinkBar mx={1} pl={isOriginal ? 0 : 0} pr={isOriginal ? 0 : 0}>
            <A
              fontSize={3}
              m={0}
              mr={2}
              px={0}
              p={0}
              href={live_url}
              style={{ whiteSpace: 'nowrap' }}
            >
              Live
            </A>
            <A m={0} ml={2} fontSize={3} px={0} p={0} href={code_url}>
              Code
            </A>
          </LinkBar>
        </TextBar>
      </ProjectOuter>
    )
  }
}

export default CarouselProject
