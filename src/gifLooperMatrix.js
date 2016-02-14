require('./polyfills')

import GifLooper from './gifLooper'
import GifSource from './gifSource'

class GifLooperMatrix {
  
  constructor(selector) {
    this._selector    = selector
    this._loopers     = []
    this._source      = GifSource.getDefault()
  }

  start() {
    this._loopers = Array.prototype.map.call(document.querySelectorAll(this._selector), (container) => {
      const looper = new GifLooper(container, this._source)
      looper.start()
      return looper
    })
  }

}

export default GifLooperMatrix
