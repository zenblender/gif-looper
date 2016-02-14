import urlCreator from './utils/urlCreator'

class Animation {

  constructor(absoluteUrlList, absoluteUrl, objectUrl, element, duration) {
    this.absoluteUrlList  = absoluteUrlList
    this.absoluteUrl      = absoluteUrl
    this._objectUrl       = objectUrl
    this.element          = element
    this.duration         = duration
  }

  revokeObjectUrl() {
    urlCreator.revokeObjectURL(this._objectUrl)
    this._objectUrl = null
  }
  
}

export default Animation
