import renderAnimationGrid from './renderAnimationGrid'
import AnimationGrid from './animationGrid'
import Footer from './footer'

import {} from './main.less'

renderAnimationGrid()

new AnimationGrid('.anim').start()

Footer.go()

