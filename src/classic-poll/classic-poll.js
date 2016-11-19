import React, { Component } from 'react'

class ClassicPoll extends Component {
  render () {
    const { poll } = this.props

    const results = poll.choices.map(choice => ({
      ...choice,
      ...poll.results[choice.id]
    }))

    return (
      <div className='classic-poll'>
        <div className='classic-poll__question'>
          {poll.title}
        </div>

        <div className='classic-poll__subheader'>
          Для отправки голоса пройдите по ссылке
          <span>инвест61.рф</span>
        </div>

        <div className='classic-poll__results'>
          {results.map(result => (
            <div className='classic-poll__result'>
              <div className='classic-poll__result-header'>
                {result.text}
              </div>

              <div className='classic-poll__line'>
                <div className='classic-poll__progress-wrap'>
                  <div className='classic-poll__progress'
                    style={{
                      backgroundColor: result.color,
                      width: `${Math.max(1, result.percent * 100)}%` }} />
                </div>

                <div className='classic-poll__percent'>
                  {`${(result.percent * 100).toFixed(0)}%`}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    )
  }
}

export default ClassicPoll
