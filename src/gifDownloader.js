import gify from './gify'

import GifImage from './gifImage'

const URL_CREATOR = window.URL || window.webkitURL

class GifDownloader {

  constructor(library, urlOrArrayOrPromise) {
    this._library = library

    this._index = 0
    this._gifImage = null
    this._hasFailed = false

    if (urlOrArrayOrPromise.then) {

      // promise provided
      urlOrArrayOrPromise
      .then(this._handleUrlOrArray.bind(this))
      .catch(this._handleError.bind(this))

    } else {

      this._handleUrlOrArray(urlOrArrayOrPromise)

    }
  }

  _handleUrlOrArray(urlOrArray) {
    this._urls = Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray]
    if (this._library.isAllowed(this._urls)) {
      this._fetchNext()  
    } else {
      this._fail('url used recently')
    }
  }

  _fetchNext() {
    this._fetchUrl(this._urls[this._index])
  }

  _getDuration(arrayBuffer) {
    const gifInfo = gify.getInfo(arrayBuffer)
    return gifInfo.durationChrome
  }

  _createImgFromData(arrayBuffer) {
    const promise = new Promise((resolve, reject) => {
      const duration = this._getDuration(arrayBuffer)
      const blob = new Blob([arrayBuffer], {type: "image/gif"})
      const url = URL_CREATOR.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        URL_CREATOR.revokeObjectURL(url)
        resolve(new GifImage(img, duration))
      }
      img.onerror = () => {
        URL_CREATOR.revokeObjectURL(url)
        reject('object url could not be loaded')
      }
      img.src = url
    })
    return promise
  }

  _handleStatus(response) {
    if (response.statusText === 'OK') {
      return Promise.resolve(response)
    } else {
      return Promise.reject('image could not be grabbed')
    }
  }

  _requestData(response) {
    return Promise.resolve(response.arrayBuffer())
  }

  _fetchUrl(url) {
    fetch(url)
    .then(this._handleStatus)
    .then(this._requestData)
    .then(this._createImgFromData.bind(this))
    .then(this._finish.bind(this))
    .catch(this._handleError.bind(this))
  }

  _handleError(e) {
    console.log('ERROR:', e)
    if (this._index < this._urls.length - 1) {
      console.log('attempting to load alternate...')
      this._index++
      this._fetchNext()
    } else {
      this._fail('no more URLs to try')
    }
  }

  _fail(reason) {
    console.log(reason)
    this._hasFailed = true
  }

  _finish(gifImage) {
    this._gifImage = gifImage
  }

  getGifImage() {
    return this._gifImage
  }

  hasGifImage() {
    return !!this._gifImage
  }

  hasFailed() {
    return this._hasFailed
  }

}

export default GifDownloader
