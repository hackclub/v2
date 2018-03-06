import React from 'react'
import { Flex, Box, Heading, Text, Link as A } from '@hackclub/design-system'
import Link from 'gatsby-link'
import Icon from 'components/Icon'
import { geo } from 'theme'

const Base = Box.footer.extend`
  ${props => geo(props.theme.colors.snow)};
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.space[4]}px;
  }
`

const Service = ({ href, icon, ...props }) => (
  <A target="_blank" rel="noopener" href={href} mx={2} title={icon} {...props}>
    <Icon name={icon} size={32} fill="muted" alt={icon} />
  </A>
)

const Footer = () => (
  <Base p={[4, 5]}>
    <Heading.h3 bold m={0} align={['left', 'right']}>
      Join the Club
    </Heading.h3>
    <Flex align="center" mx={-2} wrap>
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
    <Heading.h3 bold m={0} align={['left', 'right']}>
      Hack Club HQ
    </Heading.h3>
    <Box>
      <Text m={0}>
        576 Natoma St<br />San Francisco, CA 94103
      </Text>
      <Text my={2}>Nonprofit EIN: 81-2908499</Text>
      <Text my={2}>
        <A href="https://conduct.hackclub.com" color="info" underline>
          Read our Code of Conduct
        </A>
      </Text>
      <Text f={1} color="muted" m={0}>
        © {new Date().getFullYear()} Hack Club
      </Text>
    </Box>
  </Base>
)

export default Footer
