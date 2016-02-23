import config from './config'

class AnimationView {

  constructor(container, source) {
    this._container       = container
    this._source          = source
    this._animation       = null
    this._currentStartMs  = null
  }

  start() {
    this._source.startDownloading()
    this._waitForFirstDownload()
  }

  _waitForFirstDownload() {
    setTimeout(() => {
      const animation = this._source.getAnimationToDisplay()
      if (animation) {
        this._displayAnimation(animation)
      } else {
        this._waitForFirstDownload()
      }
    }, 500)
  }

  _clearContainer() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild)
    }
  }

  _displayAnimation(animation) {
    this._animation = animation

    this._clearContainer()
    this._container.appendChild(this._animation.element)

    const videoElement = this._container.querySelector('video')
    if (videoElement) {
      videoElement.currentTime = 0
      videoElement.play()
    }

    this._animation.revokeObjectUrl()

    this._currentStartMs = Date.now()
    this._wait()
  }

  _maybeDisplayNext() {
    const animation = this._source.getAnimationToDisplay()
    if (animation) {
      window.requestAnimationFrame(this._displayAnimation.bind(this, animation))
    } else {
      this._wait()
    }
  }

  _wait() {
    const now = Date.now()

    const minDurationMs =
      Math.ceil(config.minDisplayDurationMs / this._animation.metaData.durationMs) * this._animation.metaData.durationMs

    let nextEligibleStopTimeMs = this._currentStartMs + minDurationMs
    while (nextEligibleStopTimeMs < now) {
      nextEligibleStopTimeMs += this._animation.metaData.durationMs
    }

    const newDelayMs = nextEligibleStopTimeMs - now

    setTimeout(() => {
      this._maybeDisplayNext()
    }, newDelayMs)
  }

}

export default AnimationView
