import Animation from '../animation'
import VideoAnimationBuilder from './videoAnimationBuilder'

const MIME_TYPE = 'video/webm'

class WebMAnimationBuilder extends VideoAnimationBuilder {

  constructor() {
    super(MIME_TYPE)
  }

}

export default WebMAnimationBuilder
