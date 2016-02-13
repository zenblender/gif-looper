require('./polyfill')

import config from './config'

class GifLooper {

  constructor(container, source) {
    this._container       = container
    this._source          = source
    this._gifImage        = null
    this._currentStartMs  = null
  }

  start() {
    this._source.startDownloading()
    this._waitForFirstDownload()
  }

  _waitForFirstDownload() {
    setTimeout(() => {
      const gifImage = this._source.getGifImageToDisplay()
      if (gifImage) {
        this._displayGifImage(gifImage)
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

  _displayGifImage(gifImage) {
    this._gifImage = gifImage

    this._clearContainer()
    this._container.appendChild(this._gifImage.element)

    this._gifImage.revokeObjectUrl()

    this._currentStartMs = Date.now()
    this._wait()
  }

  _maybeDisplayNext() {
    const gifImage = this._source.getGifImageToDisplay()
    if (gifImage) {
      this._displayGifImage(gifImage)
    } else {
      this._wait()
    }
  }

  _wait() {
    const now = Date.now()

    const gifMinDurationMs =
      Math.ceil(config.minDurationMs / this._gifImage.duration) * this._gifImage.duration

    let nextEligibleStopTimeMs = this._currentStartMs + gifMinDurationMs
    while (nextEligibleStopTimeMs < now) {
      nextEligibleStopTimeMs += this._gifImage.duration
    }

    const newDelayMs = nextEligibleStopTimeMs - now

    setTimeout(() => {
      this._maybeDisplayNext()
    }, newDelayMs)
  }

}

export default GifLooper
