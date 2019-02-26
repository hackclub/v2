import React from 'react'
import styled from 'styled-components'
import { Box, Container, Link as A, theme } from '@hackclub/design-system'
import { Fade } from 'react-reveal'
import { Headline, Subhline, Lead } from 'components/Content'
import Sheet from 'components/Sheet'
import Form from 'components/bank/Signup'
import Stats from 'components/bank/Stats'

export default () => (
  <Box.section bg="dark" py={[5, 6, 7]}>
    <Container maxWidth={48} px={3} align="center">
      <Headline color="white" mb={2}>
        Sign up for Hack Club Bank.
      </Headline>
      <Lead color="muted">
        Open to all student-led, US-based high school & collegiate hackathons.
        If you lead a Hack Club, you too!
        <A
          color="primary"
          href="https://airtable.com/shrmh0kVBku2XJcB4"
          target="_index"
          chevronRight
          hoverline
          ml={2}
        >
          Apply here
        </A>
      </Lead>
      <Fade bottom>
        <Sheet bg="black" color="snow" maxWidth={32} my={5} p={[3, 4, 5]}>
          <Subhline fontSize={[4, 5]}>Create your account</Subhline>
          <Form />
        </Sheet>
        <Stats
          color="smoke"
          labelColor="muted"
          fontSize={[6, 7, 8]}
          mt={0}
          mb={[4, 5]}
          width="auto"
        />
        <Lead maxWidth={36} color="slate" fontSize={2}>
          Hack Club does not directly provide banking services. Banking services
          provided by Silicon Valley Bank, an FDIC-certified institution.
        </Lead>
      </Fade>
    </Container>
  </Box.section>
)
