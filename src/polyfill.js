export default (function() {

  if (!window.hasOwnProperty('fetch')) {
    console.log('polyfilling fetch()')
    require('whatwg-fetch')
  }

})()
