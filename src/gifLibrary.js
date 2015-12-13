import flatten from 'lodash/array/flatten'
import shuffle from 'lodash/collection/shuffle'

const PREFER_LOCAL_FILES  = false
const LOCAL_URL_PREFIX    = 'gifs/'

class GifLibrary {

  constructor(urls) {
    this._gifIndex = -1
    this._gifs = GifLibrary._build(urls)
  }

  static _build(urls) {

    const isRemote = function(url) {
      return url.match(/^http/i)
    }

    const isLocal = function(url) {
      return !isRemote(url)
    }

    return shuffle(
      urls
      .map(urlOrArray => {
        return flatten(Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray], true)
      })
      .map(urlAlternates => {
        const localUrls   = urlAlternates.filter(isLocal).map(url => `${ LOCAL_URL_PREFIX }${ url }`)
        const remoteUrls  = urlAlternates.filter(isRemote)
        return PREFER_LOCAL_FILES ? localUrls.concat(remoteUrls) : remoteUrls.concat(localUrls)
      })
    )
  }

  getNextSet() {
    if (this._gifs.length) {
      this._gifIndex = (this._gifIndex + 1) % this._gifs.length
      return this._gifs[this._gifIndex]
    }
  }

}

export default GifLibrary
