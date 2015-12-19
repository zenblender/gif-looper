import config from './config'

import GifDownloader from './gifDownloader'

class GifCacher {

  constructor() {
    this._library = null
    this._downloads = []
  }

  start() {
    this._fillCache()
  }

  setLibrary(library) {
    this._library = library
  }

  _fillCache() {
    while (this._downloads.length < config.numConcurrentDownloads) {
      const download = new GifDownloader(this._library, this._library.getNextSet())
      this._downloads.push(download)
    }
  }

  getNextGifImage() {
    // override me
  }
  
}

export default GifCacher
