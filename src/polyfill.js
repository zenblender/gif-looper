export default (function() {
  if (!window.hasOwnProperty('fetch')) {
    // polyfill fetch
    console.log('polyfilling fetch()')
    require('whatwg-fetch')
  }
})()
