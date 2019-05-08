import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Text,
  Sheet,
  Container,
  Link as A,
  BlockLink,
  LargeButton
} from '@hackclub/design-system'
import { Headline, Featline, Lead } from 'components/Content'
import { Section, SectionTitle, Cols, theme } from './style'
import range from 'lodash/range'
import includes from 'lodash/includes'

const SheetLink = styled(Sheet.withComponent(BlockLink)).attrs({
  target: '_blank',
  bg: theme.colors.darkless
})``

const cta = {
  target: '_blank',
  chevronRight: true,
  scale: true,
  fontSize: [3, 4]
}
const CTA = styled(LargeButton).attrs(cta)`
  background-image: ${theme.gradient(
    theme.colors.yellow,
    theme.colors.primary
  )};
`

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 4px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
  }
`

const CalDay = styled(Text.span).attrs({ color: 'smoke', bold: true })`
  line-height: 1;
  font-weight: ${theme.bold};
  user-select: none;

  &:nth-child(6),
  &:nth-child(7) {
    color: ${theme.colors.muted};
  }
`
const CalDate = styled(Text.span).attrs({ color: 'muted' })`
  line-height: 1.25;

  ${props =>
    props.active
      ? css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.red};
        `
      : css`
          user-select: none;
        `}
  ${props =>
    props.first &&
    css`
      border-radius: ${theme.pill} 0 0 ${theme.pill};
      font-weight: ${theme.bold};
    `}
  ${props =>
    props.last &&
    css`
      border-radius: 0 ${theme.pill} ${theme.pill} 0;
    `}
`
const active = i => (i >= 1 && i <= 5) || (i >= 15 && i <= 19) || i >= 29
const first = i => includes([1, 15, 29], i)
const last = i => includes([5, 19], i)

export default () => [
  <Section id="logistics">
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Registration</SectionTitle>
      <Cols cols="2fr 1fr" gap={[4, 5]}>
        <div>
          <Headline color="white" mb={3}>
            3 sessions. Pick&nbsp;yours.
          </Headline>
          <Lead mb={4}>
            We’re running three identical weeks of Hack Camp. Join us July
            1–5th, 15–19th, or July 29th–August 2nd. Camp runs 9am–4pm
            (weekdays).
          </Lead>
          <CTA href="https://camp-apply.hackclub.com/">Apply now</CTA>
        </div>
        <SheetLink href="https://camp-apply.hackclub.com/">
          <Text color="white" bold fontSize={3} mt={-1} mb={1}>
            July 2019
          </Text>
          <Calendar>
            {'M T W T F S S'.split(' ').map((i, n) => (
              <CalDay children={i} key={i + n} />
            ))}
            {range(1, 32).map(i => (
              <CalDate
                active={active(i)}
                first={first(i)}
                last={last(i)}
                children={i}
                key={i}
              />
            ))}
            {range(1, 5).map(i => (
              <CalDate
                active={i <= 2}
                last={i === 2}
                children={i}
                key={i + i}
              />
            ))}
          </Calendar>
        </SheetLink>
      </Cols>
      <Cols mt={[5, 6]}>
        <div>
          <Featline>Tuition is $500.</Featline>
          <Lead color="muted">
            Need-based financial aid is available for Hack Camp after you apply.
          </Lead>
        </div>
        <div>
          <Featline>What food is included?</Featline>
          <Lead color="muted">
            Lunch is! We’ll serve a healthy lunch & snacks every day at Camp.
          </Lead>
        </div>
        <div>
          <Featline>I know nothing about code!</Featline>
          <Lead color="muted">
            Perfect! You’ll be up to speed in no time. We made this with
            beginners in mind.
          </Lead>
        </div>
        <div>
          <Featline>What if I can already code?</Featline>
          <Lead color="muted">
            We will cover lots of stuff you don’t know yet—I guarantee it!
          </Lead>
        </div>
        <div>
          <Featline>What do I need to bring?</Featline>
          <Lead color="muted">
            A laptop and an open mind. We can help with the laptop. The mind
            thing is on you.
          </Lead>
        </div>
        <div>
          <Featline>Have any questions?</Featline>
          <Lead color="muted">
            Please reach out! We can be reached anytime at{' '}
            <A href="mailto:summer@hackclub.com" color={theme.colors.red}>
              summer@hackclub.com
            </A>
            .
          </Lead>
        </div>
      </Cols>
    </Container>
  </Section>
]
