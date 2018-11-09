import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as DSLink,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
import { wordWrap } from 'polished'
import LeaderInvite from 'components/apply/LeaderInvite'
import { clubApplicationSchema } from 'components/apply/ClubApplicationForm'
import Sheet from 'components/Sheet'
import SubmitButton from 'components/apply/SubmitButton'
import Status from 'components/apply/Status'
import { Link } from 'gatsby'
import api from 'api'
import { Modal, CloseButton, Overlay } from 'components/Modal'
import storage from 'storage'

const authToken = storage.get('authToken')

const P = props => <Text my={3} {...props} />

const A = styled(DSLink)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Title = styled(Heading.h1).attrs({ fontSize: 6 })`
  line-height: 1.25;
`

class ContactModal extends Component {
  state = { open: false }

  toggle = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { open } = this.state
    return (
      <>
        <Button
          bg="info"
          onClick={this.toggle}
          children="Contact us"
          fontSize={1}
        />
        {open && (
          <>
            <Modal w="28rem" align="left" my={4} p={[3, 4]}>
              <CloseButton onClick={this.toggle} />
              <Heading.h2>Contact Us</Heading.h2>
              <Text fontSize={2}>
                Send any questions about the application process to{' '}
                <A to="mailto:applications@hackclub.com">
                  applications@hackclub.com
                </A>
                .
              </Text>
            </Modal>
            <Overlay onClick={this.toggle} />
          </>
        )}
      </>
    )
  }
}

// NOTE(@lachlanjc): for use if/when we have a slideshow experience
// const PrimaryButton = styled(IconButton).attrs({
//   name: 'edit',
//   bg: 'primary',
//   circle: true,
//   size: 36,
//   p: 3
// })`
//   position: absolute;
//   right: 0;
//   bottom: -64px;
//   box-shadow: ${theme.boxShadows[1]} !important;
//   transition: ${theme.transition} box-shadow;
//   &:hover,
//   &:focus {
//     box-shadow: ${theme.boxShadows[2]} !important;
//   }
// `

const Rejected = ({ resetCallback }) => (
  <Box mb={4}>
    <Heading.h3 color="error" mb={3}>
      Unfortunately, you’ve been rejected
    </Heading.h3>
    <P>
      You can start a new application by clicking{' '}
      <A onClick={resetCallback}>here</A>.
    </P>
  </Box>
)

const SectionBase = styled(Flex).attrs({
  py: 4,
  px: [3, 0],
  mx: [-3, 0],
  align: 'center'
})`
  border-top: 1px solid ${theme.colors.smoke};
  min-height: ${props => (props.sm ? 6 : 10)}rem;
`
const SectionHeading = styled(Heading.h2).attrs({
  fontSize: props => (props.sm ? 4 : 5),
  regular: true,
  align: 'left'
})`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.25;
  max-width: 32rem;
  ${wordWrap('break-word')};
`
const SectionIcon = styled(Icon).attrs({
  color: props => (props.open ? 'gray.5' : 'gray.4'),
  size: 32,
  mr: 1,
  ml: 'auto'
})`
  transition: ${theme.transition} all;
  transform: rotate(${props => (props.open ? 90 : 0)}deg);
  user-select: none;
  ${props =>
    props.glyph === 'member-remove' &&
    css`
      cursor: pointer;
      &:hover {
        color: ${theme.colors.red[4]};
      }
    `};
`

class Section extends Component {
  state = { open: false }

  toggle = e =>
    this.setState(({ open }) => ({ open: this.props.to ? open : !open }))

  render() {
    const { open } = this.state
    const { name, openContent, to, sm, ...props } = this.props
    const Element = to ? Link : Fragment
    return (
      <Element to={to}>
        <SectionBase
          {...props}
          onClick={this.toggle}
          sm={sm}
          aria-expanded={open}
        >
          <SectionHeading sm={sm} children={name} />
          <SectionIcon open={open} glyph={to ? 'view-forward' : 'options'} />
        </SectionBase>
      </Element>
    )
  }
}

const HelpSheet = styled(Container).attrs({
  mt: [3, 4],
  p: 0,
  px: [3, 4],
  py: 3,
  bg: 'blue.0'
})`
  border-radius: ${theme.radii[2]};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Help = () => (
  <HelpSheet>
    <Flex align="center" flex="1 1 auto" mb={[3, 0]}>
      <Icon glyph="support" size={36} mr={[2, 3]} color="info" />
      <Text color="info" fontSize={2} align="left">
        Have any questions? <strong>We’re here to help out.</strong>
      </Text>
    </Flex>
    <ContactModal />
  </HelpSheet>
)

const SubmitStatus = styled(Text.withComponent('mark'))`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const profileStatus = profile =>
  profile.completed_at !== null
    ? 'complete'
    : profile.created_at === profile.updated_at
    ? 'unopened'
    : 'incomplete'

