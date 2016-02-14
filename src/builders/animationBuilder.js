import config from '../config'
import urlCreator from '../utils/urlCreator'

class AnimationBuilder {

  constructor(mimeType) {
    this._mimeType = mimeType
  }

  _getObjectUrl(arrayBuffer) {
    const blob = new Blob([arrayBuffer], { type: this._mimeType })
    return urlCreator.createObjectURL(blob)
  }

  _setElementStyle(element) {
    element.style.width   = `${ 100 / config.cols }vw`
    element.style.height  = `${ 100 / config.rows }vh`

    if (config.style) {
      for (let styleName of Object.keys(config.style)) {
        element.style[styleName] = config.style[styleName]
      }
    }
  }

}

export default AnimationBuilder
