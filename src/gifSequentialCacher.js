import GifCacher from './gifCacher'

class GifSequentialCacher extends GifCacher {

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

export default GifSequentialCacher
