require('./polyfills')

import AnimationView from './animationView'
import AnimationSource from './animationSource'

class AnimationGrid {
  
  constructor(selector) {
    this._selector    = selector
    this._views       = []
    this._source      = AnimationSource.getDefault()
  }

  start() {
    this._views = Array.prototype.map.call(document.querySelectorAll(this._selector), (container) => {
      const view = new AnimationView(container, this._source)
      view.start()
      return view
    })
  }

}

export default AnimationGrid
