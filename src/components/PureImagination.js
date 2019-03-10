import React, { Component } from 'react'

export default class extends Component {
  codeword = 'pi'

  state = { progress: 0 }

  componentDidMount() {
    window.document.onkeypress = e => {
      const shouldProgress = e.key === this.codeword[this.state.progress]
      this.setState(state => ({
        progress: shouldProgress ? state.progress + 1 : 0
      }))
    }
  }

  render() {
    return this.state.progress === this.codeword.length ? (
      <iframe
        title="pi"
        width={560}
        height={315}
        src="https://www.youtube.com/embed/knIfoQW_mZg?autoplay=1"
        frameborder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ display: 'none' }}
      />
    ) : null
  }
}
