import React from 'react'
import { Box, Image, Link } from '@hackclub/design-system'

const Base = Box.extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  align-items: center;
  justify-content: center;
  img {
    max-width: 12rem;
  }
`

const Sponsor = ({ name, href, ...props }) => (
  <Link href={href || `https://${name.toLowerCase()}.com`} target="_blank">
    <Image
      src={`/inkind_logos/${name.toLowerCase()}.svg`}
      alt={name}
      {...props}
    />
  </Link>
)

const Sponsors = props => (
  <Base maxWidth={48} {...props}>
    {[
      'FullStory',
      'BrowserStack',
      'Stripe',
      'Segment',
      'Bugsnag',
      'Google',
      'Dialpad'
    ].map(name => <Sponsor name={name} key={name} />)}
  </Base>
)

export default Sponsors
