import urlCreator from './utils/urlCreator'

class Animation {

  constructor(absoluteUrl, objectUrl, element, metaData) {
    this.absoluteUrl = absoluteUrl
    this._objectUrl  = objectUrl
    this.element     = element
    this.metaData    = metaData
  }

  revokeObjectUrl() {
    urlCreator.revokeObjectURL(this._objectUrl)
    this._objectUrl = null
  }
  
}

export default Animation
