import _ from 'lodash'

const LOCAL_URL_PREFIX = 'gifs/'

class GifLibrary {

  constructor(urls) {
    this._gifIndex = -1
    this._alternateIndex = 0
    this._gifs = GifLibrary._build(urls)
  }

  static _build(urls) {
    return _(urls)
      .map(urlOrArray => Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray])
      .map(urlAlternates => {
        return urlAlternates.map(url => {
          return url.match(/^http/i) ? url : `${ LOCAL_URL_PREFIX }${ url }`
        })
      })
      .shuffle()
      .value()
  }

  _getCurrentUrl() {
    return this._gifs[this._gifIndex][this._alternateIndex]
  }

  getNextUrl() {
    if (this._gifs.length) {
      this._alternateIndex = 0
      this._gifIndex = (this._gifIndex + 1) % this._gifs.length
      return this._getCurrentUrl()
    }
  }

  _hasMoreAlternateUrls() {
    return this._alternateIndex < this._gifs[this._gifIndex].length - 1
  }

  getNextAlternateUrl() {
    if (this._hasMoreAlternateUrls()) {
      this._alternateIndex++
      return this._getCurrentUrl()
    } else {
      return this.getNextUrl()
    }
  }

}

export default GifLibrary
