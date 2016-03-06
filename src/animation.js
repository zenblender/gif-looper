import urlCreator from './utils/urlCreator'

class Animation {

  constructor(absoluteUrl, objectUrl, element, isVideoElement, metaData) {
    this.absoluteUrl      = absoluteUrl
    this._objectUrl       = objectUrl
    this.element          = element
    this._isVideoElement  = isVideoElement
    this.metaData         = metaData
  }

  revokeObjectUrl() {
    urlCreator.revokeObjectURL(this._objectUrl)
    this._objectUrl = null
  }

  playFromStart() {
    if (this._isVideoElement) {
      this.element.currentTime = 0
      this.element.play()
    }
  }
  
}

export default Animation
