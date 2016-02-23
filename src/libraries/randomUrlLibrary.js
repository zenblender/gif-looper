import { TextDecoder } from 'text-encoding'

import cacheBreakerUrl from '../utils/cacheBreakerUrl'
import crossOriginUrl from '../utils/crossOriginUrl'

import UrlHistory from '../urlHistory'
import UrlLibrary from './urlLibrary'

class RandomUrlLibrary extends UrlLibrary {
  
  constructor() {
    super()
    this._history = new UrlHistory()
  }

  _getUrl() {
    return crossOriginUrl(cacheBreakerUrl('http://www.gifbin.com/random'))
  }

  getNextUrl() {

    const handleStatus = (response) => {
      if (response.statusText === 'OK') {
        return Promise.resolve(response)
      } else {
        return Promise.reject('api request error')
      }
    }

    const requestData = (response) => {
      return Promise.resolve(response.arrayBuffer())
    }

    const parseUrlFromArrayBuffer = (arrayBuffer) => {
      const dataView = new DataView(arrayBuffer)
      // The TextDecoder interface is documented at http://encoding.spec.whatwg.org/#interface-textdecoder
      const decoder = new TextDecoder('utf-8')
      const decodedStr = decoder.decode(dataView)

      const parser = new DOMParser()
      const doc = parser.parseFromString(decodedStr, 'text/html')

      const mp4Element = doc.querySelector('video source[type="video/mp4"]')

      if (mp4Element) {
        const src = mp4Element.getAttribute('src')
        if (src) {
          const mp4Url = crossOriginUrl(src)
          return Promise.resolve(mp4Url)
        } else {
          return Promise.reject('No MP4 src specified')  
        }
      } else {
        return Promise.reject('No MP4 found')
      }
    }

    const url = this._getUrl()

    return fetch(url)
    .then(handleStatus)
    .then(requestData)
    .then(parseUrlFromArrayBuffer)
  }

}

export default RandomUrlLibrary
