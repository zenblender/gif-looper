import RandomGifBinUrlProvider from '../urlProviders/randomGifBinUrlProvider'

import LimitedUrlValidator from '../validators/limitedUrlValidator'

import UrlLibrary from './urlLibrary'

class RandomUrlLibrary extends UrlLibrary {
  
  constructor() {
    super(new LimitedUrlValidator())
    this._urlProvider = new RandomGifBinUrlProvider()
  }

  getNextUrl() {
    return this._urlProvider.getUrl()
  }

}

export default RandomUrlLibrary
