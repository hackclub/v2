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
  p: [2, 3, 4],
  bg: 'white',
  justify: 'flex-end',
})`
  position: relative;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  background-image: url(${props => props.backgroundSrc});
  background-size: cover;
  background-position: center;
  border-radius: ${props =>
    props.isOriginal ? '10px 0px 0px 10px' : '0px 10px 10px 0px'};
  ${theme.mediaQueries.md} {
    border-radius: ${props =>
      props.isOriginal ? '20px 5px 5px 20px' : '5px 20px 20px 5px'};
    align-items: stretch;
    background-image: none;
  }

  .left {
    display: none;
    align-items: flex-end;
  }
  .right {
    align-items: flex-start;
  }
`

const TextBar = styled(Flex).attrs({
  p: [1, 1, 0],
  mb: 0,
  m: 0,
  bg: ['white', 'white', 'none'],
})`
  flex-direction: column;
  margin-top: 40px;
  opacity: 0.8;
  flex-grow: 1;
  border-radius: ${props =>
    props.isOriginal ? '10px 0px 0px 10px' : '0px 10px 10px 0px'};
  ${theme.mediaQueries.md} {
    opacity: 1;
    flex-grow: 0;
    margin-top: 0px;
    align-items: center top;
    justify-content: space-between;
    flex-direction: ${props => (props.isOriginal ? 'row-reverse' : 'row')};
  }

  .left {
    align-items: flex-end;
  }
  .right {
    align-items: flex-start;
  }
`
const LinkBar = styled(Flex).attrs({
  m: 0,
  mb: 0,
  mx: 1,
  p: 0,
})``

const AuthorLabel = styled(Label).attrs({
  m: 0,
  mx: 1,
  fontSize: 3,
})`
  white-space: nowrap;
`

const ImageWrapper = styled(Box).attrs({
  mb: 2,
})`
  padding-bottom: 50%;
  position: relative;
  overflow: hidden;
  border-radius: 5;
  border: 2px solid #f0f0f0;
  display: none;
  ${theme.mediaQueries.md} {
    display: inherit;
  }
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
        backgroundSrc={imageUrl}
        isOriginal={isOriginal}
        style={
          {
            // borderBottomLeftRadius: isOriginal ? 20 : 5,
            // borderBottomRightRadius: isOriginal ? 5 : 20,
            // borderTopLeftRadius: isOriginal ? 20 : 5,
            // borderTopRightRadius: isOriginal ? 5 : 20,
          }
        }
      >
        <ImageWrapper>
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
        </ImageWrapper>
        <TextBar isOriginal={isOriginal}>
          <AuthorLabel isOriginal={isOriginal}>{authorString}</AuthorLabel>
          <LinkBar>
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
