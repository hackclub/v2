import React, { Component } from 'react'
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  ThemeProvider,
  cx
} from '@hackclub/design-system'
import { Form, Field, Fieldset, Submit, AutoSaver } from '../components/Forms'
import Login from '../components/Login'
import LogoutButton from '../components/LogoutButton'
import LoadingAnimation from '../components/LoadingAnimation'
import { Formik } from 'formik'
import api from '../api'
import styled from 'styled-components'

const Tr = styled.tr`
  &:nth-child(even) {
    background: ${props => cx('snow')};
  }
`

const Inspector = props => {
  const { authToken, club, updateClub } = props

  return (
    <Box>
      <Formik
        initialValues={club}
        onSubmit={(values, { setSubmitting }) => {
          api
            .patch(`v1/new_club_applications/${values.id}`, {
              authToken: authToken,
              data: values
            })
            .then(json => {
              console.log(json)
              updateClub(json)
              setSubmitting(false)
            })
            .catch(e => {
              console.error(e)
              setSubmitting(false)
            })
        }}
      >
        {props => {
          const {
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            isSubmitting
          } = props
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                name="interview_notes"
                label="Interview Notes"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.interview_notes}
                type="textarea"
              />
              <Field
                name="interviewed_at"
                label="Interview Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.interviewed_at || new Date()}
                defaultValue={new Date()}
                type="date"
              />
              <Field
                name="interview_duration"
                label="Interview Duration (minutes)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.interview_duration}
                type="number"
              />
              <AutoSaver
                handleSubmit={props.handleSubmit}
                isSubmitting={props.isSubmitting}
                values={props.values}
              />
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

const Dashboard = props => {
  const { clubs, setSelection } = props

  const select = club => {
    return () => setSelection(club)
  }

  return (
    <table>
      <thead>
        <tr>
          <th align="left">ID</th>
          <th align="left">Name</th>
          <th align="left">URL</th>
          <th align="left">Interview</th>
        </tr>
      </thead>
      <tbody>
        {clubs.map((club, index) => (
          <Tr key={index}>
            <td>
              <Link href={`/dashboard/club?id=${club.id}`} title={club.id}>
                {club.id}
              </Link>
            </td>
            <td>
              {club.high_school_name ? (
                <Text>{club.high_school_name}</Text>
              ) : (
                <Text color="silver">Unset</Text>
              )}
            </td>
            <td>
              <Link href={club.high_school_url} title={club.high_school_url}>
                {club.high_school_url}
              </Link>
            </td>
            <td>
              <Button
                bg="info"
                inverted={club.interview_notes === null}
                disabled={club.submitted_at === null}
                onClick={club.submitted_at ? select(club) : null}
              >
                ✍
              </Button>
            </td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading'
    }
    this.setSelection = this.setSelection.bind(this)
    this.updateClub = this.updateClub.bind(this)
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ authToken })

    api
      .get('v1/new_club_applications', { authToken: authToken })
      .then(json => {
        this.setState({
          status: 'success',
          clubs: json
        })
      })
      .catch(e => {
        if (e.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  setSelection(selection) {
    this.setState({ selection })
  }

  updateClub(values) {
    const { clubs, selection } = this.state
    let modifiedClubs = clubs
    for (let i = 0; i < modifiedClubs.length; i++) {
      let club = modifiedClubs[i]
      if (club.id === selection.id) {
        club = values
        break
      }
    }
    this.setState({ clubs: modifiedClubs })
  }

  render() {
    const { status, clubs, selection, authToken } = this.state

    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login />
      case 'success':
        return (
          <ThemeProvider>
            <Flex
              px={[2, 4]}
              pb={2}
              justify="space-between"
              align="center"
              style={{ position: 'relative' }}
            >
              <Flag />
              <LogoutButton mt={2} inverted={false} />
            </Flex>
            <Dashboard clubs={clubs} />
          </ThemeProvider>
        )
      case 'error':
        return <Text>Something terrible has happened.</Text>
    }
  }
}
