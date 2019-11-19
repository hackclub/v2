import React from 'react'
import styled from 'styled-components'
import { Box, theme } from '@hackclub/design-system'
import { Link } from 'gatsby'

const Base = styled(Box.withComponent(Link)).attrs({
  bg: 'blue.5',
  color: 'white',
  align: 'center',
  width: 1,
  py: [2, 3],
  px: 3
})`
  display: block;
  background-image: linear-gradient(
    to bottom right,
    ${theme.colors.blue[5]},
    ${theme.colors.blue[6]}
  );
  border-radius: ${theme.radii[3]} ${theme.radii[3]} 0 0;
  position: relative;
  overflow: hidden;
  svg {
    position: absolute;
    z-index: 0;
    &:first-of-type {
      left: ${theme.space[1]}px;
      top: ${theme.space[2]}px;
      ${theme.mediaQueries.md} {
        left: ${theme.space[4]}px;
        width: ${42 * 1.25}px;
        height: ${50 * 1.25}px;
      }
    }
    &:last-of-type {
      right: ${theme.space[2]}px;
      bottom: ${theme.space[1]}px;
      ${theme.mediaQueries.md} {
        right: ${theme.space[7]}px;
        width: ${27 * 2}px;
        height: ${24 * 2}px;
      }
    }
  }
  span {
    position: relative;
    z-index: 2;
  }
  + div {
    border-radius: 0 0 ${theme.radii[3]} ${theme.radii[3]};
  }
`

const CandyCane = () => (
  <svg
    width={42 * 0.75}
    height={50 * 0.75}
    viewBox="0 0 42 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      maskType="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="42"
      height="50"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.1602 8.74167C20.3988 3.95875 14.2829 2.32 9.49999 5.08142C4.71707 7.84284 3.07832 13.9587 5.83974 18.7417L21.8397 46.4545C22.9443 48.3677 25.3907 49.0232 27.3038 47.9186C29.217 46.814 29.8725 44.3677 28.7679 42.4545L12.7679 14.7417C12.2157 13.7851 12.5434 12.5619 13.5 12.0096C14.4566 11.4573 15.6798 11.7851 16.232 12.7417L20.232 19.6699C21.3366 21.583 23.783 22.2385 25.6961 21.134C27.6093 20.0294 28.2648 17.583 27.1602 15.6699L23.1602 8.74167Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M23.1602 8.74167C20.3988 3.95875 14.2829 2.32 9.49999 5.08142C4.71707 7.84284 3.07832 13.9587 5.83974 18.7417L21.8397 46.4545C22.9443 48.3677 25.3907 49.0232 27.3038 47.9186C29.217 46.814 29.8725 44.3677 28.7679 42.4545L12.7679 14.7417C12.2157 13.7851 12.5434 12.5619 13.5 12.0096C14.4566 11.4573 15.6798 11.7851 16.232 12.7417L20.232 19.6699C21.3366 21.583 23.783 22.2385 25.6961 21.134C27.6093 20.0294 28.2648 17.583 27.1602 15.6699L23.1602 8.74167Z"
        fill="white"
      />
      <path
        d="M18.8397 41.2583L24.7679 35.5263L27.7679 40.7224L21.8397 46.4545L18.8397 41.2583Z"
        fill="#E42D42"
      />
      <path
        d="M13.8397 32.5981L19.7679 26.866L22.7679 32.0622L16.8397 37.7942L13.8397 32.5981Z"
        fill="#E42D42"
      />
      <path
        d="M8.83974 23.9378L14.7679 18.2058L17.7679 23.4019L11.8397 29.134L8.83974 23.9378Z"
        fill="#E42D42"
      />
      <path
        d="M3.83974 15.2776L12.701 13.6257L12.7679 14.7417L6.83974 20.4737L3.83974 15.2776Z"
        fill="#E42D42"
      />
      <path
        d="M20.7272 5.52757L14.866 12.3756L13.5801 2.14841L20.7272 5.52757Z"
        fill="#E42D42"
      />
      <path
        d="M4.12083 8.76443L12.884 12.9426L13.75 12.4426L8.99999 4.21539L4.12083 8.76443Z"
        fill="#E42D42"
      />
      <path
        d="M17.732 15.3397L23.6602 9.6077L26.6602 14.8038L20.732 20.5359L17.732 15.3397Z"
        fill="#E42D42"
      />
    </g>
  </svg>
)

