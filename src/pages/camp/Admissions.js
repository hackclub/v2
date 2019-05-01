import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Text,
  Sheet,
  Container,
  Link as A,
  LargeButton
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import { Headline, Featline, Lead } from 'components/Content'
import { Section, SectionTitle, Cols, theme } from './style'
import range from 'lodash/range'
import includes from 'lodash/includes'

const cta = {
  chevronRight: true,
  scale: true,
  fontSize: [3, 4]
}
const CTA = styled(LargeButton.withComponent(Link)).attrs(cta)`
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
            3 sessions. Pick yours.
          </Headline>
          <Lead mb={4}>
            We’re running three identical weeks of Hack Camp. Join us July
            1–5th, 15–19th, or July 29th–August 2nd. Camp runs 9am–5pm
            (weekdays).
          </Lead>
          <CTA to="/camp/register">Register now</CTA>
        </div>
        <Sheet bg={theme.colors.darkless}>
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
        </Sheet>
      </Cols>
      <Cols mt={[5, 6]}>
        <div>
          <Featline>Tuition is $500.</Featline>
          <Lead color="muted">
            Need-based financial aid is available for Camp—let us know in your
            registration.
          </Lead>
        </div>
        <div>
          <Featline>Lunch is included.</Featline>
          <Lead color="muted">I hope it’s tasty!</Lead>
        </div>
        <div>
          <Featline>I don’t know how to code!</Featline>
          <Lead color="muted">
            Perfect! Hack Camp was built with beginners in mind. You’ll be up to
            speed in no time.
          </Lead>
        </div>
        <div>
          <Featline>I already know how to code.</Featline>
          <Lead color="muted">
            There’s always more to learn—why not surround yourself with awesome
            makers and doers with similar interests?
          </Lead>
        </div>
        <div>
          <Featline>What do I need to bring?</Featline>
          <Lead color="muted">
            You should bring your laptop & a thirst for knowledge. Let us know
            if you don’t have a laptop and we’ll do our best to accomodate you.
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
