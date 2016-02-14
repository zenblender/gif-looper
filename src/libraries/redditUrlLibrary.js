import config from '../config'

import sampleFromList from '../utils/sampleFromList'

import UrlHistory from '../urlHistory'
import UrlLibrary from './urlLibrary'

class RedditUrlLibrary extends UrlLibrary {

  constructor() {
    super()
    this._history = new UrlHistory()
  }

  _getSubreddit() {
    return sampleFromList(config.sources.reddit.subreddits)
  }

  _getApiUrl() {
    return `http://api.reddit.com/r/${ this._getSubreddit() }/top.json?limit=${ config.sources.reddit.limit }&t=${ config.sources.reddit.time }`
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
          resolve(json.data.children[Math.floor(Math.random() * config.sources.reddit.limit)].data.url.replace("http://imgur.com","http://i.imgur.com").replace("gifv", "gif"))
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

export default RedditUrlLibrary
