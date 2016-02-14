import gify from './gify'

import AnimationBuilder from './animationBuilder'
import Animation from '../animation'

const MIME_TYPE = 'image/gif'

class GifAnimationBuilder extends AnimationBuilder {
  
  constructor() {
    super(MIME_TYPE)
  }

  _getDuration(arrayBuffer) {
    const gifInfo = gify.getInfo(arrayBuffer)
    return gifInfo.durationChrome
  }

  build(urls, url, arrayBuffer) {

    const objectUrl = this._getObjectUrl(arrayBuffer)

    const imgElement = document.createElement('img')
    imgElement.setAttribute('src', objectUrl)

    this._setElementStyle(imgElement)

    return Promise.resolve(
      new Animation(urls, url, objectUrl, imgElement, this._getDuration(arrayBuffer))
    )
      /*
      const loadingElement = subElement || element

      loadingElement.addEventListener('load', () => {
        console.log('LOAD DONE')
        URL_CREATOR.revokeObjectURL(url)
        resolve(new Animation(this._fetchingUrls, element, duration, type))
      })
      loadingElement.addEventListener('error', () => {
        console.log('LOAD ERROR')
        URL_CREATOR.revokeObjectURL(url)
        reject('object url could not be loaded')
      })
      */
  }

}

export default GifAnimationBuilder
