import configBuilder from './configBuilder'

const config = {
  
  source:                   'tagged',
  rows:                     2,
  cols:                     2,
  minDisplayDurationMs:     5000,
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
      subreddits: ['gifs', 'perfectloops']
    },

    preset: {
      localUrlPrefix:         'gifs/'
    }

  }

}

export default configBuilder(config)
