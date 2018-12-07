import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import {
  Heading,
  OutlineButton,
  Box,
  Text,
  Image,
  Flex,
  theme
} from '@hackclub/design-system'
import IconButton from 'components/IconButton'
import { Modal, Overlay, CloseButton } from 'components/Modal'

const Columns = styled(Box)`
  img {
    max-width: 80%;
    margin: auto;
  }
  ${theme.mediaQueries.md} {
    column-count: 2;
    column-gap: ${theme.space[3]}px;
  }
`
const P = styled(Text).attrs({ fontSize: 2, mb: 2 })`
  break-inside: avoid;
`

class Story extends Component {
  state = { active: false }

  toggleActive = () => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    if (this.state.active) {
      return (
        <Fragment>
          <Modal align="left" my={4} p={[3, 4]} width="48rem">
            <CloseButton onClick={this.toggleActive} />
            <Heading.h2 mb={2}>This winter…</Heading.h2>
            <Columns>
              <Image
                src="/holiday/orpheus.png"
                alt="Orpheus with a Santa hat & snow"
              />
              <P>
                ‘Twas the night before Hack Club
                <br />
                and all through the school
                <br />
                the hackers were hacking
                <br />
                and that’s…pretty cool
              </P>
              <P>
                With IDEs open
                <br />
                And repls, and rifts
                <br />
                They clattered on keyboards
                <br />
                To ship all their gifts
              </P>
              <P>
                On repl.it, on p5,
                <br />
                on CodePen, on Glitch
              </P>
              <P>
                On filesystem, npm,
                <br />
                GitHub & Git
              </P>
              <P>
                They raced in a challenge
                <br />
                with only one rule:
                <br />
                Make a hack for a hacker
                <br />
                Who you think is cool
              </P>
              <P>
                So go, happy hackers
                <br />
                You have code to write.
                <br />A good hack club to all,
                <br />
                And to all a good night.
              </P>
              <Image
                src="/holiday/house.png"
                alt="Hack House with Santa Orpheus coding"
              />
            </Columns>
          </Modal>
          <Overlay onClick={this.toggleActive} />
        </Fragment>
      )
    }
    return (
      <IconButton
        is={OutlineButton}
        glyph="docs"
        children="Read the story…"
        bg="white"
        size={28}
        mt={[0, 3]}
        mb={[4, 5]}
        onClick={this.toggleActive}
        {...this.props}
      />
    )
  }
}

export default Story
