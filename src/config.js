export default {
  
  sourceType:               'random',
  minDurationMs:            1500,
  numConcurrentDownloads:   5,

  // sourceType-specific config:
  random: {
    numRememberedUrls:      200,
    tags:                   [
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
  static: {
    localUrlPrefix:         'gifs/',
    preferLocalFiles:       false
  }

}
