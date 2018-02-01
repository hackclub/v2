import React from 'react'
import { Box, Card, Link as A, Heading, Text } from '@hackclub/design-system'
import Link from 'gatsby-link'
import { map } from 'lodash'

A.link = A.withComponent(Link)
Box.section = Box.withComponent('section')

const WorkshopGrid = Box.withComponent('ol').extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: ${props => props.theme.space[3]}px;
  counter-reset: li;
  list-style: none;
  padding: 0;
`

const WorkshopCard = Card.withComponent('li').extend`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('${props => props.img}');
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  position: relative;
  height: 100%;
  &:before {
    content: counter(li);
    counter-increment: li;
    box-sizing: border-box;
    position: absolute;
    right: ${props => props.theme.space[3]}px;
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes[0]}px;
    line-height: 1.5;
    text-align: center;
    text-shadow: none;
    font-weight: bold;
  }
  h3 {
    line-height: 1.125;
    margin-bottom: 0.125rem;
  }
  p {
    line-height: 1.375;
  }
`

const WorkshopItem = ({
  data: { fields: { slug, bg }, frontmatter: { name, description } },
  ...props
}) => (
  <A.link to={slug} {...props}>
    <WorkshopCard p={3} boxShadowSize="md" bg="accent" img={bg}>
      <Heading.h3 color="white" f={3} children={name} />
      <Text color="snow" f={2} children={description} />
    </WorkshopCard>
  </A.link>
)

const Workshops = ({ name, data, ...props }) => (
  <Box.section mb={4} {...props}>
    {name && <Heading.h2 color="black" f={4} mb={1} caps children={name} />}
    <WorkshopGrid>
      {map(data, (edge, ii) => (
        <WorkshopItem data={edge.node} key={`workshops-${name}-${ii}`} />
      ))}
    </WorkshopGrid>
  </Box.section>
)

export default Workshops
