import range from 'lodash/utility/range'
import shuffle from 'lodash/collection/shuffle'

import AnimationCacher from './animationCacher'

class RandomAnimationCacher extends AnimationCacher {
  
  getNextAnimation() {

    const removeIndex = (index) => {
      this._downloaders.splice(index, 1)
    }

    const removeFailed = () => {
      this._downloaders = this._downloaders.filter(download => !download.hasFailed())
    }

    const getRandomCompletedAnimation = () => {
      return shuffle(range(this._downloaders.length))
        .find(index => this._downloaders[index].hasAnimation())
    }

    let animation = null

    removeFailed()

    const animationIndex = getRandomCompletedAnimation()
    if (animationIndex !== undefined) {
      animation = this._downloaders[animationIndex].getAnimation()
      removeIndex(animationIndex)
    }

    this._fillCache()

    return animation
  }

}

export default RandomAnimationCacher