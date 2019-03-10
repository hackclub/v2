import React, { Fragment, Component } from 'react'
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

class Help extends Component {
  state = { active: false }

  toggleRules = () => {
    this.setState(state => ({ active: !state.active }))
  }

  // Render a modal for challenge rules on button press
  render() {
    if (this.state.active) {
      return (
        <Fragment>
          <RulesButton onClick={this.toggleRules} />
          <Modal align="left" my={4} p={[3, 4]}>
            <CloseButton onClick={this.toggleRules} />
            <Heading.h2>Challenge Rules</Heading.h2>
            <Text fontSize={2} my={3}>
              Challenge is open to Hack Club community members. It strictly
              follows Hack Club’s{' '}
              <Link href="https://conduct.hackclub.com" target="_blank">
                Code of Conduct
              </Link>
              . Anything breaking our Code of Conduct (ex. voter fraud) and
              contestants found cheating can be temporarily or permanently
              banned.
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
          <Overlay onClick={this.toggleRules} />
        </Fragment>
      )
    }
    return <RulesButton onClick={this.toggleRules} />
  }
}

export default Help
