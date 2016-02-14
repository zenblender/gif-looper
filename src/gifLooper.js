import config from './config'

class GifLooper {

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

    this._animation.revokeObjectUrl()

    this._currentStartMs = Date.now()
    this._wait()
  }

  _maybeDisplayNext() {
    const animation = this._source.getAnimationToDisplay()
    if (animation) {
      this._displayAnimation(animation)
    } else {
      this._wait()
    }
  }

  _wait() {
    const now = Date.now()

    const gifMinDurationMs =
      Math.ceil(config.minDurationMs / this._animation.duration) * this._animation.duration

    let nextEligibleStopTimeMs = this._currentStartMs + gifMinDurationMs
    while (nextEligibleStopTimeMs < now) {
      nextEligibleStopTimeMs += this._animation.duration
    }

    const newDelayMs = nextEligibleStopTimeMs - now

    setTimeout(() => {
      this._maybeDisplayNext()
    }, newDelayMs)
  }

}

export default GifLooper
