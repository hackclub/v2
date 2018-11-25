import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { remove } from 'lodash'

import api from 'api'
import styled from 'styled-components'
import {
  Box,
  Card,
  Container,
  Flex,
  Label,
  Text,
  Heading,
  Button,
  theme,
} from '@hackclub/design-system'

import CarouselProject from 'components/workshops/CarouselProject'
import CarouselSubmissionForm from 'components/workshops/CarouselSubmissionForm'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RehackSlider = styled(Slider)`
  align-self: stretch;
`

const CarouselOuter = styled(Flex).attrs({
  bg: 'smoke',
  pt: [2, 2, 3],
  pb: [3, 3, 4],
  flexDirection: 'column',
  align: 'center',
})``

const SliderWrapper = styled(Box).attrs({ mb: [3, 3, 4] })`
  align-self: stretch;
`

const ShowAllProjects = styled(Text).attrs({
  fontSize: [1, 2, 3],
  mb: [3, 3, 4],
  color: 'silver',
})`
  flex-direction: column;
  cursor: pointer;
`

const ShowAllGrid = styled(Flex).attrs({
  justify: 'center',
  flexDirection: 'row',
  wrap: true,
  mb: 1,
})``

class Carousel extends Component {
  state = {
    autoplay: false,
    submitting: false,
    submissionData: {
      liveUrl: '',
      codeUrl: '',
    },
    authed: false,
    authData: {},
    liveFrameStatus: 'empty',
    liveFrameImage: null,
    showAll: false,
  }
  emptyProject = {
    user: { username: '' },
    empty: true,
    live_url: '',
    code_url: '',
    screenshot: {
      id: -1,
      created_at: '',
      updated_at: '',
      type: '',
      file_path: '',
    },
  }

  constructor(props) {
    super(props)

    const { slug } = props

    this.state.original = this.emptyProject
    this.state.projects = []
  }

  componentDidMount() {
    const { slug } = this.props

    api.get(`v1/workshops/${slug}/projects`).then(projects => {
      let original = projects.find(
        project => project.user && project.user.username == 'prophetorpheus'
      )
      if (original) {
        remove(projects, original)
        projects.unshift(original)
      } else original = this.emptyProject

      this.setState({
        original,
        projects,
      })
    })

    api
      .get(`v1/users/current`)
      .then(response => {
        console.log(
          'User is authorized! Auth data: ' + JSON.stringify(response)
        )
        this.setState({
          authed: true,
          authData: response,
        })
      })
      .catch(error => {
        console.log('User is not authorized! Error: ' + error.toString())
        this.setState({ authed: false, authData: {} })
      })
  }

  setLiveFrameStatus(liveFrameStatus) {
    this.setState({ liveFrameStatus })
  }

  setSubmissionData(submissionData) {
    // Disable "Live Frame" feature for now
    // this.setLiveFrameStatus(submissionData.liveUrl == '' ? 'empty' : 'loading')
    this.setState({ submissionData })
  }

  onClickSubmitButton() {
    this.setState({ submitting: true })
  }

  onClickShowAll() {
    this.setState({ showAll: !this.state.showAll })
  }

  onSignOut() {
    console.log('Signing out')
    this.setState({ authed: false, authData: {} })
  }

  render() {
    const { slug } = this.props
    const {
      original,
      projects,
      submitting,
      submissionData,
      authed,
      authData,
      liveFrameStatus,
      liveFrameImage,
      showAll,
    } = this.state

    const setSubmissionData = this.setSubmissionData.bind(this)
    const onClickSubmitButton = this.onClickSubmitButton.bind(this)
    const onClickShowAll = this.onClickShowAll.bind(this)
    const onSignOut = this.onSignOut.bind(this)

    const submissionProject = {
      user: authData,
      live_url: submissionData.liveUrl,
      code_url: submissionData.codeUrl,
      screenshot: {},
    }

    const sliderSettings = {
      arrows: false,
      speed: 500,
      autoplay: true,
      initialSlide: 0,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      pauseOnHover: true,
      variableWidth: true,
      focusOnSelect: true,
    }

    const projectCount = projects.length - (original ? 0 : 1)

    return (
      <CarouselOuter>
        <Heading.h3>
          {projectCount} Rehack
          {projectCount != 1 && 's'}
        </Heading.h3>
        <ShowAllProjects onClick={onClickShowAll} mb={[2, 2, 3]}>
          {showAll ? 'ok stack them back up' : 'Show All'}
        </ShowAllProjects>
        {showAll ? (
          <ShowAllGrid>
            {projects.map(project => (
              <CarouselProject
                project={project}
                key={project.screenshot.id}
                m={[1, 1, 2]}
              />
            ))}
          </ShowAllGrid>
        ) : (
          <SliderWrapper>
            {liveFrameStatus != 'empty' ? (
              <CarouselProject liveFrame project={submissionProject} />
            ) : projects.length == 0 ? (
              <CarouselProject project={this.emptyProject} />
            ) : (
              <RehackSlider {...sliderSettings}>
                {projects.map(project => (
                  <CarouselProject
                    project={project}
                    key={project.screenshot.id}
                  />
                ))}
              </RehackSlider>
            )}
          </SliderWrapper>
        )}

        {submitting ? (
          <CarouselSubmissionForm
            authed={authed}
            authData={authData}
            onSignOut={onSignOut}
            workshopSlug={slug}
            submissionData={submissionData}
            setSubmissionData={setSubmissionData}
          />
        ) : (
          <Button
            px={[3, 4, 4]}
            py={[2, 3, 3]}
            scale
            fontSize={4}
            onClick={onClickSubmitButton}
          >
            I made something
          </Button>
        )}
      </CarouselOuter>
    )
  }
}

export default Carousel
