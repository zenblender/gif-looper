import configBuilder from './configBuilder'

const config = {
  
  sourceType:               'tagged',
  rows:                     2,
  cols:                     2,
  minDurationMs:            1500,
  downloadsPerContainer:    3,

  style: {
    objectFit:              'cover',
    imageRendering:         'pixelated'
  },

  history: {
    numRememberedUrls:      200
  },

  browserOverrides: {
    mobile: {
      rows: 1,
      cols: 1
    }
  },

  sources: {

    tagged: {
      preferredFileFormat:  'gif',
      tags: [
        ['funny', 'fun', 'hilarious', 'silly'],
        ['weird', 'absurd', 'strange', 'crazy', 'wtf'],
        'fail',
        'win',
        ['fall', 'spill', 'crash', ['stunt', 'stunts']],
        ['dance', 'dancing', ['breakdance', 'breakdancing']],
        ['infomercial', 'commercial'],
        [['cat', 'cats'], ['animal', 'animals']],
        'reaction',
        '80s',
        [['laugh', 'laughing'], 'awkward']
      ]
    },

    reddit: {
      limit: 100,
      time: 'all',
      subreddits: ['gifs','perfectloops']
    },

    preset: {
      localUrlPrefix:         'gifs/',
      preferLocalFiles:       false
    }

  }

}

export default configBuilder(config)
