import React, { Component } from 'react'
import { Avatar, Flex, Box } from 'rebass'
import { sample } from 'lodash'
import { mx } from './theme'
import fetch from 'unfetch'

const BUBBLES_URL =
  'https://api.hackclub.com/v1/home/slack_users?page=1&inc=72&res=192'

const Root = Flex.extend.attrs({
  justify: 'center',
  align: 'center',
  px: 3
})`
  position: relative;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`

const Fill = Flex.extend.attrs({ justify: 'center', wrap: true })`
  position: absolute;
  top: 0;
  z-index: -1;
`

const Cloud = Box.extend.attrs({ px: 3, pt: 3, mx: 'auto' })`
  max-width: 32rem;
  border-radius: 4rem;
  box-shadow: 0 0 2rem 2rem rgba(250, 250, 250, 0.95);
  background-color: rgba(250, 250, 250, 0.95);
  text-align: center;
  z-index: 2;
  ${mx[1]} {
    max-width: 48rem;
    border-radius: 8rem;
    box-shadow: 0 0 8rem 8rem rgba(250, 250, 250, 0.95);
  }
`

const Bubble = Avatar.extend`
  margin: 0.5em;
  &:nth-child(odd) {
    margin-left: 1.5em;
    margin-top: 0;
  }
  &:nth-child(even) {
    margin-right: 1em;
  }
  &:nth-child(6n) {
    width: 3em;
    height: 3em;
    margin-bottom: 1em;
  }
  &:nth-child(8n) {
    width: 2.5em;
    height: 2.5em;
    margin-left: 1em;
  }
  &:nth-child(13n) {
    width: 1.5em;
    height: 1.5em;
  }
  /* fill gap left by diagonal cutoff */
  ${mx[1]} {
    &:first-child {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 0;
      top: -4rem;
    }
    &:nth-child(2) {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 9rem;
      top: -3rem;
    }
    &:nth-child(3) {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 18rem;
      top: -3rem;
    }
  }
`

class Bubbles extends Component {
  constructor() {
    super()
    this.state = { list: [] }
  }

  componentDidMount() {
    fetch(BUBBLES_URL)
      .then(r => r.json())
      .then(d => d.profile_pictures)
      .then(list => this.setState({ list }))
  }

  render() {
    return (
      <Root>
        <Fill>
          {this.state.list.map((item, i) => (
            <Bubble
              src={item}
              size={sample([28, 32, 48, 56, 64, 72, 84])}
              key={`a-${i}`}
            />
          ))}
        </Fill>
        <Cloud children={this.props.children} />
      </Root>
    )
  }
}

export default Bubbles
