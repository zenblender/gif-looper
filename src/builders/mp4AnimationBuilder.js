import { MP4Box } from 'mp4box'

import AnimationBuilder from './animationBuilder'
import Animation from '../animation'

const MIME_TYPE = 'video/mp4'

class Mp4AnimationBuilder extends AnimationBuilder {

  constructor() {
    super(MIME_TYPE)
  }

  _getDuration(arrayBuffer) {
    return new Promise((resolve) => {
      const mp4box = new MP4Box()
      mp4box.onReady = (info) => {
        resolve(info.duration)
      }
      arrayBuffer.fileStart = 0
      mp4box.appendBuffer(arrayBuffer)
      mp4box.flush()
    })
  }

  build(url, arrayBuffer) {

    const objectUrl = this._getObjectUrl(arrayBuffer)

    const videoElement = document.createElement('video')
    videoElement.setAttribute('preload', 'auto')
    videoElement.setAttribute('autoplay', true)
    videoElement.setAttribute('loop', true)
    videoElement.setAttribute('muted', true)

    const sourceElement = document.createElement('source')
    sourceElement.setAttribute('src', objectUrl)
    sourceElement.setAttribute('type', MIME_TYPE)

    videoElement.appendChild(sourceElement)

    this._setElementStyle(videoElement)

    return new Promise((resolve) => {
      this._getDuration(arrayBuffer).then((duration) => {
        const animation = new Animation(url, objectUrl, videoElement, duration)
        resolve(animation)
      })
    })

    /*
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

export default Mp4AnimationBuilder
