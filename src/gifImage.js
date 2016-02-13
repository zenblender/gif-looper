import urlCreator from './urlCreator'

class GifImage {

  constructor(absoluteUrlList, absoluteUrl, objectUrl, element, duration, type) {
    this.absoluteUrlList  = absoluteUrlList
    this.absoluteUrl      = absoluteUrl
    this._objectUrl       = objectUrl
    this.element          = element
    this.duration         = duration
    this.type             = type
  }

  revokeObjectUrl() {
    urlCreator.revokeObjectURL(this._objectUrl)
    this._objectUrl = null
  }
  
}

export default GifImage
