import React from 'react'
import { Container } from '@hackclub/design-system'
import { Section, SectionTitle, Cols } from './Content'
import { Headline, Lead } from 'components/Content'

export default () => [
  <Section>
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Admissions</SectionTitle>
      <Cols cols="1fr 2fr" mt={[4, 5, 6]}>
        <Headline>15 students.</Headline>
        <Lead>
          We have 15 spots for currently-enrolled high&nbsp;school students.
          We’re not a college looking for just technical skill or
          extracurriculars—we’re searching for incredible young people who each
          bring something unique to Camp.
        </Lead>
      </Cols>
    </Container>
  </Section>,
  <Section>
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Tuition</SectionTitle>
      <Lead>Tuition is $2400</Lead>
      <Cols cols="1fr 2fr" mt={[4, 5, 6]}>
        <Headline>We’re here to&nbsp;help out.</Headline>
        <Lead>
          Financial aid is available for Camp. We have a need-blind application
          process, then we’ll reach out to accepted campers about need-based
          aid.
        </Lead>
      </Cols>
    </Container>
  </Section>
]
