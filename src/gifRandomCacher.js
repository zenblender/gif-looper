import range from 'lodash/utility/range'
import shuffle from 'lodash/collection/shuffle'

import GifCacher from './gifCacher'

class GifRandomCacher extends GifCacher {
  
  getNextGifImage() {

    const removeIndex = (index) => {
      this._downloads.splice(index, 1)
    }

    const removeFailed = () => {
      this._downloads = this._downloads.filter(download => !download.hasFailed())
    }

    const getRandomCompletedGifIndex = () => {
      return shuffle(range(this._downloads.length))
        .find(index => this._downloads[index].hasGifImage())
    }

    let gifImage = null

    removeFailed()

    const gifImageIndex = getRandomCompletedGifIndex()
    if (gifImageIndex !== undefined) {
      gifImage = this._downloads[gifImageIndex].getGifImage()
      removeIndex(gifImageIndex)
    }

    this._fillCache()

    return gifImage
  }

}

export default GifRandomCacher