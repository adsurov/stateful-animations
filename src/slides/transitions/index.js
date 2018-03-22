import React, { Component } from 'react'

import { Slide } from 'presa'
import { Code } from 'presa/blocks'

import FigureCaption from 'blocks/figure-caption'

export class ReactMotionCodeSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`
<Motion>
  {interpolated =>
    <div style={{ opacity: interpolated.x }} />}
</Motion>`}</Code>
        <FigureCaption>
          React Motion uses<br />
          <code>function-as-a-prop</code> pattern.
        </FigureCaption>
      </Slide>
    )
  }
}

export class CssTransitionCodeSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`
// CSS property
// transition: transform 1s ease;

// Conditional state change
<div className={isVisible ? 'is-visible' : 'is-hidden'} />

// Direct style manipulation
<div style={{ transform: \`translateX(\${scale})\` }} />`}</Code>
        <FigureCaption>
          CSS transitions work out of box in React.<br />
          <code>transition</code> property + state change → animation.
        </FigureCaption>
      </Slide>
    )
  }
}
