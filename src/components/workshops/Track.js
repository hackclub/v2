import React from 'react'
import { Box, Card, Heading, Text } from '@hackclub/design-system'
import { Link } from 'gatsby'
import { capitalize, map } from 'lodash'

const Grid = Box.withComponent('ol').extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: ${props => props.theme.space[3]}px;
  counter-reset: li;
  list-style: none;
  padding: 0;
  a {
    text-decoration: none;
  }
`

const Item = Card.withComponent('li').extend`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform .125s ease-in;
  will-change: transform;
  &:hover {
    transform: scale(1.03125);
  }
  &:before {
    content: counter(li);
    counter-increment: li;
    position: absolute;
    right: ${props => props.theme.space[3]}px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: .75rem;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes[0]}px;
    letter-spacing: -.02em;
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
    <Item
      p={3}
      boxShadowSize="md"
      bg="accent"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <Heading.h3 color="white" f={3} children={name} />
      <Text color="snow" f={2} children={description} />
    </Item>
  </Link>
)

const descriptions = {
  start:
    'Set out on your journey. Start out by building your own website, then tack on new features to make multiplayer games and collaborative web apps.',
  experimental:
    'As is/no warranty. These workshops haven’t been fully tested yet, so we don’t know just will happen if you try building things with them.',
  misc: 'The odd ones out. Workshops not yet properly categorized.',
  pi: 'Start building projects on the coolest credit card sized mini computer.',
  arduino:
    'Bring projects from cyberspace to the real world with this small hardware platform.',
  retired:
    'These workshops are no longer maintained. They may contain errors and are not recommended for club use. Here be dragons.',
  challenge: 'Supplemental material for Hack Club Challenges'
}

const Track = ({ name, data, ...props }) => (
  <Box.section id={name} mb={4} {...props}>
    {name && <Heading.h2 color="black" f={4} children={capitalize(name)} />}
    {descriptions[name] && (
      <Text color="slate" f={2} children={descriptions[name]} />
    )}
    <Grid>
      {map(data, (edge, ii) => (
        <WorkshopItem data={edge.node} key={`workshops-${name}-${ii}`} />
      ))}
    </Grid>
  </Box.section>
)

export default Track
