import gify from './gify'

import GifImage from './gifImage'
import setImageStyle from './setImageStyle'
import urlCreator from './urlCreator'

class GifDownloader {

  constructor(library, urlOrArrayOrPromise) {
    this._library       = library

    this._index         = 0
    this._gifImage      = null
    this._hasFailed     = false
    this._resetFetching()

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
    if (this._library.canFetch(this._urls)) {
      this._fetchNext()  
    } else {
      this._fail('url used recently')
    }
  }

  _getDuration(arrayBuffer) {
    const gifInfo = gify.getInfo(arrayBuffer)
    return gifInfo.durationChrome
  }

  _getExtensionFromUrl(url) {

  }

  _createImgFromData(arrayBuffer) {
    return new Promise((resolve, reject) => {
      const duration = 5000 //this._getDuration(arrayBuffer)

      const types = {
        'gif': {
          tagName:    'img',
          mimeType:   'image/gif',
          attribute:  'src'
        },
        'mp4': {
          tagName:    'video',
          attrs: {
            preload:  'auto',
            autoplay: true,
            loop:     true,
            muted:    true
          },
          mimeType:   'video/mp4',
          attribute:  'src',
          subElementTagName: 'source'
        }
      }

      const type = types.mp4

      const blob = new Blob([arrayBuffer], { type: type.mimeType })
      const url = urlCreator.createObjectURL(blob)

      const element = document.createElement(type.tagName)

      const subElement = type.subElementTagName ? document.createElement(type.subElementTagName) : null

      /*
      const loadingElement = subElement || element

      loadingElement.addEventListener('load', () => {
        console.log('LOAD DONE')
        URL_CREATOR.revokeObjectURL(url)
        resolve(new GifImage(this._fetchingUrls, element, duration, type))
      })
      loadingElement.addEventListener('error', () => {
        console.log('LOAD ERROR')
        URL_CREATOR.revokeObjectURL(url)
        reject('object url could not be loaded')
      })
      */

      setImageStyle(element)

      if (subElement) {
        subElement.setAttribute(type.attribute, url)
        subElement.setAttribute('type', type.mimeType)
        element.appendChild(subElement)
      } else {
        element.setAttribute(type.attribute, url)
      }

      if (type.attrs) {
        Object.keys(type.attrs).forEach((key) => {
          element.setAttribute(key, type.attrs[key])
        })
      }

      resolve(new GifImage(this._fetchingUrls, this._fetchingUrl, url, element, duration, type))
      
    })
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

  _fetchNext() {
    const url = this._urls[this._index]
    this._fetchingUrls = this._urls
    this._fetchingUrl = url

    fetch(url)
    .then(this._handleStatus)
    .then(this._requestData)
    .then(this._createImgFromData.bind(this))
    .then(this._finish.bind(this))
    .catch(this._handleError.bind(this))
  }

  _handleError(e) {
    this._resetFetching()
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
    this._gifImage      = gifImage
    this._resetFetching()
  }

  _resetFetching() {
    this._fetchingUrls = []
    this._fetchingUrl = null
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
