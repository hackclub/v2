import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Text,
  Box,
  Flex,
  Container,
  Icon,
  Sheet
} from '@hackclub/design-system'
import { Section, SectionTitle, Cols, Quote, theme } from './style'
import { Headline, Subhline, Featline, Lead } from 'components/Content'
import Schedule from './Schedule'

const Module = ({ icon, name, body, color = 'white', ...props }) => (
  <Flex flexDirection="column" color={color} {...props}>
    {icon && (
      <Icon
        size={64}
        mb={2}
        glyph={icon}
        color={props.iconColor || color}
        style={{ flexShrink: 0 }}
      />
    )}
    <Box>
      <Featline mb={1} children={name} />
      <Lead fontSize={3} children={body} />
    </Box>
  </Flex>
)
const ProjectOne = styled(Sheet)`
  background-color: ${theme.colors.red};
  background-image: ${theme.gradient(theme.colors.primary, theme.colors.red)};
`
const ProjectTwo = styled(Sheet)`
  background-color: ${theme.colors.green};
  background-image: ${theme.gradient(theme.colors.yellow, theme.colors.green)};
`
const ProjectThree = styled(Sheet)`
  background-color: ${theme.colors.blue};
  background-image: ${theme.gradient(theme.colors.cyan, theme.colors.blue)};
`

export default () => (
  <Section bg="darker" id="activities">
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Activities</SectionTitle>
      <Cols cols="1fr 2fr" mb={[4, 5]}>
        <Subhline>Camp is all about building.</Subhline>
        <Lead>
          Every day at Hack Camp you’ll go home with a new finished project. We
          want some projects to be a surprise, but here are a few you’ll
          certainly tackle:
        </Lead>
      </Cols>
    </Container>
    <Container px={3}>
      <Cols cols="1fr 1fr 1fr">
        <ProjectOne>
          <Module
            icon="web"
            name="Your First Website"
            body="The website you’re reading right now was built by
        us from scratch. We taught ourselves this stuff years ago—we’ll show you how to do the same."
          />
        </ProjectOne>
        <ProjectTwo>
          <Module
            icon="announcement"
            name="Your First Radio"
            body="A month ago, none of us knew anything about radios. We thought it would be cool to build one at Camp, so we learned how."
          />
        </ProjectTwo>
        <ProjectThree>
          <Module
            icon="challenge"
            name="Your First Game"
            body="Making a game is one of the best intros to code, & it’s easier than ever. Several of us started with games & became professional game devs!"
          />
        </ProjectThree>
      </Cols>
    </Container>
    <Container maxWidth={61.25} px={3}>
      <Cols mt={[5, 6]} mb={0} gap={[3, 5]}>
        <div>
          <Headline mb={4}>A day in the life</Headline>
          <Schedule
            events={[
              { start: '9:00am', color: 'primary', name: 'Morning discussion' },
              {
                start: '10:00am',
                length: 2,
                color: 'green',
                name: 'Morning workshop'
              },
              { start: '12:00pm', length: 0.5, name: 'Lunch' },
              {
                start: '1:00pm',
                length: 2,
                color: 'green',
                name: 'Afternoon workshop'
              },
              {
                start: '3:00pm',
                color: 'primary',
                name: 'Afternoon discussion'
              },
              { start: '4:00pm', length: 0.5, name: 'Camp dismissed' }
            ]}
          />
        </div>
        <Quote
          body="Hack Camp was the single factor that completely shifted my view of
            CS. I met an unbelievably accepting & kind community of creators &
            learners that introduced me to an entirely novel approach to
            hacking, changing not just the way I regard technology, but the way
            I approach the world at large."
          img="connie.jpg"
          name="Connie Liu"
          detail="San Francisco"
          credential="Hack Camp attendee, 2016"
          mt={2}
        />
      </Cols>
    </Container>
  </Section>
)
