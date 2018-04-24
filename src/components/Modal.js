import React from 'react'
import { Card, IconButton } from '@hackclub/design-system'

const Modal = Card.extend`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.boxShadows[2]};
  z-index: 1100;

  position: fixed;
  top: 50%;
  left: 50%;
  /* Center */
  transform: translate(-50%, -50%);

  /* Responsive Size Control */
  width: 36rem;
  max-width: 95%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;

  button:first-child {
    position: fixed;
    top: 0;
    right: 0;
  }
`

const Overlay = Card.extend`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.375);
  backdrop-filter: blur(6px);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const CloseButton = props => (
  <IconButton name="close" color="muted" circle p={3} />
)

export default { Modal, Overlay, CloseButton }
