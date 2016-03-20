import configBuilder from './configBuilder'

const config = {
  
  source:                   'tagged',
  rows:                     2,
  cols:                     2,
  preferredFormat:          'mp4',
  minDisplayDurationMs:     1500,
  simultaneousDownloads:    5,
  minWidth:                 200,
  minHeight:                150,
  maxFileDurationMs:        10000,

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
      cols: 1,
      preferredFormat:      'gif'
    }
  },

  sources: {

    tagged: {
      tagDurationMs:        30000,
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
      subreddits: ['gifs', 'perfectloops']
    },

    preset: {
      localUrlPrefix:         'gifs/'
    }

  }

}

export default configBuilder(config)
