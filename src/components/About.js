import React from 'react'
import { Heading, Container, Flex, Box, Image, Text, Subhead } from 'rebass'
import Icon from './Icon'
import { colors, cx, mx, mm, wk } from '../theme'

const defaultBackgroundColor = cx('gray.1')

const Base = Container.extend.attrs({
  maxWidth: '100%',
  mt: 64 * -3,
  pt: 64 * 3.5,
  pb: 64 * 2.5,
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
    bottom: -64px;
    z-index: -1;
    ${wk('clip-path: polygon(0% 0%, 100% 0, 100% 75%, 0 100%)')}
    background-color: ${props => props.backgroundcolor || defaultBackgroundColor};
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
})`
  ${mm[1]} {
    font-size: 16px !important;
  }
`

const Bold = Text.extend.attrs({
  is: 'span',
  bold: true
})``

export default ({ ...props }) => (
  <Base id="about" {...props}>
    <CenteringContainer>
      <Section id="section">
        <TextBlock>
          <Bold>What it looks like.</Bold> Every week, you and around 20 other
          students come together to build. Meetings are like mini-hackathons.
          People are working on projects, you lead workshops to introduce new
          technologies, you and your co-leads are constantly mentoring. Your
          members start with no experience.
        </TextBlock>
        <TextBlock>
          <Bold>How it works.</Bold> You, a student who knows how to code, get
          1 - 2 others to start a Hack Club. You apply, we accept you, you use
          the community's open source materials and remote office hours with the
          staff to get your club started.
        </TextBlock>
        <TextBlock>
          <Bold>Our philosophy.</Bold> We think people learn best when they take
          control of their own education. At Hack Club, there are no teachers.
          No lectures. Your job is to facilitate and provide guidance through
          mentoring. Hack Club is heavily inspired by unschooling.
        </TextBlock>
      </Section>
      <BannerImage src="/about_hacking.jpg" />
    </CenteringContainer>
  </Base>
)
