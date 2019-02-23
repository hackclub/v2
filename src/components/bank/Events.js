import React from 'react'
import styled from 'styled-components'
import { theme } from '@hackclub/design-system'
import range from 'lodash/range'

const Base = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns:
    repeat(auto-fill, minmax(16rem, 1fr) minmax(16rem, 1fr))
    minmax(16rem, 1fr);
  overflow-x: hidden;
  overflow-y: visible;
  padding-top: 1.25rem;
  background: ${theme.colors.white};

  @-moz-document url-prefix() {
    grid-template-columns: repeat(auto-fill, 33.3333vw);
    li {
      margin: 20% 0 20% 0;
    }
    @media (min-width: 750px) {
      grid-template-columns: repeat(auto-fill, 20vw);
    }
    @media (min-width: 1050px) {
      grid-template-columns: repeat(auto-fill, 14.2857vw);
    }
    @media (min-width: 1350px) {
      grid-template-columns: repeat(auto-fill, 11.1111vw);
    }
    @media (min-width: 1650px) {
      grid-template-columns: repeat(auto-fill, 9.0909vw);
    }
  }
`

const Item = styled.li`
  margin: 20% 0 36% 0;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 2%;
    width: 100%;
    height: 116%;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 104%;
  }

  &:nth-child(2n + 1) {
    transform: skewY(30deg);
  }
  &:nth-child(2n) {
    transform: skewY(-30deg);
  }

  &:nth-child(2n):after {
    background-image: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.75)
    );
  }
  &:nth-child(2n + 1):after {
    background-image: linear-gradient(
      225deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.75) 100%
    );
  }

  // 1
  &:nth-child(6n):before {
    background-image: linear-gradient(
      -45deg,
      ${theme.colors.red[8]},
      ${theme.colors.red[7]},
      ${theme.colors.red[5]}
    );
    transform-origin: 0 0;
    transform: skewY(30deg) rotatez(-120deg) skewY(-30deg);
  }

  &:nth-child(6n + 5):before {
    background-image: linear-gradient(
      45deg,
      ${theme.colors.red[8]},
      ${theme.colors.red[6]},
      ${theme.colors.red[4]}
    );
    transform-origin: 100% 0;
    transform: skewY(-30deg) rotatez(120deg) skewY(30deg);
  }

  // 2
  &:nth-child(6n + 2):before {
    background-image: linear-gradient(
      -45deg,
      ${theme.colors.fuschia[9]},
      ${theme.colors.fuschia[6]},
      ${theme.colors.fuschia[5]}
    );
    transform-origin: 0 0;
    transform: skewY(30deg) rotatez(-120deg) skewY(-30deg);
  }

  &:nth-child(6n + 1):before {
    background-image: linear-gradient(
      45deg,
      ${theme.colors.blue[8]},
      ${theme.colors.blue[6]},
      ${theme.colors.blue[4]}
    );
    transform-origin: 100% 0;
    transform: skewY(-30deg) rotatez(120deg) skewY(30deg);
  }

  // 3
  &:nth-child(6n + 4):before {
    background-image: linear-gradient(
      -45deg,
      ${theme.colors.cyan[9]},
      ${theme.colors.cyan[6]},
      ${theme.colors.cyan[4]}
    );
    transform-origin: 0 0;
    transform: skewY(30deg) rotatez(-120deg) skewY(-30deg);
  }

  &:nth-child(6n + 3):before {
    background-image: linear-gradient(
      45deg,
      ${theme.colors.cyan[9]},
      ${theme.colors.cyan[6]},
      ${theme.colors.cyan[4]}
    );
    transform-origin: 100% 0;
    transform: skewY(-30deg) rotatez(120deg) skewY(30deg);
  }

  img {
    transform: scaleY(1.1547);
    object-fit: cover;
    max-width: 100%;
    max-height: 16rem;
    height: 100%;
  }
`

export default () => (
  <Base py={[5, 6, 7, 8]}>
    {range(24).map(i => (
      <Item key={i}>
        <img src={`/bank/grid/${i + 1}.jpg`} />
      </Item>
    ))}{' '}
  </Base>
)
