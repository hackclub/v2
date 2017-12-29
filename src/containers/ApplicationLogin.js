import React, { Component } from 'react'
import EmailLoginForm from '../components/EmailLoginForm'
import LoginCodeForm from '../components/LoginCodeForm'
import { Box, Container, Provider, Text, Heading } from 'rebass'
import theme, { mx } from '../theme'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Header = Box.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  color: 'white',
  px: 3,
  pb: 3
})`text-align: center;`

const Base = Container.extend.attrs({
  py: 4,
  px: 3,
  maxWidth: 40 * 16
})`
  display: grid;
  grid-gap: 1rem;
  ${mx[1]} {
    grid-template-columns: repeat(1, 1fr);
    h2, .textarea { grid-column: 1 / -1; }
  }
`

const Revealer = props => (
  <div style={{visibility: props.reveal ? 'visible' : 'hidden'}}>
    { props.children }
  </div>
)

class ApplicationLogin extends Component {
  constructor(props) {
    super(props)

    this.state = { emailSent: false }
    this.submitCallback = this.submitCallback.bind(this)
  }

  submitCallback(data) {
    this.setState({
      ...data,
      emailSent: true
    })
  }

  render() {
    const { emailSent, applicantId } = this.state

    return (
      <Provider theme={theme}>
        <Header>
          <Nav />
          <Heading is="h1" f={[5, 6]} mt={4}>
            Welcome!
          </Heading>
          <Heading f={[3, 4]} mt={2} style={{ fontWeight: 'normal' }}>
            Login to get started or resume your application
          </Heading>
        </Header>
        <Base>
          <EmailLoginForm submitCallback={this.submitCallback} />
          <Revealer reveal={emailSent}>
            <LoginCodeForm id={applicantId} />
          </Revealer>
        </Base>
        <Footer />
      </Provider>
    )
  }
}

export default ApplicationLogin
