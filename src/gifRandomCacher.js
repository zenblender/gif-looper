import range from 'lodash/utility/range'
import shuffle from 'lodash/collection/shuffle'

import GifCacher from './gifCacher'

class GifRandomCacher extends GifCacher {
  
  getNextAnimation() {

    const removeIndex = (index) => {
      this._downloads.splice(index, 1)
    }

    const removeFailed = () => {
      this._downloads = this._downloads.filter(download => !download.hasFailed())
    }

    const getRandomCompletedAnimation = () => {
      return shuffle(range(this._downloads.length))
        .find(index => this._downloads[index].hasAnimation())
    }

    let animation = null

    removeFailed()

    const animationIndex = getRandomCompletedAnimation()
    if (animationIndex !== undefined) {
      animation = this._downloads[animationIndex].getAnimation()
      removeIndex(animationIndex)
    }

    this._fillCache()

    return animation
  }

}

export default GifRandomCacher