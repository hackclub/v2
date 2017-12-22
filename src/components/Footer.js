import React from 'react'
import { Subhead, Container, Flex, Box, Text, Row, Column } from 'rebass'
import { Link } from 'react-static'
import Icon from './Icon'
import { mx, geo, grays } from '../theme'

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
  <Box is="a" target="_blank" href={href} mx={2} {...props}>
    <Icon name={icon} size={size} fill={fill} />
  </Box>
)

const Footer = () => (
  <Base>
    <Container>
      <Row w={1} wrap>
        <LeftCol>
          <Subhead>Learn like a hacker.</Subhead>
        </LeftCol>
        <RightCol>
          <Flex align="center" mx={-2}>
            <Service href="/slack_invite" icon="slack" />
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
            <Text is="a" href="https://conduct.hackclub.com" color="info">
              Read our Code of Conduct
            </Text>
          </Text>
          <Text f={1} color="muted" mt={3}>
            © 2017 Hack Club
          </Text>
        </RightCol>
      </Row>
    </Container>
  </Base>
)

export default Footer
