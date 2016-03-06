import { TextDecoder } from 'text-encoding'

import UrlProvider from './urlProvider'

class HTMLUrlProvider extends UrlProvider {
  
  _getUrlFromDoc(doc) {
    // override me
  }

  _handleStatus(response) {
    if (response.statusText === 'OK') {
      return Promise.resolve(response)
    } else {
      return Promise.reject('http request error')
    }
  }

  _requestData(response) {
    return Promise.resolve(response.arrayBuffer())
  }

  _getDocFromArrayBuffer(arrayBuffer) {
    const dataView = new DataView(arrayBuffer)
    // The TextDecoder interface is documented at http://encoding.spec.whatwg.org/#interface-textdecoder
    const decoder = new TextDecoder('utf-8')
    const decodedStr = decoder.decode(dataView)

    const parser = new DOMParser()
    return parser.parseFromString(decodedStr, 'text/html')
  }

  getUrl() {
    return fetch(this._getRequestUrl())
    .then(this._handleStatus)
    .then(this._requestData)
    .then(this._getDocFromArrayBuffer)
    .then(this._getUrlFromDoc)
  }

}

export default HTMLUrlProvider
