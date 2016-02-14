import config from './config'

import TaggedUrlLibrary from './libraries/taggedUrlLibrary'
import RedditUrlLibrary from './libraries/redditUrlLibrary'
import PresetUrlLibrary from './libraries/presetUrlLibrary'
import GifRandomCacher from './gifRandomCacher'
import GifSequentialCacher from './gifSequentialCacher'

const TYPES = {
  'tagged': () => new GifSource(new TaggedUrlLibrary(), new GifRandomCacher()),
  'reddit': () => new GifSource(new RedditUrlLibrary(), new GifRandomCacher()),
  'preset': () => new GifSource(new PresetUrlLibrary(), new GifSequentialCacher())
}

class GifSource {

  static getDefault() {
    return GifSource.getNew(config.sourceType)
  }

  static getNew(type) {
    return TYPES[type]()
  }

  constructor(library, cacher) {
    this._cacher = cacher
    this._cacher.setLibrary(library)
  }

  startDownloading() {
    this._cacher.start()
  }

  getAnimationToDisplay() {
    const animation = this._cacher.getNextAnimation()
    if (animation && this._cacher.library.canDisplay(animation.absoluteUrlList)) {
      return animation
    }
  }
  
}

export default GifSource
