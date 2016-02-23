import GifAnimationBuilder from './gifAnimationBuilder'
import Mp4AnimationBuilder from './mp4AnimationBuilder'
import WebMAnimationBuilder from './webMAnimationBuilder'

import getUrlExtension from '../utils/getUrlExtension'

const BUILDER_CLASSES = {
  gif:  GifAnimationBuilder,
  mp4:  Mp4AnimationBuilder,
  webm: WebMAnimationBuilder
}

class AnimationBuilderFactory {

  static getBuilder(url) {
    const builderClass = BUILDER_CLASSES[getUrlExtension(url)]
    if (builderClass) {
      return new builderClass()
    }
  }

  static build(url, arrayBuffer) {
    return new Promise((resolve, reject) => {
      const builder = AnimationBuilderFactory.getBuilder(url)
      if (builder) {
        resolve(builder.build(url, arrayBuffer))
      } else {
        reject()
      }
    })
  }
  
}

export default AnimationBuilderFactory
