import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Flex,
  Icon,
  Text,
  Hide,
  theme
} from '@hackclub/design-system'
import { Headline, Subhline, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import Sheet from 'components/Sheet'

const Base = styled(Box.section).attrs({
  bg: 'darker',
  color: 'gray.3',
  py: [5, 6, 7]
})``

const Percentage = styled(Flex).attrs({
  justify: 'center',
  bg: 'black',
  color: 'success',
  fontSize: [8, 84]
})`
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  border-radius: ${theme.pill};
  font-weight: bold;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.125);
  &:after {
    content: '%';
    vertical-align: super;
    line-height: 6rem;
    font-size: 37.5%;
    font-weight: normal;
    margin-left: ${theme.space[1]}px;
    color: ${theme.colors.muted};
  }
  ${theme.mediaQueries.md} {
    width: 8rem;
    height: 8rem;
    line-height: 8.5rem;
    &:after {
      line-height: 8rem;
    }
  }
`

const List = styled(Text.withComponent('ol')).attrs({ pl: 0 })`
  list-style: none;
  ${theme.mediaQueries.md} {
    column-count: 2;
    column-gap: ${theme.space[4]}px;
  }
  li {
    line-height: 1.25;
    break-inside: avoid;
    display: flex;
    align-items: center;
    padding-bottom: ${theme.space[2]}px;
  }
`

List.Item = props => (
  <Fade bottom>
    <li>
      <Icon glyph="enter" color="muted" size={32} mr={2} />
      <Text.span fontSize={3} {...props} />
    </li>
  </Fade>
)

export default () => (
  <Base>
    <Container px={3}>
      <Box mb={[4, 5]}>
        <Headline>Everything you’ll need.</Headline>
        {/* <Lead fontSize={[3, 4]} color="muted" maxWidth={48} mx={0}>
          Everything you need to start an amazing hackathon.
          <br />
          Fill out a simple form and we help handle the rest.
        </Lead> */}
      </Box>
      <List>
        {[
          'Physical debit cards',
          'G Suite with domain email addresses',
          'Tax filings',
          'Legal entity',
          '501(c)(3) status-backed bank account',
          'Instant invoice sending',
          'Collect donations via card, check, or ACH',
          'Real-time dashboard of finances',
          'Share access with your whole team',
          'Pre-written legal forms for event attendees',
          'Record shared notes on transactions',
          'Transaction data export',
          'Dedicated point of contact',
          '12-hour response support',
          'Community of dozens of experienced organizers',
          'Reimbursement process'
        ].map(item => (
          <List.Item key={item} children={item} />
        ))}
      </List>
    </Container>
    <Container px={3} mt={[5, 6]}>
      <Flex justify="center" align="center" wrap>
        <Text fontSize={[4, 5]} mr={3}>
          You pay just
        </Text>
        <Percentage>7</Percentage>
        <Hide fontSize={[4, 5]} xs sm mr={3}>
          {'. '}
        </Hide>
        <Text fontSize={[4, 5]}>No hidden fees, ever.</Text>
      </Flex>
    </Container>
  </Base>
)
