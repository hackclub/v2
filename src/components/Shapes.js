import React from 'react'
import { Box } from '@hackclub/design-system'

const Base = Box.withComponent('svg')
const Svg = ({ color = 'primary', rotate, style, ...props }) => (
  <Base
    xmlns="http://www.w3.org/2000/Svg"
    color={color}
    aria-label="Illustrative shape"
    role="img"
    style={{ transform: rotate && `rotate(${rotate}deg)`, ...style }}
    {...props}
  />
)

export const Circle = ({ size = 36, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" {...props}>
    <circle
      cx={212}
      cy={144}
      fill="none"
      fillRule="evenodd"
      r={16}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
      transform="translate(-194 -126)"
    />
  </Svg>
)
export const Hexagon = ({ size = 32, ...props }) => (
  <Svg width={size} height={size * (34 / 32)} viewBox="0 0 38 34" {...props}>
    <path
      d="M12.54 2.998c1.91-1.103 5.01-1.104 6.92 0l6.936 4.004c1.91 1.103 3.46 3.787 3.46 5.994v8.008c0 2.207-1.549 4.89-3.46 5.994l-6.935 4.004c-1.912 1.103-5.01 1.104-6.922 0l-6.935-4.004c-1.91-1.103-3.46-3.787-3.46-5.994v-8.008c0-2.207 1.549-4.89 3.46-5.994l6.935-4.004z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </Svg>
)
export const Line = ({ size = 36, ...props }) => (
  <Svg width={size} height={size / 9} viewBox="0 0 36 4" {...props}>
    <path
      d="M2 2h32"
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </Svg>
)
export const Pentagon = ({ size = 34, ...props }) => (
  <Svg width={size} height={size * (34 / 32)} viewBox="0 0 34 32" {...props}>
    <path
      d="M13.764 3.351c1.787-1.298 4.681-1.3 6.472 0l8.744 6.353c1.788 1.299 2.685 4.05 2 6.156l-3.34 10.28c-.682 2.1-3.022 3.804-5.236 3.804H11.596c-2.21 0-4.553-1.699-5.237-3.804L3.02 15.86c-.682-2.1.21-4.854 2-6.156l8.745-6.353z"
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </Svg>
)
export const Square = ({ size = 36, ...props }) => (
  <Svg width={size} height={size} rx={4} viewBox="0 0 36 36" {...props}>
    <rect
      fill="none"
      fillRule="evenodd"
      height={36}
      r={4}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
      width={36}
    />
  </Svg>
)
export const Triangle = ({ size, ...props }) => (
  <Svg width={size} height={size * (38 / 34)} viewBox="0 0 38 34" {...props}>
    <path
      d="M17.04 3.485c1.082-1.924 2.84-1.92 3.92 0l14.08 25.03c1.082 1.924.175 3.485-2.03 3.485H4.99c-2.204 0-3.11-1.565-2.03-3.485l14.08-25.03z"
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </Svg>
)

const hi = (
  <Box>
    <Triangle color="primary" size={128} />
    <Hexagon color="accent" size={128} />
    <Pentagon color="success" size={128} />
    <Circle color="warning" size={128} />
    <Square color="primary" size={128} />
    <Line color="info" size={128} />
  </Box>
)
