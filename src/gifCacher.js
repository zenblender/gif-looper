import GifDownloader from './gifDownloader'

const NUM_CACHED = 5

class GifCacher {

  constructor(libraryClass) {
    this._library = new libraryClass()
    this._downloads = []
    this._fillCache()
  }

  _fillCache() {
    while (this._downloads.length < NUM_CACHED) {
      const download = new GifDownloader(this._library, this._library.getNextSet())
      this._downloads.push(download)
    }
  }

  getNextGifImage() {
    // override me
  }
  
}

export default GifCacher
