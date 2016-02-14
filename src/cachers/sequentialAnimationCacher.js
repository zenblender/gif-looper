import AnimationCacher from './animationCacher'

class SequentialAnimationCacher extends AnimationCacher {

  getNextAnimation() {

    const removeFirst = () => {
      this._downloaders.splice(0, 1)
    }

    let animation = null

    if (this._downloaders.length) {
      const firstDownloader = this._downloaders[0]
      if (firstDownloader.hasFailed()) {
        removeFirst()
        return this.getNextAnimation()
      } else {
        animation = firstDownloader.getAnimation()
        if (animation) {
          removeFirst()
        }
      }
    }

    this._fillCache()

    return animation
  }
  
}

export default SequentialAnimationCacher
