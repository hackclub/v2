import React from 'react'
import { Flex, Box, Heading, Text, Link as A } from '@hackclub/design-system'
import { Link } from 'react-static'
import Icon from './Icon'
import { mx, geo } from '../theme'

const Base = Flex.withComponent('footer').extend`
  ${props => geo(props.theme.colors.snow)};
  div { flex: 1 1 auto; }
`

const LeftCol = Box.withComponent('aside').extend.attrs({
  px: 3,
  mb: 2,
  w: [1, 1 / 2],
  align: ['left', 'right']
})``
const RightCol = Box.withComponent('article').extend.attrs({
  px: 3,
  w: [1, 1 / 2]
})``

const Service = ({ href, icon, ...props }) => (
  <A target="_blank" href={href} mx={2} title={icon} {...props}>
    <Icon name={icon} size={32} fill="muted" alt={icon} />
  </A>
)

const Footer = () => (
  <Base flexDirection="column" alignItems="center" p={[4, 5]}>
    <Flex w={1} mx={-3} wrap>
      <LeftCol>
        <Heading.h3 bold m={0}>
          Learn like a hacker.
        </Heading.h3>
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
    </Flex>
    <Flex w={1} mx={-3} mt={3} wrap>
      <LeftCol>
        <Heading.h3 bold m={0}>
          Hack Club HQ
        </Heading.h3>
      </LeftCol>
      <RightCol>
        <Text m={0}>
          576 Natoma St<br />San Francisco, CA 94103
        </Text>
        <Text>Nonprofit EIN: 81-2908499</Text>
        <Text>
          <A href="https://conduct.hackclub.com" color="info" underline>
            Read our Code of Conduct
          </A>
        </Text>
        <Text f={1} color="muted" mt={3}>
          © 2018 Hack Club
        </Text>
      </RightCol>
    </Flex>
  </Base>
)

export default Footer
