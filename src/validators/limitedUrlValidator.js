import config from '../config'

import UrlValidator from './urlValidator'

const MAX_CONSECUTIVE_FAILURES = 3

class LimitedUrlValidator extends UrlValidator {

  constructor() {
    super()
    this._historyMap = new Map()
    this._blacklistMap = new Map()
    this._consecutiveFailures = 0
  }

  _getFirstUrl() {
    return this._historyMap.keys().next().value
  }

  _removeFirstUrl() {
    this._historyMap.delete(this._getFirstUrl())
  }

  _prune() {
    while (this._historyMap.size > config.history.numRememberedUrls) {
      this._removeFirstUrl()
    }
  }

  isValidMetaData(url, metaData) {

    const blacklist = (url, reason) => {
      if (!this._blacklistMap.has(url)) {
        console.log('meta data not allowed', reason, url)
        this._blacklistMap.set(url, reason)
      }
    }

    if (metaData.width < config.minWidth || metaData.height < config.minHeight) {
      blacklist(url, `too small: ${ metaData.width } x ${ metaData.height }`)
      return false
    }

    if (metaData.durationMs > config.maxFileDurationMs) {
      blacklist(url, `too long: ${ metaData.durationMs } ms`)
      return false
    }

    return true
  }

  getValidUrl(url) {
    if (!this._blacklistMap.has(url) && !this._historyMap.has(url)) {
      this._consecutiveFailures = 0
      this._historyMap.set(url, true)
      this._prune()
      return url
    } else {
      this._consecutiveFailures++
      if (this._consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        if (this._historyMap.size) {
          const firstUrl = this._getFirstUrl()
          this._historyMap.delete(firstUrl)
          this._historyMap.set(firstUrl, true) // move to end of list
          this._consecutiveFailures = 0
          return firstUrl
        }
      }
    }
  }

}

export default LimitedUrlValidator
