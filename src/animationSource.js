import config from './config'

import PresetUrlLibrary from './libraries/presetUrlLibrary'
import RandomUrlLibrary from './libraries/randomUrlLibrary'
import RedditUrlLibrary from './libraries/redditUrlLibrary'
import TaggedUrlLibrary from './libraries/taggedUrlLibrary'

import RandomAnimationCacher from './cachers/randomAnimationCacher'
import SequentialAnimationCacher from './cachers/sequentialAnimationCacher'

const TYPES = {
  'preset': () => new AnimationSource(new PresetUrlLibrary(), new SequentialAnimationCacher()),
  'random': () => new AnimationSource(new RandomUrlLibrary(), new RandomAnimationCacher()),
  'reddit': () => new AnimationSource(new RedditUrlLibrary(), new RandomAnimationCacher()),
  'tagged': () => new AnimationSource(new TaggedUrlLibrary(), new RandomAnimationCacher())
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
