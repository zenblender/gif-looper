import config from './config'

import GifHistory from './gifHistory'
import GifLibrary from './gifLibrary'
import sampleFromList from './sampleFromList'

const PUBLIC_API_KEY = 'dc6zaTOxFJmzC'

class GifRandomLibrary extends GifLibrary {

  constructor() {
    super()
    this._history = new GifHistory()
  }

  _getTag() {
    return sampleFromList(config.sources.random.tags)
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

  canFetch(urls) {
    return this._history.canFetch(urls)
  }

  canDisplay(urls) {
    return this._history.canDisplay(urls)
  }

}

export default GifRandomLibrary