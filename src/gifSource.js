import config from './config'

import TaggedUrlLibrary from './libraries/taggedUrlLibrary'
import RedditUrlLibrary from './libraries/redditUrlLibrary'
import PresetUrlLibrary from './libraries/presetUrlLibrary'

import RandomAnimationCacher from './cachers/randomAnimationCacher'
import SequentialAnimationCacher from './cachers/sequentialAnimationCacher'

const TYPES = {
  'tagged': () => new GifSource(new TaggedUrlLibrary(), new RandomAnimationCacher()),
  'reddit': () => new GifSource(new RedditUrlLibrary(), new RandomAnimationCacher()),
  'preset': () => new GifSource(new PresetUrlLibrary(), new SequentialAnimationCacher())
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
