import React, { Fragment, Component } from 'react'
import { Box, Heading, Flex, Text, Button } from '@hackclub/design-system'
import { Modal, CloseButton, Overlay } from 'components/Modal'
import { SocialButton } from 'components/ShareButton'
import SlackForm from 'components/SlackForm'

class DiscussOnSlack extends Component {
  state = { active: false }

  toggle = () => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    if (this.state.active) {
      return (
        <Fragment>
          <Modal w="28rem" align="left" my={4} p={[3, 4]}>
            <CloseButton onClick={this.toggle} />
            <Heading.h2>Join our Slack</Heading.h2>
            <Flex
              align="center"
              my={3}
              py={2}
              px={3}
              bg="red.0"
              style={{ borderRadius: 4 }}
            >
              <Text color="primary" f={2}>
                Already a member?
              </Text>
              <Button
                ml="auto"
                f={2}
                href="https://hackclub.slack.com"
                target="_blank"
                chevronRight
                children="Sign in"
              />
            </Flex>
            <SlackForm />
          </Modal>
          <Overlay onClick={this.toggle} />
        </Fragment>
      )
    }
    const { is, ...props } = this.props
    const Tag =
      is === 'button' ? SocialButton.withComponent('button') : SocialButton
    return (
      <Tag bg="pink.5" {...props} service="slack" onClick={this.toggle}>
        <Box mr={2} />
        Discuss on Slack
      </Tag>
    )
  }
}

export default DiscussOnSlack
