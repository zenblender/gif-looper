import gify from './gify'

import GifLibrary from './gifLibrary'

const MIN_DURATION_MS = 1500

const URL_CREATOR = window.URL || window.webkitURL

class GifLooper {

  constructor(container, urls) {
    this._container   = container
    this._library     = new GifLibrary(urls)
  }

  _getDelay(arrayBuffer) {
    const gifInfo = gify.getInfo(arrayBuffer)
    const duration = gifInfo.durationChrome
    // loop completely as many times as needed to get over the minimum duration
    return Math.ceil(MIN_DURATION_MS / duration) * duration
  }

  _renderImgFromData(arrayBuffer) {
    const promise = new Promise((resolve) => {
      const delay = this._getDelay(arrayBuffer)
      const blob = new Blob([arrayBuffer], {type: "image/gif"})
      const url = URL_CREATOR.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        this._container.innerHTML = ''
        this._container.appendChild(img)
        resolve(delay)
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

  _displayNext() {
    this._displayUrl(this._library.getNextUrl())
  }

  _displayNextAlternate() {
    this._displayUrl(this._library.getNextAlternateUrl())
  }

  _displayUrl(url) {
    console.log('fetch', url)
    fetch(url)
      .then(this._handleStatus)
      .then(this._requestData)
      .then(this._renderImgFromData.bind(this))
      .then(this._wait.bind(this))
      .catch(e => {
        console.log('ERROR', e, url)
        console.log('attempting to load alternate...')
        this._displayNextAlternate()  
      })
  }

  _wait(delay) {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, delay)
    }).then(() => {
      this._displayNext()
    })
  }

  start() {
    this._displayNext()
  }

}

export default GifLooper
