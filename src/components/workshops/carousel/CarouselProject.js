import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { isURL } from 'validator'
import {
  Box,
  Flex,
  Link as A,
  Text,
  Image,
  theme
} from '@hackclub/design-system'
import Sheet from 'components/Sheet'

const ProjectOuter = styled(Sheet).attrs({
  bg: 'white',
  p: 0,
  mx: [0, 2],
  mb: 2
})`
  flex-shrink: 0;
  min-width: 16rem;
  max-width: 100%;
  ${theme.mediaQueries.sm} {
    width: 20rem;
  }
  ${theme.mediaQueries.md} {
    width: 24rem;
  }
`

const TextBar = styled(Flex).attrs({
  p: 1,
  flexDirection: 'column',
  justify: ['center', null, 'space-between']
})`
  flex-grow: 0;
  align-items: center;
`

const LinkBar = styled(Flex).attrs({
  mx: 1
})``

const DeadLink = styled(Text.span).attrs({
  fontSize: 3,
  color: 'muted'
})`
  text-decoration: line-through;
`

const AuthorLabel = styled(Text).attrs({
  mx: 1,
  fontSize: 3,
  color: 'slate'
})`
  white-space: nowrap;
  strong {
    color: ${theme.colors.black};
  }
`

const ImageWrapper = styled(Box).attrs({
  mb: [0, null, 2]
})`
  padding-bottom: 50%;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid ${theme.colors.snow};
`

const WrappedImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const WrappedText = styled(Text).attrs({ color: 'muted', align: 'center' })`
  transform: rotate(-3deg);
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
`

const CarouselProject = ({ project, liveFrame = false, m = 2 }) => {
  const { user = null, empty = false, live_url, code_url, screenshot } = project

  const authorString =
    user && user.username ? (
      <Fragment>
        By <strong>{user.username}</strong>
      </Fragment>
    ) : (
      '¯\\_(ツ)_/¯'
    )

  const imageUrl = liveFrame
    ? (() => {
        const url = live_url.startsWith('http') ? url : `http://${url}`
        const accessKey = 'd7d3cada424e0439f48de1a1b50160dd'
        return `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${url}&viewport=1440x900&format=PNG`
      })()
    : `http://api.hackclub.com${screenshot.file_path}`

  return (
    <ProjectOuter m={m}>
      <ImageWrapper>
        {empty ? (
          <WrappedText>
            no examples here yet…
            <br />
            you should submit one!
          </WrappedText>
        ) : (
          <WrappedImage src={imageUrl} alt={authorString} />
        )}
      </ImageWrapper>
      <TextBar>
        <AuthorLabel>{authorString}</AuthorLabel>
        <LinkBar fontSize={3}>
          {isURL(live_url) ? (
            <A mr={2} href={live_url} children="Live" />
          ) : (
            <DeadLink mr={2}>Live</DeadLink>
          )}
          {isURL(code_url) ? (
            <A ml={2} href={code_url} children="Code" />
          ) : (
            <DeadLink ml={2}>Code</DeadLink>
          )}
        </LinkBar>
      </TextBar>
    </ProjectOuter>
  )
}

export default CarouselProject
