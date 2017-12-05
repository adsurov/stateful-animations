import React, { Component } from 'react'

import { Slide } from 'presa'
import { Code } from 'presa/blocks'

import FigureCaption from 'blocks/figure-caption'

// Shows how to use rAF in your code.
export class RafScheduleSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`// Or use a polyfill:
// import requestAnimationFrame from 'raf'
const { requestAnimationFrame } = window

const animate = () => {
  // Perform an animation step
  x += velocity

  requestAnimationFrame(animate)
}

// Fire it up 🔥
requestAnimationFrame(animate)`}</Code>
        <FigureCaption>
          requestAnimationFrame — незаменимый инструмент для анимаций в
          браузере.
        </FigureCaption>
      </Slide>
    )
  }
}

export class RafTimestampSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code fontSize={25}>{`requestAnimationFrame(timestamp => {
  // DOMHighResTimeStamp
  // timestamp ~> 30485.84100000153
})`}</Code>
        <FigureCaption>
          rAF передает в коллбек временную метку с точностью в <i>5 µs</i>{' '}
          (микросекунд).
        </FigureCaption>
      </Slide>
    )
  }
}

export class RafDeltaSlide extends Component {
  render() {
    return (
      <Slide centered {...this.props}>
        <Code>{`const animate = timestamp => {
  const delta = timestamp - prevTimestamp

  // Note, it's a function now!
  x += velocity(delta)

  requestAnimationFrame(animate)
}`}</Code>
        <FigureCaption>
          Важно считать разницу во времени между вызовами и анимировать значение{' '}
          <b>пропорционально</b> дельте!
        </FigureCaption>
      </Slide>
    )
  }
}
