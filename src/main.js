import GifLooper from './gifLooper'

const urls = [
  ['cat-double-take.gif', 'https://media.giphy.com/media/Zg44yLGbvXCjm/giphy.gif'],
  ['chewbacca-smash.gif', 'https://media.giphy.com/media/10juQ7fAaQjuHS/giphy.gif'],
  ['pool-slide-fail.gif', 'https://media.giphy.com/media/EG7bbilpEg6nS/giphy.gif'],
  ['cat-drinking.gif', 'https://media.giphy.com/media/WXNqe78uXxmKs/giphy.gif'],
  ['bar-worm.gif', 'https://media.giphy.com/media/xTk9ZEXFhScuvjX9bW/giphy.gif'],
  ['sabrina-cat-slap.gif', 'https://media.giphy.com/media/eHHjV2uahglMY/giphy.gif'],
  ['dog-crazy-tongue.gif', 'https://media.giphy.com/media/z66wZincEFYYg/giphy.gif'],
  ['creepy-sports-cheer.gif', 'https://media.giphy.com/media/11LplzzRswXDgs/giphy.gif'],
  'http://media.giphy.com/media/KOS39Lrl3c4iA/giphy.gif',
  'http://media.giphy.com/media/6JvVrxP6osBdC/giphy.gif',
  'http://media.giphy.com/media/gzeYiFabZIteo/giphy.gif',
  'http://33.media.tumblr.com/tumblr_m9imsbCaLa1rxlmf0o1_500.gif',
  'http://33.media.tumblr.com/tumblr_m9gmnw0gLf1rxlmf0o1_500.gif',
  'http://33.media.tumblr.com/260d62ce36d2b5967f940f4378ac6478/tumblr_inline_npyn8iaOGM1raprkq_500.gif',
  'http://media.giphy.com/media/JqsPn9iLt2hEI/giphy.gif',
  'http://media.giphy.com/media/mlMy72avA5GM0/giphy.gif',
  'http://media.giphy.com/media/Zko99XD5cP8By/giphy.gif',
  'http://media.giphy.com/media/P34fLBYz8fSco/giphy.gif',
  'http://media.giphy.com/media/EBSiCEsg4giZO/giphy.gif',
  'http://media.giphy.com/media/10hkBpr5ua7mCc/giphy.gif',
  'http://media.giphy.com/media/Bhgb35SZjLW00/giphy.gif',
  'http://media.giphy.com/media/V5iE42pj3B6kE/giphy.gif',
  'http://media.giphy.com/media/rVeXubAormu8o/giphy.gif',
  'http://media.giphy.com/media/vDZACy278sqT6/giphy.gif',
  'http://media.giphy.com/media/YZtALRQ1wHdUQ/giphy.gif',
  'http://media.giphy.com/media/oqpicLkw58HAc/giphy.gif',
  'http://media3.giphy.com/media/ELPtC7diADV2o/giphy.gif',
  'http://38.media.tumblr.com/bf1db33233b87ecc9eb8eaaaaf59b8aa/tumblr_inline_nnwea2azzD1raprkq_500.gif',
  'http://i.imgur.com/LWMA0TL.gif'
]

function go() {

  const renderContainer = () => {
    const container = document.createElement('div')
    container.id = 'gifs'
    document.body.appendChild(container)
    return container
  }

  const gifLooper = new GifLooper(renderContainer(), urls)
  gifLooper.start()
}

go()
