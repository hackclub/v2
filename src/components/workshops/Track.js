import React from 'react'
import styled from 'styled-components'
import { Box, Card, Container, Heading, Text } from '@hackclub/design-system'
import Link from 'gatsby-link'
import { capitalize, map } from 'lodash'

const Root = styled(Box.section)`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.snow}
  );
`

const Grid = styled(Container.withComponent('ol'))`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  counter-reset: li;
  list-style: none;
  a {
    text-decoration: none;
  }
`

const Item = styled(Card.withComponent('li'))`
  text-align: left;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: ${({ theme }) => theme.radii[2]};
  will-change: transform;
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
  transition: 0.1875s ease-in-out all;
  &:hover,
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.125), 0 8px 24px rgba(0, 0, 0, 0.125),
      0 16px 32px rgba(0, 0, 0, 0.125);
    transform: scale(1.25);
    z-index: 4;
  }
  &:before {
    content: counter(li);
    counter-increment: li;
    position: absolute;
    right: ${({ theme }) => theme.space[3]}px;
    top: ${({ theme }) => theme.space[3]}px;
    width: 1.25rem;
    line-height: 1.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes[0]}px;
    letter-spacing: -0.125em;
    text-align: center;
    text-shadow: none;
    font-weight: bold;
  }
  h3 {
    line-height: 1.125;
    margin-bottom: 0.125rem;
  }
  p {
    line-height: 1.25;
  }
`

const WorkshopItem = ({
  data: {
    fields: { slug, bg },
    frontmatter: { name, description }
  },
  ...props
}) => (
  <Link to={slug} {...props}>
    <Item p={3} bg="primary" style={{ backgroundImage: `url('${bg}')` }}>
      <Heading.h3 color="white" f={3} mb={[null, 3]} children={name} />
      <Text color="snow" f={2} children={description} />
    </Item>
  </Link>
)

const descriptions = {
  arduino:
    'Bring projects from cyberspace to the real world with this small hardware platform.',
  challenge: 'Supplemental material for Hack Club Challenges.',
  club: 'Launching your own Hack Club? Here are a few pointers.',
  experimental:
    'As is/no warranty. These workshops haven’t been fully tested yet, so we don’t know just will happen if you try building things with them.',
  misc: 'The odd ones out. Workshops not yet properly categorized.',
  pi: 'Start building projects on the coolest credit card-sized computer.',
  retired:
    'These workshops are no longer maintained. They may contain errors and are not recommended for club use. Here be dragons.',
  start:
    'Set out on your journey by building your own website, then move on to multiplayer games and collaborative web apps.'
}

const Track = ({ name, data, ...props }) => (
  <Root id={name} py={[3, 4]} {...props}>
    <Container maxWidth={32} align="center" px={3}>
      {name && <Heading.h2 color="black" f={4} children={capitalize(name)} />}
      {descriptions[name] && (
        <Text color="slate" f={2} children={descriptions[name]} />
      )}
    </Container>
    <Grid px={3}>
      {map(data, (edge, ii) => (
        <WorkshopItem data={edge.node} key={`workshops-${name}-${ii}`} />
      ))}
    </Grid>
  </Root>
)

export default Track
