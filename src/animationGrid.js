require('./polyfills')

import AnimationView from './animationView'
import AnimationSource from './animationSource'

class AnimationGrid {
  
  constructor(selector) {
    this._selector    = selector
    this._views       = []
    this._source      = null
  }

  start() {
    const viewElements = Array.from(document.querySelectorAll(this._selector))
    this._source = AnimationSource.getDefault(viewElements.length)
    this._views = viewElements.map((container, index) => {
      const view = new AnimationView(container, this._source, index)
      view.start()
      return view
    })
  }

}

export default AnimationGrid
