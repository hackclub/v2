import React, { Component } from 'react'

export default class extends Component {
  codeword = 'pure imagination'

  state = { progress: 0 }

  componentDidMount() {
    window.document.onkeypress = e => {
      let shouldProgress = e.key == this.codeword[this.state.progress]
      this.setState(state => ({ progress: shouldProgress ? state.progress + 1 : 0 }))
    }
  }

  render() {
    if (this.state.progress == this.codeword.length) {
      return (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/knIfoQW_mZg?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ display: 'none' }}
        />
      )
    } else {
      return null
    }
  }
}
