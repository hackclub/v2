// Heavily inspired by https://github.com/jungledre/react-snow-effect
import React, { Component } from 'react'

const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 768

class Snow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intervalTracker: null,
      canvasCtx: null,
      height: props.height || window.innerHeight || DEFAULT_HEIGHT,
      width: props.width || window.innerWidth || DEFAULT_WIDTH
    }

    this.canvas = React.createRef()
  }

  componentDidMount() {
    // Canvas init
    const { canvas } = this
    const canvasCtx = canvas[0].getContext('2d')

    this.setState({ canvasCtx })
    const { width: W, height: H } = this.state

    // Particles
    const max = 32
    const particles = []
    for (let i = 0; i < max; i++) {
      particles.push({
        x: Math.random() * W, // x-coordinate
        y: Math.random() * H, // y-coordinate
        r: Math.random() * 4 + 1, // radius
        d: Math.random() * max // density
      })
    }

    // Draw the flakes
    const draw = () => {
      canvasCtx.clearRect(0, 0, W, H)

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      canvasCtx.beginPath()
      for (let i = 0; i < mp; i++) {
        const p = particles[i]
        canvasCtx.moveTo(p.x, p.y)
        canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
      }
      canvasCtx.fill()
      update()
    }

    // Function to move the snowflakes
    // angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0

    const update = () => {
      angle += 0.01
      for (let i = 0; i < mp; i++) {
        const p = particles[i]
        // Updating X and Y coordinates
        // We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        // Every particle has its own density which can be used to make the downward movement different for each flake
        // Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2
        p.x += Math.sin(angle) * 2

        // Sending flakes back from the top when it exits
        // Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            // 66.67% of the flakes
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d }
          } else {
            // If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              // Enter from the left
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d }
            } else {
              // Enter from the right
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d }
            }
          }
        }
      }
    }

    this.setState({ intervalTracker: setInterval(draw, 32) })

    // Animation loop
    this.state.intervalTracker
  }

  componentWillUnmount() {
    this.state.canvasCtx.clearRect(0, 0, this.state.width, this.state.height)
    clearInterval(this.state.intervalTracker)
  }

  render() {
    const snowStyles = {
      margin: 0,
      padding: 0,
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      zIndex: 1
    }

    return (
      <canvas
        ref={this.canvas}
        style={snowStyles}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }
}

export default Snow
