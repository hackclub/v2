import React from 'react'
import { Card } from '@hackclub/design-system'

const Modal = Card.extend`
  background-color: #fff;
  z-index: 1100;

  position: fixed;
  top: 50%;
  left: 50%;
  /* Center */
  transform: translate(-50%, -50%);

  /* Responsive Size Control */
  width: 700px;
  max-width: 95%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`

export default Modal
