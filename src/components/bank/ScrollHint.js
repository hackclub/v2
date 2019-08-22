import React from 'react'
import styled from 'styled-components'

const ScrollCaret = styled.div`
  display: block;
  position: relative;
  z-index: 500;
  height: 32px;
  width: 32px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  opacity: .6;
  cursor: pointer;
  transition: transform .3s;

  &:hover {
    transform: translateY(4px) rotate(45deg) ;
  }

  &:active {
    transform: translateY(6px) rotate(45deg) ;
  }
`

export default function ScrollHint() {
  return <ScrollCaret onClick={() => {
    const scrollTo = () => {
      if (document.scrollingElement.scrollTop < window.innerHeight) {
        document.scrollingElement.scrollTop += 50;
        requestAnimationFrame(scrollTo);
      }
    }
    requestAnimationFrame(scrollTo);
  }}/>
}
