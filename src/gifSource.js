import config from './config'

import GifRandomLibrary from './gifRandomLibrary'
import GifStaticLibrary from './gifStaticLibrary'
import GifRandomCacher from './gifRandomCacher'
import GifSequentialCacher from './gifSequentialCacher'

const TYPES = {
  'random': () => new GifSource(new GifRandomLibrary(), new GifRandomCacher()),
  'static': () => new GifSource(new GifStaticLibrary(), new GifSequentialCacher())
}

class GifSource {

  static getDefault() {
    return GifSource.getNew(config.sourceType)
  }

  static getNew(type) {
    return TYPES[type]()
  }

  constructor(library, cacher) {
    this._cacher = cacher
    this._cacher.setLibrary(library)
  }

  startDownloading() {
    this._cacher.start()
  }

  getNextGifImage() {
    return this._cacher.getNextGifImage()
  }
  
}

export default GifSource
