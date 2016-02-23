import VideoAnimationBuilder from './videoAnimationBuilder'

const MIME_TYPE = 'video/mp4'

class Mp4AnimationBuilder extends VideoAnimationBuilder {

  constructor() {
    super(MIME_TYPE)
  }

}

export default Mp4AnimationBuilder
