import config from './config'

import TaggedUrlLibrary from './libraries/taggedUrlLibrary'
import RedditUrlLibrary from './libraries/redditUrlLibrary'
import PresetUrlLibrary from './libraries/presetUrlLibrary'

import RandomAnimationCacher from './cachers/randomAnimationCacher'
import SequentialAnimationCacher from './cachers/sequentialAnimationCacher'

const TYPES = {
  'tagged': () => new AnimationSource(new TaggedUrlLibrary(), new RandomAnimationCacher()),
  'reddit': () => new AnimationSource(new RedditUrlLibrary(), new RandomAnimationCacher()),
  'preset': () => new AnimationSource(new PresetUrlLibrary(), new SequentialAnimationCacher())
}

class AnimationSource {

  static getDefault() {
    return AnimationSource.getNew(config.source)
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
    return this._cacher.getNextAnimation()
  }
  
}

export default AnimationSource
