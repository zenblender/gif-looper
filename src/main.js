require('./polyfill')

import GifLooper from './gifLooper'
import GifRandomLibrary from './gifRandomLibrary'
import GifStaticLibrary from './gifStaticLibrary'

const LIBRARY_TYPE = GifRandomLibrary

new GifLooper(document.querySelector('#gifs'), LIBRARY_TYPE).start()

