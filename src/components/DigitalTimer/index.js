import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {timer: 25, isTimerStarted: false, seconds: 0}
  }

  onResetTimer = () => {
    this.setState({
      timer: 25,
      isTimerStarted: false,
      seconds: 0,
    })
    clearInterval(this.intervalId)
  }

  onIncrementTimerValue = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  onDecrementTimerValue = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState({
        timer: timer - 1,
      })
    }
  }

  increaseSeconds = () => {
    const {timer, seconds} = this.state
    const isTimerCompleted = timer * 60 === seconds
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({
        seconds: 0,
      })
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onStartOrPauseTimer = () => {
    const {isTimerStarted, timer, seconds} = this.state
    const isTimerCompleted = timer * 60 === seconds
    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (isTimerStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseSeconds, 1000)
    }
    this.setState(() => ({
      isTimerStarted: !isTimerStarted,
    }))
  }

  displayTimer = () => {
    const {timer, seconds} = this.state
    const totalRemainingSeconds = timer * 60 - seconds
    const remainingMinutes = Math.floor(totalRemainingSeconds / 60)
    const remainingSeconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes =
      remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`
    const stringifiedSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timer, seconds, isTimerStarted} = this.state
    const startStopIconsUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startStopAltText = isTimerStarted ? 'pause icon' : 'play icon'
    const timerStatus = isTimerStarted ? 'Running' : 'Paused'
    const isButtonDisabled = seconds > 0
    return (
      <div className="bg-container">
        <div className="body">
          <h1 className="timer-title">Digital Timer</h1>
          <div className="context">
            <div className="timer-image-container">
              <div className="timer-details">
                <h1 className="timer-value">{this.displayTimer()}</h1>
                <p className="timer-status">{timerStatus}</p>
              </div>
            </div>
            <div className="timer-body-container">
              <div className="timer-control-container">
                <button
                  className="timer-control-btn"
                  type="button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={startStopIconsUrl}
                    alt={startStopAltText}
                    className="timer-icons"
                  />
                  <p className="timer-control-text">
                    {isTimerStarted ? 'Pause' : 'Start'}
                  </p>
                </button>
                <button
                  className="timer-control-btn"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="timer-icons"
                  />
                  <p className="timer-control-text">Reset</p>
                </button>
              </div>
              <div className="timer-change-container">
                <p className="set-timer-text">Set Timer Limit</p>
                <div className="timer-limit-change-container">
                  <button
                    className="timer-decrement-increment-icon"
                    type="button"
                    onClick={this.onDecrementTimerValue}
                    disabled={isButtonDisabled}
                  >
                    -
                  </button>
                  <div className="time-limit-container">
                    <p className="timer-limit-value">{timer}</p>
                  </div>
                  <button
                    className="timer-decrement-increment-icon"
                    type="button"
                    onClick={this.onIncrementTimerValue}
                    disabled={isButtonDisabled}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
