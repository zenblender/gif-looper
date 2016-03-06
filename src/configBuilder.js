import bowser from 'bowser'

import getQueryString from './utils/getQueryString'

const ALLOWED_QUERY_PARAMS = [
  'rows',
  'cols',
  'source',
  'preferredFormat',
  'minDisplayDurationMs',
  'simultaneousDownloads'
]

export default function (config) {  
  if (config.browserOverrides) {
    Object.keys(config.browserOverrides).forEach((bowserKey) => {
      if (bowser[bowserKey]) {
        config = Object.assign({}, config, config.browserOverrides[bowserKey])
      }
    })
  }

  ALLOWED_QUERY_PARAMS.forEach((paramName) => {
    const paramValue = getQueryString(paramName)
    if (paramValue || typeof paramValue === 'string' || typeof paramValue === 'number') {
      config[paramName] = paramValue
    }
  })

  return config
}
