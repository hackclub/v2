import React from 'react'
import { Subhead, Container, Flex, Box, Text, Row, Column, Link } from 'rebass'
import Icon from './Icon'
import { mx, geo, grays } from './theme'

const Base = Box.extend.attrs({ is: 'footer', py: 5, px: 2 })`
  ${geo(grays.snow)};
`

const LeftCol = Column.extend.attrs({ w: [1, 0.4], mb: 2 })`
  ${mx[1]} {
    text-align: right;
  }
`
const RightCol = Column.extend.attrs({ w: [1, 0.6] })`
  text-align: left;
`

const Service = ({ href, icon, fill = 'muted', size = 32, ...props }) => (
  <Link target="_blank" href={href} mx={2} {...props}>
    <Icon name={icon} size={size} fill={fill} />
  </Link>
)

const Footer = () => (
  <Base>
    <Container>
      <Row w={1} wrap>
        <LeftCol>
          <Subhead>Join the Club</Subhead>
        </LeftCol>
        <RightCol>
          <Flex align="center" mx={-2}>
            <Service href="https://hackclub.com/slack_invite" icon="slack" />
            <Service href="https://twitter.com/starthackclub" icon="twitter" />
            <Service href="https://github.com/hackclub" icon="github" />
            <Service
              href="https://www.instagram.com/starthackclub"
              icon="instagram"
            />
            <Service
              href="https://www.facebook.com/Hack-Club-741805665870458"
              icon="facebook"
            />
            <Service href="mailto:team@hackclub.com" icon="mail_outline" />
          </Flex>
        </RightCol>
      </Row>
      <Row w={1} wrap>
        <LeftCol>
          <Subhead>Hack Club</Subhead>
        </LeftCol>
        <RightCol>
          <Text>
            576 Natoma St<br />San Francisco, CA 94103
          </Text>
          <Text mt={2}>Nonprofit EIN: 81-2908499</Text>
          <Text mt={2}>
            <Link href="https://conduct.hackclub.com" color="info">
              Read our Code of Conduct
            </Link>
          </Text>
          <Text f={1} color="silver" mt={3}>
            © 2017 Hack Club.
          </Text>
        </RightCol>
      </Row>
    </Container>
  </Base>
)

export default Footer
