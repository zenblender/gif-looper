import config from './config'

import sample from 'lodash/collection/sample'

import GifHistory from './gifHistory'
import GifLibrary from './gifLibrary'

const PUBLIC_API_KEY = 'dc6zaTOxFJmzC'

class GifRandomLibrary extends GifLibrary {

  constructor() {
    super()
    this._history = new GifHistory()
  }

  _getTag() {
    let tagOrArray = sample(config.random.tags)
    while (Array.isArray(tagOrArray)) {
      tagOrArray = sample(tagOrArray)
    }
    return tagOrArray
  }

  _getApiUrl() {
    return `http://api.giphy.com/v1/gifs/random?tag=${ this._getTag() }&api_key=${ PUBLIC_API_KEY }`
  }

  getNextSet() {

    const _handleStatus = function(response) {
      if (response.statusText === 'OK') {
        return Promise.resolve(response)
      } else {
        return Promise.reject('api request error')
      }
    }

    const _requestData = function(response) {
      return new Promise((resolve) => {
        response.json().then((json) => {
          resolve(json.data.image_url)
        })
      })
    }

    return fetch(this._getApiUrl())
    .then(_handleStatus)
    .then(_requestData)
  }

  isAllowed(urls) {
    return this._history.isAllowed(urls)
  }

}

export default GifRandomLibrary