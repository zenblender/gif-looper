import AnimationBuilderFactory from './builders/animationBuilderFactory'

class AnimationDownloader {

  constructor(library, urlOrArrayOrPromise) {
    this._library       = library

    this._index         = 0
    this._animation     = null
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

  _createAnimationFromData(arrayBuffer) {
    return new Promise((resolve, reject) => {
      const animationPromise = AnimationBuilderFactory.build(this._fetchingUrl, this._fetchingUrls, arrayBuffer)
      resolve(animationPromise)
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
    .then(this._createAnimationFromData.bind(this))
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

  _finish(animation) {
    this._animation = animation
    this._resetFetching()
  }

  _resetFetching() {
    this._fetchingUrls = []
    this._fetchingUrl = null
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
