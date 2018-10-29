import React, { Component, Fragment } from 'react'
import LoginForm from 'components/auth/LoginForm'
import api from 'api'
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section,
  Image,
  Button,
  IconButton,
  BackgroundImage,
  Loading,
  Input,
  theme
} from '@hackclub/design-system'

class CarouselProject extends Component {
  state = { status: 'loading' }

  onClickImage() {
    console.log('Clicking Image')
    return
    const { live_url } = this.props.project
    window.open(live_url, '_blank')
  }

  render() {
    const { project, isOriginal = false, liveFrame = false } = this.props
    const { author = 'unknown', live_url, code_url, screenshot } = project

    const onClickImage = this.onClickImage.bind(this)
    const authorString = isOriginal ? `By ${author};` : `Rehacked by ${author}`

    const imageUrl = liveFrame
      ? (function() {
          const url = live_url
          const accessKey = 'aea918a9ac513602f9dcba0591863479'
          return `http://api.screenshotlayer.com/api/capture?access_key=${accessKey}&url=${url}&viewport=1440x900&format=PNG`
        })()
      : 'http://api.hackclub.com' + screenshot.file_path

    return (
      <Flex
        p={4}
        bg="#FFF"
        style={{
          margin: 10,
          borderRadius: 5,
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column'
        }}
      >
        <Heading.h4
          style={{
            alignSelf: isOriginal ? 'flex-end' : 'flex-start'
          }}
        >
          {authorString}
        </Heading.h4>
        <Image
          width={640}
          height={400}
          src={imageUrl}
          onClick={onClickImage}
          style={{
            cursor: 'Pointer'
          }}
        />
        <A href={live_url} />
        <A href={code_url}>Code!</A>
      </Flex>
    )
  }
}

class CarouselSubmissionForm extends Component {
  state = { liveUrl: '', codeUrl: '', email: '' }

