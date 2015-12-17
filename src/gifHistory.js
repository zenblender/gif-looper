import config from './config'

class GifHistory {

  constructor() {
    this._urls = []
  }

  isAllowed(urlOrArray) {

    const removeFirst = () => {
      this._urls.splice(0, 1)
    }

    const urlsString = Array.isArray(urlOrArray) ? urlOrArray.join(',') : urlOrArray
    if (this._urls.some(currUrlsString => currUrlsString === urlsString)) {
      return false
    } else {
      this._urls.push(urlsString)
      while (this._urls.length > config.numRememberedUrls) {
        removeFirst()
      }
      return true
    }
  }
  
}

export default GifHistory
