import React from 'react'
import { Box, theme } from '@hackclub/design-system'
import styled from 'styled-components'
import Animator from 'components/Animator'

const Base = styled(Box.section)`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 36rem;
  max-height: 64rem;
  padding: ${theme.space[4]}px;
  padding-top: ${theme.space[5]}px;
`

const Photo = styled.img`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  ~ * {
    z-index: 2;
    position: relative;
  }
`

const Frame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  pointer-events: none;
`

const BorderBase = styled.div`
  position: absolute;
  z-index: 4;
  background: white;
`

const BorderTop = styled(BorderBase)`
  top: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  min-height: ${theme.space[4]}px;
  transform-origin: center top;
`

const BorderRight = styled(BorderBase)`
  top: 0;
  right: 0;
  width: 5vw;
  height: 100%;
  min-width: ${theme.space[3]}px;
  transform-origin: right center;
`

const BorderBottom = styled(BorderBase)`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  transform-origin: center bottom;
`

const BorderLeft = styled(BorderBase)`
  top: 0;
  left: 0;
  width: 5vw;
  height: 100%;
  min-width: ${theme.space[3]}px;
  transform-origin: left center;
`

const x = { transform: [{ scaleX: 0 }, { scaleX: 1 }] }
const y = { transform: [{ scaleY: 0 }, { scaleY: 1 }] }

const BorderX = props => <Animator data={x} {...props} />
const BorderY = props => <Animator data={y} {...props} />

const Framed = ({ imageSrc, imageAlt, imageStyle, children, ...props }) => (
  <Base {...props}>
    <Frame>
      <BorderY is={BorderTop} />
      <BorderX is={BorderRight} />
      <BorderY is={BorderBottom} />
      <BorderX is={BorderLeft} />
    </Frame>
    <Photo src={imageSrc} alt={imageAlt} style={imageStyle} />
    {children}
  </Base>
)

export default Framed
