import GifBinUrlProvider from '../urlProviders/gifBinUrlProvider'

import LimitedUrlValidator from '../validators/limitedUrlValidator'

import UrlLibrary from './urlLibrary'

class RandomUrlLibrary extends UrlLibrary {
  
  constructor() {
    super(new LimitedUrlValidator())
    this._urlProvider = new GifBinUrlProvider()
  }

  getNextUrl() {
    return this._urlProvider.getUrl()
  }

}

export default RandomUrlLibrary
