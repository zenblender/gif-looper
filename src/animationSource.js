import config from './config'

import PresetUrlLibrary from './libraries/presetUrlLibrary'
import RandomUrlLibrary from './libraries/randomUrlLibrary'
import RedditUrlLibrary from './libraries/redditUrlLibrary'
import TaggedUrlLibrary from './libraries/taggedUrlLibrary'

import RandomAnimationCacher from './cachers/randomAnimationCacher'
import SequentialAnimationCacher from './cachers/sequentialAnimationCacher'

const TYPES = {
  'preset': (numViews) => new AnimationSource(new PresetUrlLibrary(), new SequentialAnimationCacher(), numViews),
  'random': (numViews) => new AnimationSource(new RandomUrlLibrary(), new RandomAnimationCacher(), numViews),
  'reddit': (numViews) => new AnimationSource(new RedditUrlLibrary(), new RandomAnimationCacher(), numViews),
  'tagged': (numViews) => new AnimationSource(new TaggedUrlLibrary(), new RandomAnimationCacher(), numViews)
}

class AnimationSource {

  static getDefault(numViews) {
    return AnimationSource.getNew(config.source, numViews)
  }

  static getNew(type, numViews) {
    return TYPES[type](numViews)
  }

  constructor(library, cacher, numViews) {
    this._cacher = cacher
    this._cacher.setLibrary(library)
    this._numViews = numViews
    this._viewIndex = 0
  }

  startDownloading() {
    this._cacher.start()
  }

  getAnimationToDisplay(fromAnimationViewIndex) {
    if (fromAnimationViewIndex === this._viewIndex) {
      const animation = this._cacher.getNextAnimation()
      if (animation) {
        this._viewIndex = (this._viewIndex + 1) % this._numViews
        return animation
      }
    }
  }
  
}

export default AnimationSource
