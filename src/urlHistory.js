import config from './config'

const MAX_CONSECUTIVE_FAILURES = 3

class UrlHistory {

  constructor() {
    this._map = new Map()
    this._consecutiveFailures = 0
  }

  _getFirstUrl() {
    return this._map.keys().next().value
  }

  _removeFirstUrl() {
    this._map.delete(this._getFirstUrl())
  }

  _prune() {
    while (this._map.size > config.history.numRememberedUrls) {
      this._removeFirstUrl()
    }
  }

  getValidUrl(url) {
    if (!this._map.has(url)) {
      this._map.set(url, true)
      this._prune()
      this._consecutiveFailures = 0
      return url
    } else {
      this._consecutiveFailures++
      if (this._consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        if (this._map.size) {
          const firstUrl = this._getFirstUrl()
          this._map.delete(firstUrl)
          this._map.set(firstUrl, true) // move to end of list
          this._consecutiveFailures = 0
          return firstUrl
        }
      }
    }
  }

}

export default UrlHistory
