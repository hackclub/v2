import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
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

const OriginalWrapper = styled(Flex).attrs({ m: 0, mr: 1 })`
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

const RehackWrapper = styled(Flex).attrs({ m: 0, ml: 1 })`
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

const RehackSlider = styled(Slider).attrs({})`
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const CarouselOuter = styled(Flex).attrs({
  bg: '#EEE',
  m: 0,
  pt: 3,
  pb: 4,
  px: 4,
})`
  flex-direction: column;
  align-items: center;
`

const CarouselInner = styled(Flex).attrs({
  mb: 3,
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

  constructor(props) {
    super(props)

    const { slug } = props

    const exampleData = {
      user: { username: 'msw' },
      live_url: 'https://zachlatta.github.io',
      code_url: 'https://github.com/zachlatta/zachlatta.github.io',
      screenshot: {
        id: 4,
        created_at: '2018-04-13T03:18:50.716Z',
        updated_at: '2018-04-13T03:19:06.553Z',
        type: 'workshop_project_screenshot',
        file_path:
          '/rails/active_storage/variants/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2dMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f1d52341ad5ccaccbb2b3a4b1b191d57fd531b4/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdERG9LYzNSeWFYQlVPZzVwYm5SbGNteGhZMlZKSWdwUWJHRnVaUVk2QmtWVU9oSm5ZWFZ6YzJsaGJsOWliSFZ5Wmdrd0xqQTFPZ3h4ZFdGc2FYUjVTU0lJT0RVbEJqc0hWRG9MWkdWbWFXNWxTU0lhYW5CbFp6cGtZM1F0YldWMGFHOWtQV1pzYjJGMEJqc0hWRG9VYzJGdGNHeHBibWRmWm1GamRHOXlTU0lLTkRveU9qQUdPd2RVT2d0eVpYTnBlbVZKSWdrMU1EQjRCanNIVkE9PSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--7d4c10d23979a9bcafff7ea8da85dcefd2837226/Screenshot%202018-04-12%2020.18.17.png',
      },
    }

    this.state.original = { ...exampleData }
    this.state.projects = [
      { ...exampleData },
      { ...exampleData },
      { ...exampleData },
    ]
  }

  componentDidMount() {
    const self = this
    const { slug } = this.props

    api.get(`v1/workshops/${slug}/projects`).then(projects => {
      self.setState({
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
    // disabled Live Frame feature for now, since screenshotlayer free tier limits us here
    this.setLiveFrameStatus(submissionData.liveUrl == '' ? 'empty' : 'loading')
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
        <Helmet>
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Helmet>
        <Heading.h3 p={0} m={0} mb={3}>
          This workshop has {projects.length} rehack
          {projects.length == 1 ? '' : 's'}
        </Heading.h3>
        <CarouselInner>
          <Flex justify="space-between">
            <OriginalWrapper>
              <CarouselProject project={original} isOriginal={true} />
            </OriginalWrapper>

            <RehackWrapper>
              {liveFrameStatus != 'empty' ? (
                <CarouselProject
                  liveFrame
                  project={submissionProject}
                  isOriginal={false}
                />
              ) : (
                <RehackSlider {...sliderSettings}>
                  {projects.map(project => (
                    <CarouselProject project={project} isOriginal={false} />
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
            px={4}
            py={3}
            m={0}
            mb={0}
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
