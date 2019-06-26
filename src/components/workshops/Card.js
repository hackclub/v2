import React, { useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Sheet from 'components/Sheet'

export default ({ children }) => {
  const ref = useRef()
  const [isHovered, setHovered] = useState(false)
  const [animatedProps, setAnimatedProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
  }))

  return (
    <animated.a
      href="#"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft))

        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop))

        const dampen = 50
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen,
          (x - ref.current.clientWidth / 2) / dampen,
          1.07
        ]

        setAnimatedProps({ xys: xys })
      }}
      onMouseLeave={() => {
        setHovered(false)
        setAnimatedProps({ xys: [0, 0, 1] })
      }}
      style={{
        zIndex: isHovered ? 2 : 1,
        transform: animatedProps.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        )
      }}
    >
      <Sheet>Hello!</Sheet>
    </animated.a>
  )
}
