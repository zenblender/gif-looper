import config from './config'

import GifDownloader from './gifDownloader'

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
      const download = new GifDownloader(this.library, this.library.getNextSet())
      this._downloads.push(download)
    }
  }

  getNextGifImage() {
    // override me
  }
  
}

export default GifCacher
