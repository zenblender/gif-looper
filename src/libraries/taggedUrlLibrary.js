import config from '../config'

import UrlLibrary from './urlLibrary'

import LimitedUrlValidator from '../validators/limitedUrlValidator'

import getQueryString from '../utils/getQueryString'
import sampleFromList from '../utils/sampleFromList'

const PUBLIC_API_KEY = 'dc6zaTOxFJmzC'

const FILE_FORMAT_KEYS = {
  gif: 'image_url',
  mp4: 'image_mp4_url'
}

const DEFAULT_FILE_FORMAT = 'gif'

class TaggedUrlLibrary extends UrlLibrary {

  constructor() {
    super(new LimitedUrlValidator())
    this._tags = getQueryString('tag') || config.sources.tagged.tags
  }

  _getTag() {
    return sampleFromList(this._tags)
  }

  _getApiUrl() {
    return `http://api.giphy.com/v1/gifs/random?tag=${ this._getTag() }&api_key=${ PUBLIC_API_KEY }`
  }

  getNextUrl() {

    const _getPreferredUrl = (json) => {
      const preferredFormat = config.preferredFormat
      if (preferredFormat && json.data[FILE_FORMAT_KEYS[preferredFormat]]) {
        return json.data[FILE_FORMAT_KEYS[preferredFormat]]
      }

      if (json.data[FILE_FORMAT_KEYS[DEFAULT_FILE_FORMAT]]) {
        return json.data[FILE_FORMAT_KEYS[DEFAULT_FILE_FORMAT]]
      }
    }

    const _handleStatus = (response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response)
      } else {
        return Promise.reject('api request error')
      }
    }

    const _requestData = (response) => {
      return new Promise((resolve, reject) => {
        response.json().then((json) => {
          const preferredUrl = _getPreferredUrl(json)
          if (preferredUrl) {
            resolve(preferredUrl)
          } else {
            reject()
          }
        })
      })
    }

    return fetch(this._getApiUrl())
    .then(_handleStatus)
    .then(_requestData)
  }

}

export default TaggedUrlLibrary