  onClickSubmitButton() {
    console.log('Clicking Submit Button')
    const { workshopSlug } = this.props
    const { liveUrl, codeUrl, email } = this.state

    return fetch(
      'https://api.hackclub.com/v1/workshops/' + workshopSlug + '/projects',
      {
        method: 'POST',
        body: JSON.stringify({
          live_url: liveUrl,
          code_url: codeUrl
          // screenshot_id: screenshotId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(resp => resp.json())
  }

  onChangeLiveURL(event) {
    const liveUrl = event.target.value
    const { codeUrl, email } = this.state
    this.setState({ liveUrl })
    this.props.setSubmissionData({ liveUrl, codeUrl, email })
  }

  onChangeCodeURL(event) {
    const codeUrl = event.target.value
    const { liveUrl, email } = this.state
    this.setState({ codeUrl })
    this.props.setSubmissionData({ liveUrl, codeUrl, email })
  }

  onChangeEmail(event) {
    const email = event.target.value
    const { codeUrl, liveUrl } = this.state
    this.setState({ email })
    this.props.setSubmissionData({ liveUrl, codeUrl, email })
  }

  render() {
    const { workshopSlug } = this.props
    const { liveUrl, codeUrl, email } = this.state

    const onClickSubmitButton = this.onClickSubmitButton.bind(this)
    const onChangeLiveURL = this.onChangeLiveURL.bind(this)
    const onChangeCodeURL = this.onChangeCodeURL.bind(this)
    const onChangeEmail = this.onChangeEmail.bind(this)

    const disableSubmission = liveUrl == '' || codeUrl == '' || email == ''

    return (
      <Flex
        p={4}
        bg="#FFF"
        style={{
          margin: 10,
          borderRadius: 5,
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column'
        }}
      >
        <Input
          placeholder="Live URL (where can we see the final product?)"
          value={liveUrl}
          onChange={onChangeLiveURL}
        />
        <Input
          placeholder="Code URL (where can we see the code?)"
          value={codeUrl}
          onChange={onChangeCodeURL}
        />
        <Input
          placeholder="Email (non-public; just gotta verify you're human)"
          value={email}
          onChange={onChangeEmail}
        />
        <Button
          disabled={disableSubmission}
          onClick={disableSubmission ? null : onClickSubmitButton}
          style={{ flexGrow: 1 }}
        >
          Verify & Submit
        </Button>
      </Flex>
    )
  }
}

class Carousel extends Component {
  state = {
    autoplay: false,
    projectIndex: 0,
    submitting: false,
    submissionData: {
      liveUrl: '',
      codeUrl: '',
      email: ''
    },
    liveFrameStatus: 'empty',
    liveFrameImage: null
  }

  constructor(props) {
    super(props)

    const { slug } = props
    console.log('Slug is ' + slug)

    const exampleData = {
      author: 'msw',
      live_url: 'https://zachlatta.github.io',
      code_url: 'https://github.com/zachlatta/zachlatta.github.io',
      screenshot: {
        id: 4,
        created_at: '2018-04-13T03:18:50.716Z',
        updated_at: '2018-04-13T03:19:06.553Z',
        type: 'workshop_project_screenshot',
        file_path:
          '/rails/active_storage/variants/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2dMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f1d52341ad5ccaccbb2b3a4b1b191d57fd531b4/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdERG9LYzNSeWFYQlVPZzVwYm5SbGNteGhZMlZKSWdwUWJHRnVaUVk2QmtWVU9oSm5ZWFZ6YzJsaGJsOWliSFZ5Wmdrd0xqQTFPZ3h4ZFdGc2FYUjVTU0lJT0RVbEJqc0hWRG9MWkdWbWFXNWxTU0lhYW5CbFp6cGtZM1F0YldWMGFHOWtQV1pzYjJGMEJqc0hWRG9VYzJGdGNHeHBibWRmWm1GamRHOXlTU0lLTkRveU9qQUdPd2RVT2d0eVpYTnBlbVZKSWdrMU1EQjRCanNIVkE9PSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--7d4c10d23979a9bcafff7ea8da85dcefd2837226/Screenshot%202018-04-12%2020.18.17.png'
      }
    }

    this.state.original = { ...exampleData }
    this.state.projects = [
      { ...exampleData },
      { ...exampleData },
      { ...exampleData }
    ]

    api.get(`v1/workshops/${slug}/projects`).then(projects => {
      this.setState({
        projects
      })
    })
  }

  setLiveFrameStatus(liveFrameStatus) {
    this.setState({ liveFrameStatus })
  }

  setSubmissionData(submissionData) {
    this.setLiveFrameStatus(submissionData.liveUrl == '' ? 'empty' : 'loading')
    this.setState({ submissionData })
  }

  onClickSubmitButton() {
    const { projects, projectIndex, autoplay } = this.state
    if (autoplay) this.cancelAutoplay()
    this.setState({ submitting: true })
  }

  setProjectIndex(index) {
    const { projects, projectIndex } = this.state
    index = Math.min(index, projects.length - 1)
    index = Math.max(index, 0)
    this.setState({ projectIndex: index })
  }

  nextProject() {
    console.log('Showing Next Rehack')
    const { projects, projectIndex } = this.state
    this.setProjectIndex(projectIndex + 1)
  }

  previousProject() {
    console.log('Showing Previous Rehack')
    const { projects, projectIndex } = this.state
    this.setProjectIndex(projectIndex - 1)
  }

  onClickNextButton() {
    const { projects, projectIndex, autoplay } = this.state
    if (autoplay) this.cancelAutoplay()
    this.nextProject()
  }

  onClickPreviousButton() {
    const { projects, projectIndex, autoplay } = this.state
    if (autoplay) this.cancelAutoplay()
    this.previousProject()
  }

  cancelAutoplay() {
    console.log('Cancelling autoplay')
    this.setState({ autoplay: false })
    clearInterval(this.state.autoplayId)
  }

  beginAutoplay() {
    console.log('Beginning autoplay')
    const cb = this.advanceAutoplay.bind(this)
    const autoplayId = setInterval(cb, 5000)
    this.setState({
      autoplay: true,
      autoplayId
    })
  }

  advanceAutoplay() {
    console.log('Advancing autoplay')
    this.nextProject()
  }

  componentDidMount() {
    this.beginAutoplay()
  }

  render() {
    const { slug } = this.props
    const {
      original,
      projects,
      projectIndex,
      submitting,
      submissionData,
      liveFrameStatus,
      liveFrameImage
    } = this.state

    const onClickNextButton = this.onClickNextButton.bind(this)
    const onClickPreviousButton = this.onClickPreviousButton.bind(this)
    const onClickSubmitButton = this.onClickSubmitButton.bind(this)

    const setSubmissionData = this.setSubmissionData.bind(this)
    const setLiveFrameStatus = this.setLiveFrameStatus.bind(this)

    const submissionProject =
      liveFrameStatus == 'empty'
        ? projects[projectIndex]
        : {
            live_url: submissionData.liveUrl,
            code_url: submissionData.codeUrl,
            screenshot: {}
          }

    const sliderSettings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      flexGrow: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      style: {
        flexGrow: 1,
        flexShrink: 1
      }
    }

    return (
      <Container>
        <Card
          bg="#EEE"
          flexDirection="column"
          align="stretch"
          justify="space-between"
          boxShadowSize="lg"
          style={{
            margin: 10,
            borderRadius: 20
          }}
        >
          <Flex style={{ flexDirection: 'column' }}>
            <Flex justify="space-between" style={{}}>
              <CarouselProject project={original} isOriginal={true} />
              <CarouselProject
                project={submissionProject}
                isOriginal={false}
                liveFrame={liveFrameStatus != 'empty'}
              />
              {submitting ? null : (
                <Flex
                  style={{
                    flexDirection: 'column',
                    flexBasis: 50,
                    flexGrow: 0,
                    margin: 10
                  }}
                >
                  <IconButton
                    glyph="up"
                    bg="info"
                    color="white"
                    onClick={onClickPreviousButton}
                    style={{
                      flexBasis: 0,
                      flexGrow: 1
                    }}
                  />
                  <IconButton
                    glyph="down"
                    bg="info"
                    color="white"
                    onClick={onClickNextButton}
                    style={{
                      flexBasis: 0,
                      flexGrow: 1
                    }}
                  />
                </Flex>
              )}
            </Flex>
            {submitting ? (
              <CarouselSubmissionForm
                workshopSlug={slug}
                setLiveFrameStatus={setLiveFrameStatus}
                setSubmissionData={setSubmissionData}
              />
            ) : (
              <Button onClick={onClickSubmitButton} style={{ flexGrow: 1 }}>
                I Made A Thing
              </Button>
            )}
          </Flex>
        </Card>
      </Container>
    )
  }
}

export default Carousel
