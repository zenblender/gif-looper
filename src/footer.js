import Rx from 'rx-lite'

import toggleFullScreen from './utils/toggleFullScreen'

import {} from './footer.less'

const SHOW_EVENTS = [ 'mousemove', 'touchstart' ]

const HIDE_DELAY_MS = 5000

class Footer {

  constructor(element) {
    this._element = element
    this._initHandlers()
  }

  _initHandlers() {

    const initShowHide = () => {
      const observables = SHOW_EVENTS.map(e => Rx.Observable.fromEvent(document, e))
      const showSource = Rx.Observable.merge(observables)
      const hideSource = showSource.debounce(HIDE_DELAY_MS)

      showSource.subscribe(this._setVisibility.bind(this, true))
      hideSource.subscribe(this._setVisibility.bind(this, false))
    }

    initShowHide()

  }

  _setVisibility(state) {
    const op = state ? 'add' : 'remove'
    this._element.classList[op]('visible')
  }

  static go() {

    const createElement = () => {

      const getInfoElement = () => {

        const getAuthorLine = () => {
          const copyrightElement = document.createElement('div')
          copyrightElement.appendChild(document.createTextNode('code ©2016 '))
          copyrightElement.appendChild((() => {
            const a = document.createElement('a')
            a.href = 'mailto:scott@shitjustgotreal.com'
            a.textContent = 'scott balay'
            return a
          })())
          return copyrightElement
        }

        const getCreditLine = () => {
          const creditElement = document.createElement('div')
          creditElement.appendChild(document.createTextNode('content courtesy of '))
          creditElement.appendChild((() => {
            const a = document.createElement('a')
            a.href = 'http://www.giphy.com/'
            a.target = '_blank'
            a.textContent = 'giphy'
            return a
          })())
          creditElement.appendChild(document.createTextNode(' and '))
          creditElement.appendChild((() => {
            const a = document.createElement('a')
            a.href = 'http://www.gifbin.com/'
            a.target = '_blank'
            a.textContent = 'gifbin'
            return a
          })())
          return creditElement
        }

        const infoElement = document.createElement('span')
        infoElement.appendChild(getAuthorLine())
        infoElement.appendChild(getCreditLine())
        return infoElement
      }

      const element = document.createElement('div')

      element.classList.add('footer')

      const titleElement = document.createElement('span')
      titleElement.classList.add('title')
      titleElement.textContent = 'shit just got real'
      element.appendChild(titleElement)

      element.appendChild(getInfoElement())

      const fsButton = document.createElement('button')
      fsButton.textContent = 'full screen'
      fsButton.addEventListener('click', toggleFullScreen)
      element.appendChild(fsButton)

      return element
    }

    const element = createElement()

    document.body.appendChild(element)

    new Footer(element)

  }

}

export default Footer
