import config from './config'

export default function(img) {
  
  img.style.width   = `${ 100 / config.cols }vw`
  img.style.height  = `${ 100 / config.rows }vh`

  if (config.style) {
    for (let styleName of Object.keys(config.style)) {
      img.style[styleName] = config.style[styleName]
    }
  }

}
