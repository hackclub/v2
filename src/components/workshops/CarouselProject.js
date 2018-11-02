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
  theme,
} from '@hackclub/design-system'

const ProjectOuter = styled(Flex).attrs({
  p: [0, 0, 4],
  bg: 'white',
  justify: 'flex-end',
})`
  position: relative;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${props =>
    props.isOriginal ? '10px 0px 0px 10px' : '0px 10px 10px 0px'};

  ${theme.mediaQueries.md} {
    align-items: stretch;
    border-radius: ${props =>
      props.isOriginal ? '20px 5px 5px 20px' : '5px 20px 20px 5px'};
  }
`

const TextBar = styled(Flex).attrs({
  p: [1, 1, 0],
  bg: ['white', 'white', 'none'],
  justify: ['center', 'center', 'space-between'],
})`
  flex-direction: column;
  align-items: ${props => (props.isOriginal ? 'flex-end' : 'flex-start')};

  ${theme.mediaQueries.md} {
    align-items: stretch;
    justify-content: space-between;
    flex-direction: ${props => (props.isOriginal ? 'row-reverse' : 'row')};
  }
`
const LinkBar = styled(Flex).attrs({
  mx: 1,
})``

const AuthorLabel = styled(Label).attrs({
  mx: 1,
  fontSize: 3,
})`
  white-space: nowrap;
`

const ImageWrapper = styled(Box).attrs({
  mb: [0, 0, 2],
})`
  padding-bottom: 50%;
  position: relative;
  overflow: hidden;
  border-radius: 5;
  border-bottom: 2px solid #f0f0f0;
  ${theme.mediaQueries.md} {
    border: 2px solid #f0f0f0;
  }
`

const WrappedImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
      <ProjectOuter isOriginal={isOriginal}>
        <ImageWrapper>
          <WrappedImage src={imageUrl} />
        </ImageWrapper>
        <TextBar isOriginal={isOriginal}>
          <AuthorLabel isOriginal={isOriginal}>{authorString}</AuthorLabel>
          <LinkBar>
            <A mr={2} fontSize={3} href={live_url}>
              Live
            </A>
            <A ml={2} fontSize={3} href={code_url}>
              Code
            </A>
          </LinkBar>
        </TextBar>
      </ProjectOuter>
    )
  }
}

export default CarouselProject