const Mug = () => (
  <svg
    width="27"
    height="24"
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="23" cy="14" r="3" stroke="#F6BBC2" stroke-width="2" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 14V8C0.5 10.1667 3.5 15.5 11.5 15.5C19.5 15.5 23.3333 10 24 8V14C24 19.5228 18.6274 24 12 24C5.37258 24 0 19.5228 0 14Z"
      fill="#E42D42"
    />
    <path
      d="M23.5 9.5C23.5 3.97715 18.6274 1.90735e-06 12 1.90735e-06C5.37258 1.90735e-06 0.5 3.47715 0.5 9C0.5 9 5.37258 6 12 6C18.6274 6 23.5 9.5 23.5 9.5Z"
      fill="#E42D42"
    />
    <ellipse cx="12" cy="9" rx="11" ry="6" fill="#6A3515" />
    <path
      d="M23.5 8C23.5 9.98995 22.2901 11.8527 20.2079 13.2408C18.1292 14.6266 15.2288 15.5 12 15.5C8.77124 15.5 5.87075 14.6266 3.79207 13.2408C1.70989 11.8527 0.5 9.98995 0.5 8C0.5 6.01005 1.70989 4.14729 3.79207 2.75917C5.87075 1.37338 8.77124 0.5 12 0.5C15.2288 0.5 18.1292 1.37338 20.2079 2.75917C22.2901 4.14729 23.5 6.01005 23.5 8Z"
      stroke="#F6BBC2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7C8 6.44772 7.10457 6 6 6C4.89543 6 4 6.44772 4 7V10H8V7Z"
      fill="white"
    />
    <ellipse cx="6" cy="10" rx="2" ry="1" fill="#EBEDEF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8284 5.5657L19.5255 7.26274L17.2627 9.52549L15.5657 7.82844C15.5657 7.82844 15.5657 7.82843 15.5657 7.82843C15.2533 7.516 15.5065 6.75622 16.1314 6.13139C16.7562 5.50655 17.516 5.25329 17.8284 5.56569C17.8284 5.56569 17.8284 5.5657 17.8284 5.5657Z"
      fill="white"
    />
    <ellipse
      cx="18.3941"
      cy="8.39415"
      rx="1.6"
      ry="0.8"
      transform="rotate(-45 18.3941 8.39415)"
      fill="#EBEDEF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2628 9.5657L10.5657 11.2627L12.8285 13.5255L14.5255 11.8284C14.5255 11.8284 14.5255 11.8284 14.5255 11.8284C14.8379 11.516 14.5846 10.7562 13.9598 10.1314C13.335 9.50655 12.5752 9.25329 12.2628 9.56569C12.2628 9.56569 12.2628 9.5657 12.2628 9.5657Z"
      fill="white"
    />
    <ellipse
      rx="1.6"
      ry="0.8"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 11.6971 12.3942)"
      fill="#EBEDEF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.697 4.42423L9.42426 5.69701L11.1213 7.39407L12.3941 6.12129C12.3941 6.12128 12.3941 6.12128 12.3941 6.12128C12.6284 5.88696 12.4385 5.31712 11.9698 4.84849C11.5012 4.37987 10.9314 4.18992 10.697 4.42422C10.697 4.42422 10.697 4.42423 10.697 4.42423Z"
      fill="white"
    />
    <ellipse
      rx="1.2"
      ry="0.6"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10.2728 6.54555)"
      fill="#EBEDEF"
    />
  </svg>
)

export default () => (
  <Base to="/santa">
    <CandyCane />
    <span>
      Join the <strong>Hack Club Secret Santa</strong>&nbsp;&rarr;
    </span>
    <Mug />
  </Base>
)
