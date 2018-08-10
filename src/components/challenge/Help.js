import React, { Fragment, Component } from 'react'
import { Box, Heading, Text, Link } from '@hackclub/design-system'
import IconButton from 'components/IconButton'
import { Modal, Overlay, CloseButton } from 'components/Modal'

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
          <Modal align="left" my={4} p={[3, 4]}>
            <CloseButton onClick={this.toggleRules} />
            <Heading.h2>Challenge Rules</Heading.h2>
            {/*
            <Text
              f={2}
              mt={3}
              color="info"
              py={2}
              px={3}
              bg="blue.0"
              style={{ borderRadius: 4 }}
            >
              For this challenge, your entry must use{' '}
              <Link href="https://p5js.org" target="_blank" bold>
                p5.js
              </Link>{' '}
              in its code.
            </Text>
            */}
            <Text f={2} my={3}>
              Challenge is open to Hack Club members and repl.it users. It
              strictly follows Hack Club’s{' '}
              <Link href="https://conduct.hackclub.com" target="_blank">
                Code of Conduct
              </Link>. Anything breaking our Code of Conduct (ex. voter fraud)
              and contestants found cheating can be temporarily or permanently
              banned.
            </Text>
            <Text f={2}>
              If you think anyone has violated our Conduct or cheating policy,
              please reach out to us confidentially at{' '}
              <Link href="mailto:challenge@hackclub.com">
                challenge@hackclub.com
              </Link>.
            </Text>
          </Modal>
          <Overlay onClick={this.toggleRules} />
        </Fragment>
      )
    }
    return (
      <IconButton
        name="flag"
        size={16}
        children="Rules"
        inverted
        f={2}
        m={3}
        onClick={this.toggleRules}
        style={{ position: 'absolute', right: 0, top: 0 }}
        {...this.props}
      />
    )
  }
}

export default Help
