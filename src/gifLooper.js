import gify from './gify'

import GifCacher from './gifCacher'

const MIN_DURATION_MS = 1500

class GifLooper {

  constructor(container, libraryClass) {
    this._container       = container
    this._cacher          = new GifCacher(libraryClass)
    this._gifImage        = null
    this._currentStartMs  = null
  }

  start() {
    this._waitForFirstDownload()
  }

  _waitForFirstDownload() {
    setTimeout(() => {
      const gifImage = this._cacher.getNextGifImage()
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
    const gifImage = this._cacher.getNextGifImage()
    if (gifImage) {
      this._displayGifImage(gifImage)
    } else {
      this._wait()
    }
  }

  _wait() {
    const now = Date.now()

    const gifMinDurationMs =
      Math.ceil(MIN_DURATION_MS / this._gifImage.duration) * this._gifImage.duration

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
