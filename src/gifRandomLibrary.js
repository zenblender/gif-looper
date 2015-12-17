import sample from 'lodash/collection/sample'

import GifHistory from './gifHistory'
import GifLibrary from './gifLibrary'
import GifRandomCacher from './gifRandomCacher'

const TAGS = [
  'funny',
  'weird',
  'fail',
  'crazy',
  'dancing',
  'winning',
  'surreal',
  'infomercial'
]

class GifRandomLibrary extends GifLibrary {

  constructor() {
    super()
    this._history = new GifHistory()
  }

  static get cacherClass() {
    return GifRandomCacher
  }

  _getApiUrl() {
    return `http://api.giphy.com/v1/gifs/random?tag=${ sample(TAGS) }&api_key=dc6zaTOxFJmzC`
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