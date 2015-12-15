import gify from './gify'

import GifImage from './gifImage'

const URL_CREATOR = window.URL || window.webkitURL

class GifDownloader {

  constructor(urlOrArrayOrPromise) {
    this._index = 0
    this._gifImage = null
    this._hasFailed = false

    if (urlOrArrayOrPromise.then) {

      // promise provided
      urlOrArrayOrPromise
      .then(urlOrArray => {
        this._urls = Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray]
        this._fetchNext()
      })
      .catch(this._handleError.bind(this))

    } else {

      const urlOrArray = urlOrArrayOrPromise
      this._urls = Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray]
      this._fetchNext()

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
    const promise = new Promise((resolve) => {
      const duration = this._getDuration(arrayBuffer)
      const blob = new Blob([arrayBuffer], {type: "image/gif"})
      const url = URL_CREATOR.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        resolve(new GifImage(img, duration))
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
      console.log('no more URLs to try')
      this._hasFailed = true
    }
  }

  _finish(gifImage) {
    this._gifImage = gifImage
  }

  getGifImage() {
    return this._gifImage
  }

  hasFailed() {
    return this._hasFailed
  }

}

export default GifDownloader
