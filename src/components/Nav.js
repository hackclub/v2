import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Box, Flex, Link as A, Container, Icon } from '@hackclub/design-system'
import Flag from 'components/Flag'
import Link from 'gatsby-link'
import ScrollLock from 'react-scrolllock'

const Root = Box.withComponent('header').extend`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;

  ${props =>
    (props.scrolled || props.toggled || props.fixed) &&
    css`
      position: fixed;
      background-color: rgba(
        ${props.bgColor[0]},
        ${props.bgColor[1]},
        ${props.bgColor[2]},
        0.96875
      );
      border-bottom: 1px solid rgba(51, 51, 51, 0.1);
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        background-color: rgba(
          ${props.bgColor[0]},
          ${props.bgColor[1]},
          ${props.bgColor[2]},
          0.75
        );
        -webkit-backdrop-filter: saturate(180%) blur(16px);
      }
      ${({ theme }) => theme.mediaQueries.reduceTransparency} {
        -webkit-backdrop-filter: auto !important;
      }
    `}
`

const Content = Container.extend`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-left: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 ${({ theme }) => theme.space[4]}px;
  }
`

const hoverColor = name =>
  ({
    white: 'smoke',
    smoke: 'muted',
    muted: 'slate',
    slate: 'black',
    black: 'slate',
    primary: 'error'
  }[name] || 'black')

const NavBar = Box.withComponent('nav').extend`
  display: none;
  a {
    color: ${props => props.theme.cx(props.color)};
    margin-left: ${({ theme }) => theme.space[2]}px;
    padding: ${({ theme }) => theme.space[2]}px;
    text-decoration: none;
  }
  ${props =>
    props.isMobile
      ? css`
          display: ${props => (props.toggled ? 'flex' : 'none')};
          flex-direction: column;
          overflow-y: scroll;
          text-align: left;
          height: 100vh;
          a {
            padding: 0;
            margin: 0 auto;
            height: 64px;
            line-height: 64px;
            font-weight: bold;
            width: 100%;
            max-width: 18rem;
            color: ${({ theme }) => theme.colors.black};
            &:not(:last-child) {
              border-bottom: 1px solid rgba(51, 51, 51, 0.1);
            }
            @media screen and (max-width: 22em) {
              max-width: 16rem;
            }
          }
        `
      : css`
          @media (min-width: 56em) {
            display: flex;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          a {
            font-size: ${({ theme }) => theme.fontSizes[1]}px;
            text-transform: uppercase;
            &:hover {
              color: ${({ theme }) => theme.cx(hoverColor(props.color))};
            }
          }
        `};
`

const Navigation = props => (
  <NavBar role="navigation" {...props}>
    <Link to="/team" children="Team" />
    <Link to="/donate" children="Donate" />
    <Link to="/challenge" children="Challenge" />
    <Link to="/workshops" children="Workshops" />
    <a href="https://hackathons.hackclub.com" children="Hackathons" />
    <Link to="/bank" children="Bank" />
    <Link to="/start" children="Get&nbsp;Started&nbsp;»" />
  </NavBar>
)

const ToggleContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
`

const Toggle = styled(Icon)`
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

class Header extends Component {
  state = {
    scrolled: false,
    toggled: false
  }

  componentDidMount() {
    this.bindScroll(true)
    if (typeof window !== 'undefined') {
      const mobileQuery = window.matchMedia('(max-width: 56em)')
      mobileQuery.addListener(() => {
        this.setState({ toggled: false })
      })
    }
  }

  componentWillUnmount = () => {
    this.bindScroll(false)
  }

  bindScroll = add => {
    if (typeof window !== 'undefined') {
      window[add ? 'addEventListener' : 'removeEventListener'](
        'scroll',
        this.onScroll
      )
    }
  }

  onScroll = () => {
    const newState = window.scrollY >= 16
    const { scrolled: oldState } = this.state

    if (newState !== oldState) {
      this.setState({
        scrolled: newState
      })
    }
  }

  handleToggleMenu = () => {
    this.setState(state => ({
      toggled: !state.toggled
    }))
  }

  render() {
    const {
      color = 'white',
      bgColor = [255, 255, 255],
      fixed,
      ...props
    } = this.props
    const { scrolled, toggled } = this.state
    const baseColor = color === 'white' && scrolled ? 'black' : color
    const toggleColor =
      toggled || (color === 'white' && scrolled) ? 'slate' : color

    return (
      <Root
        {...props}
        fixed={fixed}
        scrolled={scrolled}
        toggled={toggled}
        bgColor={bgColor}
      >
        <Content>
          <Flag scrolled={scrolled || fixed} />
          <Navigation color={baseColor} />
          <ToggleContainer color={toggleColor} onClick={this.handleToggleMenu}>
            <Toggle
              name={toggled ? 'close' : 'drag_handle'}
              toggled={toggled}
            />
          </ToggleContainer>
        </Content>
        <Navigation isMobile toggled={toggled} />
        {toggled && <ScrollLock />}
      </Root>
    )
  }
}
Header.propTypes = {
  color: PropTypes.string,
  fixed: PropTypes.bool
}

export default Header
