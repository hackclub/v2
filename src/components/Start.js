import React from 'react'
import { Heading, Subhead, Column } from 'rebass'
import Section from './Section'
import CTA from './CTA'
import { cx, wk, mx } from '../theme'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)

const Background = Section.extend.attrs({
  direction: ['column', null, 'row'],
  justify: 'space-around'
})`
  background-color: ${cx('red.5')};
  background-image: linear-gradient(
    48deg,
    ${cx('red.6')} 0%,
    ${cx('red.5')} 50%,
    ${cx('orange.4')} 100%
  );
  padding: 4rem 0 !important;
  margin-top: -4rem;
  ${tilt(90)}
  ${mx[2]} {
    padding-top: 5rem 0 !important;
    ${tilt(85)}
  }
  > div {
    margin-bottom: 1rem;
  }
`

const Large = Heading.extend.attrs({
  is: 'h2',
  f: [5, 6],
  mt: 0,
  mb: 2,
  color: 'white'
})`line-height: 1.25;`
const Description = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 1,
  color: 'white'
})`
  font-weight: normal;
  line-height: 1.5;
  opacity: .9;
`

const Left = Column.extend`
  a {
    font-size: 1.5rem;
  }
  ${mx[2]} {
    text-align: right;
  }
`
const Right = Column.extend`
  text-align: left;
`

const Start = props => (
  <Background {...props}>
    <Left>
      <Large>Start your Hack Club.</Large>
      <Description>Build the class you wish you had.</Description>
      <Description>Bring the movement to your school.</Description>
    </Left>
    <Right>
      <CTA bg="white" color="primary" href="/start" children="Get started →" />
    </Right>
    <style children="footer{margin-top:-5rem;padding-top:8rem !important}" />
  </Background>
)

export default Start
