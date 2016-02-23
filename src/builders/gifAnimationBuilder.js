import gify from './gify'

import AnimationBuilder from './animationBuilder'
import Animation from '../animation'
import AnimationMetaData from '../animationMetaData'

const MIME_TYPE = 'image/gif'

class GifAnimationBuilder extends AnimationBuilder {
  
  constructor() {
    super(MIME_TYPE)
  }

  _getMetaData(arrayBuffer) {
    const gifInfo = gify.getInfo(arrayBuffer)
    return new AnimationMetaData(
      gifInfo.durationChrome,
      gifInfo.width,
      gifInfo.height
    )
  }

  build(url, arrayBuffer) {

    const objectUrl = this._getObjectUrl(arrayBuffer)

    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', objectUrl)

    this._setElementStyle(imgElement)

    return Promise.resolve(
      new Animation(url, objectUrl, imgElement, this._getMetaData(arrayBuffer))
    )

  }

}

export default GifAnimationBuilder
