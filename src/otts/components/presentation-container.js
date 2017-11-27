import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import RemoteControl from './remote-control'
import FullscreenMode from './fullscreen-mode'
import SlideshowMode from './slideshow-mode'

// default theme for styled components
import defaultTheme from '../theme'

const modes = {
  FULLSCREEN: 'FULLSCREEN',
  SLIDESHOW: 'SLIDESHOW'
}

// Gets the current slide index from
// the url hash e.g. /#10
const extractIndexFromLocation = () => {
  const numbers = window.location.hash.replace(/\D/g, '')
  return parseInt(numbers) || 0
}

class Presentation extends Component {
  static propTypes = {
    name: PropTypes.string,
    aspectRatio: PropTypes.number
  }

  static defaultProps = {
    name: 'An awesome presentation',
    aspectRatio: 16.0 / 9.0,
    baseWidth: 1066.0
  }

  constructor(props) {
    super(props)

    const currentIndex = Math.min(
      props.slides.length,
      extractIndexFromLocation()
    )

    this.state = {
      slides: props.slides,
      presentationName: props.name,
      presentMode: modes.SLIDESHOW,
      currentSlide: currentIndex,

      slideWidth: props.baseWidth,
      slideHeight: props.baseWidth / props.aspectRatio
    }
  }

  shiftSlide = shift => {
    const { slides, currentSlide } = this.state

    const id = currentSlide + shift
    const limited = Math.max(0, Math.min(id, slides.length - 1))

    this.switchSlide(limited)
  }

  switchSlide = id => {
    window.location.hash = id.toString()
    this.setState({ currentSlide: id })
  }

  toggleFullscreen = () => {
    this.setState(state => ({
      presentMode:
        state.presentMode === modes.FULLSCREEN
          ? modes.SLIDESHOW
          : modes.FULLSCREEN
    }))
  }

  getConnectedState() {
    const { slides, currentSlide, presentMode } = this.state

    return {
      ...this.state,

      slide: {
        ...slides[currentSlide],
        id: currentSlide,
        index: currentSlide,
        isFirst: currentSlide <= 0,
        isLast: currentSlide >= slides.length - 1
      },

      isSlideshow: presentMode === modes.SLIDESHOW,
      isFullscreen: presentMode === modes.FULLSCREEN,
      toggleFullscreen: this.toggleFullscreen,

      switchSlide: this.switchSlide,
      showNextSlide: () => this.shiftSlide(+1),
      showPrevSlide: () => this.shiftSlide(-1)
    }
  }

  render() {
    const state = this.getConnectedState()

    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalContainer>
          <RemoteControl
            onNext={state.showNextSlide}
            onPrev={state.showPrevSlide}
            onMute={() => null}
          />

          {state.isFullscreen && <FullscreenMode {...state} />}
          {state.isSlideshow && <SlideshowMode {...state} />}
        </GlobalContainer>
      </ThemeProvider>
    )
  }
}

const GlobalContainer = styled.div`
  /* Fit the whole browser window */
  width: 100vw;
  height: 100vh;

  /* Setup typography */
  font-family: ${props => props.theme.baseFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
`

export default Presentation
