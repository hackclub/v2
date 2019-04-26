import React from 'react'
import { Container } from '@hackclub/design-system'
import { Section, SectionTitle, Cols } from './Content'
import { Headline, Lead } from 'components/Content'

export default () => (
  <Section>
    <Container maxWidth={61.25}>
      <SectionTitle>Admissions</SectionTitle>
      <Cols cols="1fr 3fr" mt={[4, 5, 6]}>
        <Headline pr={3}>15 spots. ∞&nbsp;opportunity.</Headline>
        <Lead pl={[3, 0]}>
          We have 15 spots for currently-enrolled high&nbsp;school students.
          We’re not a college looking for just technical skill or
          extracurriculars—we’re searching for incredible young people who each
          bring something unique to Camp.
        </Lead>
      </Cols>
    </Container>
    <Container maxWidth={48}>
      <Lead>
        Tuition is $2400 Financial aid is available. We have a need-blind
        application process, then we’ll reach out to the accepted campers about
        need-based aid.
      </Lead>
    </Container>
  </Section>
)
