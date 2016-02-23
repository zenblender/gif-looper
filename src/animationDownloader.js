import AnimationBuilderFactory from './builders/animationBuilderFactory'

class AnimationDownloader {

  constructor(library, urlOrPromise) {
    this._library       = library

    this._url           = null
    this._animation     = null
    this._hasFailed     = false
    this._isFetching    = false

    if (urlOrPromise.then) {

      // promise provided
      urlOrPromise.then(this._handleUrl.bind(this))

    } else {

      // url provided
      this._handleUrl(urlOrPromise)

    }
  }

  _handleUrl(url) {
    this._url = this._library.getValidUrl(url)
    this._fetchUrl()  
  }

  _createAnimationFromData(arrayBuffer) {
    return new Promise((resolve) => {
      const animationPromise = AnimationBuilderFactory.build(this._url, arrayBuffer)
      resolve(animationPromise)
    })
  }

  _handleStatus(response) {
    if (response.statusText === 'OK') {
      return Promise.resolve(response)
    } else {
      return Promise.reject(`HTTP Status: ${ response.statusText }`)
    }
  }

  _requestData(response) {
    return Promise.resolve(response.arrayBuffer())
  }

  _fetchUrl() {
    this._isFetching = true

    if (this._url) {
      fetch(this._url)
      .then(this._handleStatus)
      .then(this._requestData)
      .then(this._createAnimationFromData.bind(this))
      .then(this._finish.bind(this))
      .catch(this._fail.bind(this))
    } else {
      this._fail('url not available')
    }
  }

  _fail(reason) {
    if (reason) {
      console.log(`DOWNLOADER ERROR: ${ reason }`)
    }
    this._hasFailed = true
    this._isFetching = false
  }

  _finish(animation) {
    this._animation = animation
    this._isFetching = false
  }

  getAnimation() {
    return this._animation
  }

  hasAnimation() {
    return !!this._animation
  }

  hasFailed() {
    return this._hasFailed
  }

}

export default AnimationDownloader
