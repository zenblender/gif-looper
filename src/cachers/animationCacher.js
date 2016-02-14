import config from '../config'

import AnimationDownloader from '../animationDownloader'

class AnimationCacher {

  constructor() {
    this.library = null
    this._downloaders = []
  }

  start() {
    this._fillCache()
  }

  setLibrary(library) {
    this.library = library
  }

  _fillCache() {
    while (this._downloaders.length < config.simultaneousDownloads) {
      const downloader = new AnimationDownloader(this.library, this.library.getNextSet())
      this._downloaders.push(downloader)
    }
  }

  getNextAnimation() {
    // override me
  }
  
}

export default AnimationCacher
