import React, { Component } from 'react'
import { Head } from 'react-static'
import { api } from '../../data'
import LoadingAnimation from '../components/LoadingAnimation'
import ClubApplicationForm from '../components/ClubApplicationForm'
import ApplyNav from '../components/ApplyNav'
import Footer from '../components/Footer'
import theme from '../theme'
import Login from '../components/Login'
import { Provider } from 'rebass'
import yup from 'yup'
import fetch from 'unfetch'

export default class extends Component {
  constructor(props) {
    super(props)

    var id
    const params = window.location.search.slice(1).split(/&/)
    for (var i = 0; i < params.length; i++) {
      let param = params[i]
      if (param.split('=')[0] === 'id') {
        id = param.split('=')[1]
      }
    }

    this.state = {
      status: 'loading',
      formFields: undefined,
      authToken: window.localStorage.getItem('authToken'),
      id
    }
  }

  componentDidMount() {
    const { authToken, id } = this.state
    const needsToAuth = (authToken === null || id === null)
    if (needsToAuth) {
      const status = 'needsToAuth'
      this.setState({status})
    } else {
      fetch(`${api}/v1/new_club_applications/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}`, },
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res
          }})
        .then(json => {
          this.setState({
            status: 'loaded',
            formFields: json
          })
        })
        .catch(e => {
          if (e.status === 401) {
            const status = 'needsToAuth'
            this.setState({status})
          }
          alert(e)
        })
    }
  }

  content() {
    const { status, formFields, id, authToken } = this.state

    if (status === 'needsToAuth') {
      return <Login />
    } else if (status === 'loading') {
      return <LoadingAnimation />
    } else {
      return (
        <div>
          <ApplyNav />
          <ClubApplicationForm params={ formFields }
                               id={ id }
                               authToken={ authToken } />
          <Footer />
        </div>
      )
    }
  }

  render() {
    return (
      <Provider theme={theme}>
        <Head>
          <title children="Edit Club Application" />
        </Head>
        {this.content()}
      </Provider>
    )
  }
}
