import React, { useState } from 'react'
import { Heading, Text, Link } from '@hackclub/design-system'
import IconButton from 'components/IconButton'
import { Modal, Overlay, CloseButton } from 'components/Modal'

const RulesButton = props => (
  <IconButton
    glyph="flag-fill"
    bg="info"
    children="Rules"
    inverted
    fontSize={2}
    m={3}
    style={{ position: 'absolute', right: 0, top: 0 }}
    {...props}
  />
)

export default () => {
  const [active, setActive] = useState(false)

  const toggleRules = () => setActive(!active)

  if (active) {
    return (
      <>
        <RulesButton onClick={toggleRules} />
        <Modal align="left" my={4} p={[3, 4]}>
          <CloseButton onClick={toggleRules} />
          <Heading.h2>Challenge Rules</Heading.h2>
          <Text fontSize={2} my={3}>
            Challenge is open to Hack Club community members. It strictly
            follows Hack Club’s{' '}
            <Link href="https://conduct.hackclub.com" target="_blank">
              Code of Conduct
            </Link>
            . Anything breaking our Code of Conduct (ex. voter fraud) and
            contestants found cheating can be temporarily or permanently banned.
          </Text>
          <Text fontSize={2}>
            If you think anyone has violated our Conduct or cheating policy,
            please reach out to us confidentially at{' '}
            <Link href="mailto:challenge@hackclub.com">
              challenge@hackclub.com
            </Link>
            .
          </Text>
        </Modal>
        <Overlay onClick={toggleRules} />
      </>
    )
  }
  return <RulesButton onClick={toggleRules} />
}
