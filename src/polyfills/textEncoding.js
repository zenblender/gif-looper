export default (function() {

  return
  if (!window.hasOwnProperty('TextDecoder') || !window.hasOwnProperty('TextEncoder')) {
    console.log('polyfilling text encoding')
    const TextEncoding = require('text-encoding')
    window.TextEncoder = TextEncoding.TextEncoder
    window.TextDecoder = TextEncoding.TextDecoder
  }

})()
