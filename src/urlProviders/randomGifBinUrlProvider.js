import config from '../config'

import HTMLUrlProvider from './htmlUrlProvider'

import cacheBreakerUrl from '../utils/cacheBreakerUrl'
import crossOriginUrl from '../utils/crossOriginUrl'
import replaceUrlExtension from '../utils/replaceUrlExtension'

class RandomGifBinUrlProvider extends HTMLUrlProvider {
  
  _getRequestUrl() {
    return crossOriginUrl(cacheBreakerUrl('http://www.gifbin.com/random'))
  }

  _getUrlFromDoc(doc) {
    const mp4Element = doc.querySelector('video source[type="video/mp4"]')

    if (mp4Element) {
      const mp4Url = mp4Element.getAttribute('src')
      if (mp4Url) {
        const preferredUrl = (config.preferredFormat === 'gif') ?
          replaceUrlExtension(mp4Url, 'mp4', 'gif') : mp4Url
        return Promise.resolve(crossOriginUrl(preferredUrl))
      } else {
        return Promise.reject('No MP4 src specified')  
      }
    } else {
      return Promise.reject('No MP4 found')
    }
  }

}

export default RandomGifBinUrlProvider
