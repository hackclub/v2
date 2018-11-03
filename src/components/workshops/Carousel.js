import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

import api from 'api'
import styled from 'styled-components'
import {
  Box,
  Card,
  Container,
  Flex,
  Label,
  Heading,
  Button,
  theme,
} from '@hackclub/design-system'

import CarouselProject from 'components/workshops/CarouselProject'
import CarouselSubmissionForm from 'components/workshops/CarouselSubmissionForm'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OriginalWrapper = styled(Flex).attrs({ mr: 1 })`
  width: 200px;
  flex-grow: 1;
  flex-shrink: 1;
  align-self: center;
  overflow: hidden;
  position: relative;

  ${theme.mediaQueries.sm} {
    width: 240px;
  }
  ${theme.mediaQueries.md} {
    width: 350px;
  }
`

const RehackWrapper = styled(Flex).attrs({ ml: 1 })`
  width: 200px;
  flex-direction: column;
  flex-shrink: 1;
  align-self: stretch;
  overflow: hidden;
  position: relative;

  ${theme.mediaQueries.sm} {
    width: 240px;
  }
  ${theme.mediaQueries.md} {
    width: 350px;
  }
`

const RehackSlider = styled(Slider)`
  margin: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const CarouselOuter = styled(Flex).attrs({
  bg: theme.colors.smoke,
  m: 0,
  p: [2, 3, 4],
  flexDirection: 'column',
  align: 'center',
})``

const CarouselInner = styled(Flex).attrs({
  mb: [2, 3, 4],
})`
  flex-direction: column;
`
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
    const self = this
    const { slug } = this.props

    api.get(`v1/workshops/${slug}/projects`).then(projects => {
      const original =
        projects.length > 0 ? projects.shift() : this.emptyProject

      self.setState({
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
        self.setState({
          authed: true,
          authData: response,
        })
      })
      .catch(error => {
        console.log('User is not authorized! Error: ' + error.toString())
        self.setState({ authed: false, authData: {} })
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
    } = this.state

    const setSubmissionData = this.setSubmissionData.bind(this)
    const onClickSubmitButton = this.onClickSubmitButton.bind(this)
    const onSignOut = this.onSignOut.bind(this)

    const submissionProject = {
      user: authData,
      live_url: submissionData.liveUrl,
      code_url: submissionData.codeUrl,
      screenshot: {},
    }

    const sliderSettings = {
      dots: false,
      arrows: false,
      vertical: true,
      verticalSwiping: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      initialSlide: projects.length - 1,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true,
    }

    return (
      <CarouselOuter>
        <Heading.h3 mb={[2, 3, 4]}>
          {projects.length} Rehack
          {projects.length == 1 ? '' : 's'}
        </Heading.h3>
        <CarouselInner>
          <Flex justify="space-between">
            <OriginalWrapper>
              <CarouselProject project={original} isOriginal />
            </OriginalWrapper>

            <RehackWrapper>
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
            </RehackWrapper>
          </Flex>
        </CarouselInner>
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