const Main = props => {
  const { id, leader_profiles, updated_at, created_at } = props.app
  const { callback, app, resetCallback } = props

  const leaderProfile = leader_profiles.find(
    profile => Number(profile.user.id) === Number(props.userId)
  )
  const coLeaderProfiles = leader_profiles.filter(
    profile => Number(profile.user.id) !== Number(props.userId)
  )

  const completeProfiles = leader_profiles.every(
    profile => profile.completed_at
  )
  const completeApplication = clubApplicationSchema.isValidSync(app)
  let submitButtonStatus
  if (app.submitted_at) {
    submitButtonStatus = 'submitted'
  } else if (completeApplication && completeProfiles) {
    submitButtonStatus = 'complete'
  } else {
    submitButtonStatus = 'incomplete'
  }
  const applicationStatus = profile =>
    completeApplication
      ? 'complete'
      : created_at === updated_at
      ? 'unopened'
      : 'incomplete'

  const submitStatusProps = {
    unopened: { color: 'primary', children: 'ready for you!' },
    incomplete: { color: 'warning', children: 'in progress.' },
    complete: { bg: 'info', children: 'completed!' },
    submitted: { bg: 'success', children: 'submitted!' }
  }[submitButtonStatus]

  return (
    <Container maxWidth={52} my={4}>
      <Sheet p={[3, 4, 5]}>
        <Heading.h3 fontSize={[4, 5]} mb={2}>
          How to get into Hack Club
        </Heading.h3>
        <P fontSize={3}>
          Our admissions process is very competitive, accepting less than 5% of
          applicants. Here’s what we look for:
        </P>
        <ul>
          <li>
            Strong founding teams with 2-3 members. You probably can’t do it
            alone and we rarely accept solo founders.
          </li>
          <li>
            Diverse skillsets on leadership team—the best Hack Clubs are led by
            both CEO and CTO types.
          </li>
          <li>
            Traction. Indicators of progress to date, especially formal shows of
            support from your school (like securing a teacher sponsor), are very
            meaningful.
          </li>
        </ul>
        <Help />
      </Sheet>
      <Sheet p={[3, 4, 5]}>
        <Title mb={4} style={{ position: 'relative' }}>
          Your application to Hack Club is{' '}
          <SubmitStatus {...submitStatusProps} />
        </Title>
        <Section
          to={`/apply/club?id=${id}`}
          name={
            <>
              <Text.span bold>Club application</Text.span>
              <Status type={applicationStatus()} ml={[2, 3]} />
            </>
          }
        />
        <Section
          to={`/apply/leader?id=${leaderProfile.id}`}
          name={
            <>
              <Text.span bold>My personal profile</Text.span>
              <Status type={profileStatus(leaderProfile)} ml={[2, 3]} />
            </>
          }
        />
        <LeaderInvite id={id} callback={callback} />
        {coLeaderProfiles.length === 0 && (
          <Text py={3} color="muted" align="center" fontSize={3}>
            <Text.span bold>No co-leaders yet!</Text.span>
            <br />
            Tap the green button to add them.
          </Text>
        )}
        {coLeaderProfiles.map(profile => (
          <SectionBase sm key={profile.id}>
            <SectionHeading sm>
              <Text.span
                children={profile.user.name || profile.user.email}
                mr={[2, 3]}
              />
              <Status type={profileStatus(profile)} bg="muted" />
            </SectionHeading>
            <SectionIcon
              glyph="member-remove"
              onClick={e => {
                if (
                  window.confirm(
                    `Are you sure you want to remove ${
                      profile.user.email
                    } as a team member?`
                  )
                ) {
                  api
                    .delete(`v1/new_club_applications/${id}/remove_user`, {
                      authToken,
                      data: { user_id: profile.user.id }
                    })
                    .then(json => {
                      callback()
                    })
                }
              }}
              aria-label="Remove team member"
            />
          </SectionBase>
        ))}
        <Box mt={4}>
          {app.rejected_at ? (
            <Rejected resetCallback={resetCallback} />
          ) : (
            <SubmitButton
              applicationId={app.id}
              status={submitButtonStatus}
              callback={callback}
            />
          )}
        </Box>
      </Sheet>
    </Container>
  )
}

export default Main
