import sample from 'lodash/collection/sample'

import GifLibrary from './gifLibrary'

const TAGS = [
  'funny',
  'weird',
  'fail',
  'crazy',
  'dancing',
  'winning',
  'surreal'
]

class GifRandomLibrary extends GifLibrary {

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

}

export default GifRandomLibrary