require('./polyfill')

import config from './config'

import GifSource from './gifSource'

class GifLooper {

  constructor(container) {
    this._container       = container
    this._source          = GifSource.getDefault()
    this._gifImage        = null
    this._currentStartMs  = null
  }

  start() {
    this._source.startDownloading()
    this._waitForFirstDownload()
  }

  _waitForFirstDownload() {
    setTimeout(() => {
      const gifImage = this._source.getNextGifImage()
      if (gifImage) {
        this._displayGifImage(gifImage)
      } else {
        this._waitForFirstDownload()
      }
    }, 500)
  }

  _displayGifImage(gifImage) {
    this._gifImage = gifImage

    this._container.innerHTML = ''
    this._container.appendChild(this._gifImage.image)

    this._currentStartMs = Date.now()
    this._wait()
  }

  _maybeDisplayNext() {
    const gifImage = this._source.getNextGifImage()
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
