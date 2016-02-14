import GifCacher from './gifCacher'

class GifSequentialCacher extends GifCacher {

  getNextAnimation() {

    const removeFirst = () => {
      this._downloads.splice(0, 1)
    }

    let animation = null

    if (this._downloads.length) {
      const firstDownload = this._downloads[0]
      if (firstDownload.hasFailed()) {
        removeFirst()
        return this.getNextAnimation()
      } else {
        animation = firstDownload.getAnimation()
        if (animation) {
          removeFirst()
        }
      }
    }

    this._fillCache()

    return animation
  }
  
}

export default GifSequentialCacher
