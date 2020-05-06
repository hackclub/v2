import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Container, Icon, Sheet } from '@hackclub/design-system'
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
            body="A teenager in our community built the website you’re reading from scratch. The first day, it’ll be your turn."
          />
        </ProjectOne>
        <ProjectTwo>
          <Module
            icon="announcement"
            name="Your First Radio"
            body="Radios are the basis of Wi-Fi & satellites. You’ll build one yourself—but with a pencil, razor blade, & copper wire."
          />
        </ProjectTwo>
        <ProjectThree>
          <Module
            icon="sticker"
            name="Your First Game"
            body="Making a game is a great intro to code, and it’s never been easier. You’ll go home with your own 3D world."
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
              {
                start: '9:00am',
                color: 'primary',
                name: 'Morning discussion',
                desc: 'What are we doing today?'
              },
              {
                start: '10:00am',
                length: 2,
                color: 'green',
                name: 'Morning workshop',
                desc: 'Let’s build something awesome together.'
              },
              { start: '12:00pm', length: 0.5, name: 'Lunch' },
              {
                start: '1:00pm',
                length: 2,
                color: 'green',
                name: 'Afternoon workshop',
                desc: 'Progress resumes on incredible stuff.'
              },
              {
                start: '3:00pm',
                color: 'red',
                name: 'Project demos',
                desc: 'Woah, you built that today??'
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
