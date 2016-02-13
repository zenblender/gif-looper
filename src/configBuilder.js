import bowser from 'bowser'

export default function (config) {  
  if (config.browserOverrides) {
    Object.keys(config.browserOverrides).forEach((bowserKey) => {
      if (bowser[bowserKey]) {
        config = Object.assign({}, config, config.browserOverrides[bowserKey])
      }
    })
  }
  return config
}
