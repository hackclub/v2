import React, { Component, Fragment } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import Chart from 'components/admin/operations/CheckInChart'
import LeaderInviteForm from 'components/checkup/LeaderInviteForm'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import Helmet from 'react-helmet'
import search from 'search'
import api from 'api'
import { timeSince, formatDate } from 'helpers'
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Text
} from '@hackclub/design-system'

const FlexCard = Card.withComponent(Flex)

const EventCard = ({ meeting_date, attendance, notes }) => (
  <FlexCard boxShadowSize="sm" align="flex-start" p={3} my={3}>
    <Badge bg="muted" children={timeSince(Date.parse(meeting_date))} fontSize={2} />
    <Box ml={3}>
      <Heading.h3 fontSize={3} children={meeting_date} />
      <Text color="slate">{attendance} members</Text>
      <Text>{notes}</Text>
    </Box>
  </FlexCard>
)

const removeLeadershipPosition = (positionId, name) => {
  const confirmation = confirm(
    `Are you sure you want to remove ${name} from the club?`
  )
  if (confirmation) {
    api.delete(`v1/leadership_positions/${positionId}`).then(() => {
      window.location.reload()
    })
  }
}

const LinkSpan = Text.span.withComponent(Link)

const LeaderCard = ({ name, id, email, position }) => (
  <Fragment>
    <LinkSpan href={`/admin/operations/leader?id=${id}`}>{name}</LinkSpan>
    <IconButton
      glyph="view-close"
      color="error"
      px={0}
      size={20}
      onClick={() => removeLeadershipPosition(position.id, name)}
    />
  </Fragment>
)

const removeInvite = (id, email) => {
  const confirmation = confirm(
    `Are you sure you want to remove ${email}’s invite?`
  )
  if (confirmation) {
    api.delete(`v1/leadership_position_invites/${id}`).then(() => {
      window.location.reload()
    })
  }
}

const InviteCard = ({ email, id }) => (
  <li>
    {email}
    {/* The delete endpoint doesn’t exist yet */}
    {/*
      <IconButton
        glyph="view-close"
        color="error"
        px={0}
        size={20}
        onClick={() => removeInvite(id, email)}
      />
    */}
  </li>
)

export default class extends Component {
  state = {
    status: 'loading',
    showInviteModal: false
  }

  componentDidMount() {
    const id = search.get('id')
    api
      .get(`v1/new_clubs/${id}`)
      .then(club =>
        api.get(`v1/new_clubs/${id}/dumb_check_ins`).then(unsortedCheckIns => {
          const checkIns = unsortedCheckIns.sort(
            (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
          )
          this.setState({ club, checkIns, status: 'success' })
        })
      )
      .catch(err => {
        switch (err.status) {
          case 401:
          case 403:
            this.setState({ status: 'needsToAuth' })
            break
          default:
            this.setState({ status: 'error' })
            break
        }
      })
  }

  render() {
    const { status, club, checkIns, showInviteModal } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        const checkInData = checkIns.slice(0, 10).map(checkIn => ({
          y: checkIn.attendance || 0,
          x: formatDate('mmm dd', checkIn.meeting_date)
        }))
        const leaderInvites = club.leadership_position_invites.filter(
          invite => !(invite.rejected_at || invite.accepted_at)
        )
        return (
          <Fragment>
            <Helmet title={`Dumb club #${club.id}`} />
            <Nav />
            <Container color="black" maxWidth={36} py={4}>
              <Heading.h1 fontSize={[5, 6]} children={club.high_school_name} />
              {club.club_website && (
                <Flex align="center" fontSize={2} bold mt={3} mb={2}>
                  <Link
                    color="info"
                    target="_blank"
                    href={club.club_website}
                    children={club.club_website}
                  />
                  <Icon size={16} name="open_in_new" color="muted" ml={2} />
                </Flex>
              )}
              <Text fontSize={2} color="muted" children={club.high_school_address} />
              {showInviteModal && (
                <Fragment>
                  <Modal align="left" my={4} p={[3, 4]}>
                    <CloseButton
                      onClick={() => this.setState({ showInviteModal: false })}
                    />
                    <LeaderInviteForm
                      clubId={club.id}
                      callback={() => {
                        this.setState({ showInviteModal: false })
                        window.location.reload()
                      }}
                    />
                  </Modal>
                  <Overlay
                    onClick={() => this.setState({ showInviteModal: false })}
                  />
                </Fragment>
              )}
              <Text>
                Lead by:{' '}
                {club.new_leaders.map((leader, index) => (
                  <Fragment>
                    <LeaderCard
                      {...leader}
                      position={club.leadership_positions.find(
                        lp => lp.new_leader_id === leader.id
                      )}
                      key={leader.id}
                    />
                    {index + 1 < club.new_leaders.length &&
                    club.new_leaders.length > 2
                      ? ', '
                      : ' '}
                    {index + 2 === club.new_leaders.length && 'and '}
                  </Fragment>
                ))}
              </Text>
              <Text mb={2}>
                {leaderInvites.length > 0 && (
                  <Fragment>
                    Pending invitations:{' '}
                    <ul>
                      {leaderInvites.map((invite, index) => (
                        <InviteCard
                          email={invite.user.email}
                          key={invite.id}
                          id={invite.id}
                        />
                      ))}
                    </ul>
                  </Fragment>
                )}
                <Link onClick={() => this.setState({ showInviteModal: true })}>
                  Invite another leader
                </Link>
              </Text>
              {checkIns.length > 0 ? (
                <Fragment>
                  <Flex justify="center">
                    <Chart data={checkInData} />
                  </Flex>
                  <Heading.h2 fontSize={4} mt={2}>
                    Meetings
                  </Heading.h2>
                  {checkIns.map(checkIn => (
                    <EventCard {...checkIn} key={checkIn.id} />
                  ))}
                </Fragment>
              ) : (
                <Heading.h3 bold mt={5} color="muted" align="center">
                  No recorded meetings
                </Heading.h3>
              )}
            </Container>
          </Fragment>
        )
      case 'error':
        return <ErrorPage />
    }
  }
}
