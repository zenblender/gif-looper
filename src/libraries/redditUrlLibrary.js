import config from '../config'

import sample from 'lodash/collection/sample'

import LimitedUrlValidator from '../validators/limitedUrlValidator'

import cacheBreakerUrl from '../utils/cacheBreakerUrl'
import getQueryString from '../utils/getQueryString'
import getUrlExtension from '../utils/getUrlExtension'
import sampleFromList from '../utils/sampleFromList'

import animationExtensions from '../animationExtensions'
import UrlLibrary from './urlLibrary'

class RedditUrlLibrary extends UrlLibrary {

  constructor() {
    super(new LimitedUrlValidator())
    this._subreddits = getQueryString('subreddit') || config.sources.reddit.subreddits
  }

  _getSubreddit() {
    return sampleFromList(this._subreddits)
  }

  _getApiUrl() {
    return cacheBreakerUrl(`http://api.reddit.com/r/${ this._getSubreddit() }/random`)
  }

  _getAnimationUrl(json) {
    if (json.length) {
      const urls = []
      json.forEach((item) => {
        if (item.data && Array.isArray(item.data.children)) {
          item.data.children.forEach((child) => {
            if (child.data && child.data.url) {
              const url = child.data.url
                .replace(/http:\/\/imgur\.com/i, 'http://i.imgur.com')
                .replace(/\.gifv/i, '.gif')
              if (animationExtensions.some(ext => getUrlExtension(url) === ext)) {
                urls.push(url)
              }
            }
          })
        }
      })
      if (urls.length) {
        return sample(urls)
      }
    }
  }

  getNextUrl() {

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
          const animationUrl = this._getAnimationUrl(json)
          if (animationUrl) {
            resolve(animationUrl)
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

export default RedditUrlLibrary
