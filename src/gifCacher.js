import GifDownloader from './gifDownloader'
import GifLibrary from './gifLibrary'

const NUM_CACHED = 5

class GifCacher {

  constructor(urls) {
    this._library = new GifLibrary(urls)
    this._downloads = []
    this._fillCache()
  }

  _fillCache() {
    while (this._downloads.length < NUM_CACHED) {
      const download = new GifDownloader(this._library.getNextSet())
      this._downloads.push(download)
    }
  }

  getNextGifImage() {

    const removeFirst = () => {
      this._downloads.splice(0, 1)
    }

    let gifImage = null

    if (this._downloads.length) {
      const firstDownload = this._downloads[0]
      if (firstDownload.hasFailed()) {
        removeFirst()
        return this.getNextGifImage()
      } else {
        gifImage = firstDownload.getGifImage()
        if (gifImage) {
          removeFirst()
        }
      }
    }

    this._fillCache()

    return gifImage
  }
  
}

export default GifCacher
