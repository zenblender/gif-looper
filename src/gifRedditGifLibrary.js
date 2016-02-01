import config from './config'

import sample from 'lodash/collection/sample'

import GifHistory from './gifHistory'
import GifLibrary from './gifLibrary'

class GifRedditGifLibrary extends GifLibrary {

  constructor() {
    super()
    this._history = new GifHistory()
  }

  _getSubreddit() {
    let tagOrArray = sample(config.reddit.subreddits)
    while (Array.isArray(tagOrArray)) {
      tagOrArray = sample(tagOrArray)
    }
    return tagOrArray
  }

  _getApiUrl() {
    return `http://api.reddit.com/r/${ this._getSubreddit() }/top.json?limit=${ config.reddit.limit }&t=${ config.reddit.time }`
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
          resolve(json.data.children[Math.floor(Math.random() * config.reddit.limit)].data.url.replace("http://imgur.com","http://i.imgur.com").replace("gifv", "gif"))
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

export default GifRedditGifLibrary
