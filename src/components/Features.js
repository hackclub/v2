import React from 'react'
import { Heading, Container, Flex, Box, Image, Text, Subhead } from 'rebass'
import Icon from './Icon'
import { colors, cx, mx, mm, wk } from '../theme'

const Base = Container.extend.attrs({
  maxWidth: '100%',
  mt: 64 * -3,
  pt: 64 * 3,
  pw: 64,
  w: 1
})`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: ${64 * -1}px;
    z-index: -1;
    background: ${cx('gray.1')};
    ${wk('clip-path: polygon(0% 0%, 100% 0, 100% 75%, 0 100%)')}
    background-size: auto 100%;
    background-position-x: .5rem;
  }
`

const BannerImage = Image.extend.attrs({
  p: 16,
  w: 500,
  h: 350
})`
  display: inline-block;
  ${mx[3]} {
    transform: translate(0, 64px);
  }
`

const Section = Container.extend.attrs({
  maxWidth: 48 * 16
})`
  display: inline-block;
  text-align: left;
`

const CenteringContainer = Container.extend.attrs({
  mx: 'auto',
  maxWidth: 'none'
})`
  text-align: center;
`

const TextBlock = Text.extend.attrs({
  f: 4,
  my: 16
})``

const Bold = Text.extend.attrs({
  is: 'span',
  bold: true
})``

export default ({ headline = true, ...props }) => (
  <Base id="features" {...props}>
    <CenteringContainer>
      <Section id="section">
        <TextBlock>
          <Bold>What we do.</Bold> The Recurse Center is a self-directed,
          community-driven educational retreat for programmers in New York City.
        </TextBlock>
        <TextBlock>
          <Bold>Our philosophy.</Bold> We believe people learn best when they take
          control of their own education and are free to explore what they’re
          interested in. RC is heavily influenced by unschooling.
        </TextBlock>
        <TextBlock>
          <Bold>Never graduate.</Bold> RC doesn’t end after you leave. We have a
          diverse, active, and engaged alumni community of over 1,100 smart,
          enthusiastic, helpful programmers all over the world.
        </TextBlock>
        <TextBlock>
          <Bold>Build a career.</Bold> We’re here to support you at every stage of
          your career, whether you’re looking for a new job or not, and whether you
          just finished RC or attended many years ago.
        </TextBlock>
      </Section>
      <BannerImage src="/hacking.png" />
    </CenteringContainer>
  </Base>
)
