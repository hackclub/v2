import React from 'react'
import { Container } from '@hackclub/design-system'
import { Section, SectionTitle, Cols } from './Content'
import { Headline, Lead } from 'components/Content'

export default () => [
  <Section>
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Sign up</SectionTitle>
      <Lead>Tuition is $500</Lead>
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
