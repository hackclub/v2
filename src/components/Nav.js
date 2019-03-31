import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Box, Container, Flex, Icon, cx, theme } from '@hackclub/design-system'
import Flag from 'components/Flag'
import { Link } from 'gatsby'
import ScrollLock from 'react-scrolllock'

const rgbaBgColor = (props, opacity) =>
  `rgba(
    ${props.bgColor[0]},
    ${props.bgColor[1]},
    ${props.bgColor[2]},
    ${opacity}
  )`

const Root = styled(Box.withComponent('header'))`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
  ${props =>
    (props.scrolled || props.toggled || props.fixed) &&
    css`
      position: fixed;
      background-color: ${rgbaBgColor(props, 0.96875)};
      border-bottom: 1px solid rgba(48, 48, 48, 0.125);
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        background-color: ${props.transparent
          ? 'transparent'
          : rgbaBgColor(props, 0.75)};
        ${props.dark
          ? css`
              -webkit-backdrop-filter: saturate(90%) blur(20px);
            `
          : css`
              -webkit-backdrop-filter: saturate(180%) blur(20px);
            `};
      }
      ${theme.mediaQueries.reduceTransparency} {
        -webkit-backdrop-filter: auto !important;
      }
    `} @media print {
    display: none;
  }
`

const Content = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-left: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    padding: 0 ${theme.space[4]}px;
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

const NavBar = styled(Box.withComponent('nav'))`
  display: none;
  a {
    color: ${props => cx(props.color)};
    margin-left: ${theme.space[2]}px;
    padding: ${theme.space[2]}px;
    text-decoration: none;
  }
  ${props =>
    props.isMobile
      ? css`
          display: ${props.toggled ? 'flex' : 'none'};
          flex-direction: column;
          overflow-y: auto;
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
            &:not(:last-child) {
              border-bottom: 1px solid rgba(48, 48, 48, 0.125);
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
            font-size: ${theme.fontSizes[1]}px;
            text-transform: uppercase;
            &:hover {
              color: ${theme.cx(hoverColor(props.color))};
            }
          }
        `};
`

const Navigation = props => (
  <NavBar role="navigation" {...props}>
    <Link to="/start/" children="Clubs" />
    <Link to="/workshops/" children="Workshops" />
    <a
      href="https://hackathons.hackclub.com/"
      children="Hackathons"
      target="_blank"
      rel="noopener noreferrer"
    />
    <Link to="/bank/" children="Bank" />
    <Link to="/donate/" children="Donate" />
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
  ${theme.mediaQueries.md} {
    display: none;
  }
`

class Header extends Component {
  state = {
    scrolled: false,
    toggled: false
  }

  static defaultProps = {
    dark: false,
    color: 'white'
  }

  static propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.arrayOf(PropTypes.number),
    dark: PropTypes.bool,
    transparent: PropTypes.bool,
    fixed: PropTypes.bool
  }

  componentDidMount() {
    this.bindScroll(true)
    if (typeof window !== 'undefined') {
      const mobileQuery = window.matchMedia('(max-width: 48em)')
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
    const { color, dark, fixed, bgColor, ...props } = this.props
    const { scrolled, toggled } = this.state
    const baseColor = dark
      ? color || 'white'
      : color === 'white' && scrolled
      ? 'black'
      : color
    const toggleColor = dark
      ? color || 'snow'
      : toggled || (color === 'white' && scrolled)
      ? 'slate'
      : color

    return (
      <Root
        {...props}
        fixed={fixed}
        scrolled={scrolled}
        toggled={toggled}
        dark={dark}
        bgColor={bgColor || (dark ? [32, 34, 36] : [255, 255, 255])}
      >
        <Content>
          <Flag scrolled={scrolled || fixed} />
          <Navigation color={baseColor} dark={dark} />
          <ToggleContainer color={toggleColor} onClick={this.handleToggleMenu}>
            <Toggle glyph={toggled ? 'view-close' : 'menu'} toggled={toggled} />
          </ToggleContainer>
        </Content>
        <Navigation isMobile toggled={toggled} color={baseColor} dark={dark} />
        {toggled && <ScrollLock />}
      </Root>
    )
  }
}

export default Header
