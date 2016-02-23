import AnimationBuilder from './animationBuilder'
import Animation from '../animation'
import AnimationMetaData from '../animationMetaData'

class VideoAnimationBuilder extends AnimationBuilder {

  build(url, arrayBuffer) {

    const objectUrl = this._getObjectUrl(arrayBuffer)

    const videoElement = document.createElement('video')
    videoElement.setAttribute('preload', 'auto')
    videoElement.setAttribute('autoplay', false)
    videoElement.setAttribute('loop', true)
    videoElement.setAttribute('muted', true)

    const sourceElement = document.createElement('source')
    sourceElement.setAttribute('src', objectUrl)
    sourceElement.setAttribute('type', this._mimeType)

    videoElement.appendChild(sourceElement)

    this._setElementStyle(videoElement)

    return new Promise((resolve) => {

      videoElement.addEventListener('canplaythrough', () => {
        const metaData = new AnimationMetaData(
          videoElement.duration * 1000,
          videoElement.videoWidth,
          videoElement.videoHeight
        )
        const animation = new Animation(url, objectUrl, videoElement, metaData)
        resolve(animation)
      })

    })

  }  

}

export default VideoAnimationBuilder
