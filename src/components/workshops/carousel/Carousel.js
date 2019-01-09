import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { remove } from 'lodash'

import api from 'api'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Text,
  Heading,
  LargeButton,
  Loading,
  Icon,
  theme
} from '@hackclub/design-system'

import CarouselProject from './CarouselProject'
import CarouselSubmissionForm from './CarouselSubmissionForm'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RehackSlider = styled(Slider)`
  align-self: stretch;
  .slick-center {
    padding: 0 ${theme.space[3]}px;
    ${theme.mediaQueries.md} {
      padding: 0;
    }
  }
`

const CarouselOuter = styled(Flex).attrs({
  bg: 'smoke',
  color: 'black',
  pt: [2, 3, 4],
  pb: [3, null, 4],
  flexDirection: 'column',
  align: 'center'
})``

const StaticWrapper = styled(Flex).attrs({ mb: [3, 3, 4], justify: 'center' })`
  align-self: stretch;
`

const SliderWrapper = styled(Box).attrs({ mb: [0, 3, 4] })`
  align-self: stretch;
`

const ShowAllProjects = styled(Flex).attrs({
  align: 'center',
  fontSize: [2, 3],
  color: 'muted'
})`
  cursor: pointer;
  svg {
    transform: rotate(-90deg);
    transition: ${theme.transition} transform;
  }
  &[aria-expanded='true'] svg {
    transform: rotate(0deg);
  }
`

const ShowAllGrid = styled(Flex).attrs({
  justify: 'center',
  flexDirection: 'row',
  wrap: true,
  px: 3,
  mb: 1
})``

const LoadingWrapper = styled(Box)`
  position: relative;
  width: 140px;
  height: 140px;
`

const LoadingCarousel = () => (
  <Fragment>
    <Heading.h3>Loading Projects…</Heading.h3>
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  </Fragment>
)

const AllProjects = projects => (
  <ShowAllGrid>
    {projects.map(project => (
      <CarouselProject
        project={project}
        key={project.screenshot.id}
        m={[1, null, 2]}
      />
    ))}
  </ShowAllGrid>
)

const LiveProject = submissionProject => (
  <StaticWrapper>
    <CarouselProject liveFrame project={submissionProject} />
  </StaticWrapper>
)

const EmptyProject = emptyProject => (
  <StaticWrapper>
    <CarouselProject project={emptyProject} />
  </StaticWrapper>
)

const ShortList = projects => (
  <StaticWrapper>
    {projects.map(project => (
      <CarouselProject project={project} key={project.screenshot.id} />
    ))}
  </StaticWrapper>
)

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
  focusOnSelect: true
}

const SliderList = projects => (
  <SliderWrapper>
    <RehackSlider {...sliderSettings}>
      {projects.map(project => (
        <CarouselProject project={project} key={project.screenshot.id} />
      ))}
    </RehackSlider>
  </SliderWrapper>
)

const LoadedCarousel = (
  projects,
  projectCount,
  showAll,
  onClickShowAll,
  liveFrameStatus,
  submissionProject,
  emptyProject
) => (
  <Fragment>
    <Flex
      flexDirection={['column', null, 'row']}
      align="center"
      mb={[0, null, 3]}
    >
      <Heading.h3 fontSize={4} mr={[null, null, 3]}>
        {projectCount} Rehack
        {projectCount != 1 && 's'}
      </Heading.h3>
      <ShowAllProjects onClick={onClickShowAll} aria-expanded={showAll}>
        <Icon glyph="down-caret" size={32} />
        <Text.span ml={1} children={showAll ? 'Show Fewer' : 'Show All'} />
      </ShowAllProjects>
    </Flex>
    {showAll
      ? AllProjects(projects)
      : liveFrameStatus != 'empty'
        ? LiveProject(submissionProject)
        : projects.length == 0
          ? EmptyProject(emptyProject)
          : projects.length < 3
            ? ShortList(projects)
            : SliderList(projects)}
  </Fragment>
)

class Carousel extends Component {
  state = {
    loading: true,
    submitting: false,
    submissionData: {
      liveUrl: '',
      codeUrl: ''
    },
    authed: false,
    authData: {},
    liveFrameStatus: 'empty',
    liveFrameImage: null,
    showAll: false,
    original: this.emptyProject,
    projects: []
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
      file_path: ''
    }
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
        loading: false,
        original,
        projects
      })
    })

    api
      .get(`v1/users/current`)
      .then(authData => {
        console.log(
          `User is authorized! Auth data: ${JSON.stringify(authData)}`
        )
        this.setState({ authed: true, authData })
      })
      .catch(error => {
        console.log(`User is not authorized! Error: ${JSON.stringify(error)}`)
        this.setState({ authed: false, authData: {} })
      })
  }

  setLiveFrameStatus(liveFrameStatus) {
    this.setState({ liveFrameStatus })
  }

  setSubmissionData = submissionData => {
    // Disable "Live Frame" feature for now
    // this.setLiveFrameStatus(submissionData.liveUrl == '' ? 'empty' : 'loading')
    this.setState({ submissionData })
  }

  onClickSubmitButton = () => {
    this.setState({ submitting: true })
  }

  onClickShowAll = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  onSignOut = () => {
    console.log('Signing out')
    this.setState({ authed: false, authData: {} })
  }

  render() {
    const { slug } = this.props
    const {
      loading,
      original,
      projects,
      submitting,
      submissionData,
      authed,
      authData,
      liveFrameStatus,
      // liveFrameImage,
      showAll
    } = this.state

    const {
      setSubmissionData,
      onClickSubmitButton,
      onClickShowAll,
      onSignOut,
      emptyProject
    } = this

    const submissionProject = {
      user: authData,
      live_url: submissionData.liveUrl,
      code_url: submissionData.codeUrl,
      screenshot: {}
    }

    const projectCount = projects.length - (original ? 0 : 1)

    return (
      <CarouselOuter>
        {loading
          ? LoadingCarousel()
          : LoadedCarousel(
              projects,
              projectCount,
              showAll,
              onClickShowAll,
              liveFrameStatus,
              submissionProject,
              emptyProject
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
          <LargeButton scale fontSize={4} onClick={onClickSubmitButton}>
            I made something
          </LargeButton>
        )}
      </CarouselOuter>
    )
  }
}

export default Carousel
