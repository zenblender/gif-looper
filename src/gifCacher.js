import config from './config'

import AnimationDownloader from './animationDownloader'

class GifCacher {

  constructor() {
    this.library = null
    this._downloads = []
  }

  start() {
    this._fillCache()
  }

  setLibrary(library) {
    this.library = library
  }

  _fillCache() {
    while (this._downloads.length < config.downloadsPerContainer) {
      const download = new AnimationDownloader(this.library, this.library.getNextSet())
      this._downloads.push(download)
    }
  }

  getNextAnimation() {
    // override me
  }
  
}

export default GifCacher
