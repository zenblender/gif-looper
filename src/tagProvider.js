import config from './config'

import getQueryString from './utils/getQueryString'
import sampleFromList from './utils/sampleFromList'

class TagProvider {
  
  constructor() {
    this._currentTag    = null
    this._lastTagTimeMs = null
    this._tagsList      = this._getTagsList()
    this._tagDurationMs = this._getTagDurationMs()
  }

  _getTagDurationMs() {
    const customTagDurationMs = getQueryString('tagDurationMs')
    if (customTagDurationMs !== null) {
      return parseInt(customTagDurationMs)
    } else {
      return Math.max(0, config.sources.tagged.tagDurationMs)
    }
  }

  _getTagsList() {
    const customTagStr = getQueryString('tag')
    if (customTagStr !== null) {
      // compare to null because a blank string could have been provided, which should be honored
      return customTagStr.split(',').map(t => t.trim())
    } else {
      return config.sources.tagged.tags
    }
  }

  get() {

    const setNewTag = () => {
      let newTag = sampleFromList(this._tagsList)
      let count = 0
      while (newTag === this._currentTag && count < 10) {
        newTag = sampleFromList(this._tagsList)
        count++
      }
      this._currentTag = newTag
      this._lastTagTimeMs = Date.now()
    }

    const needsNewTag =   this._currentTag === null ||
                          this._lastTagTimeMs === null ||
                          Date.now() > this._lastTagTimeMs + this._tagDurationMs

    if (needsNewTag) {
      setNewTag()
    }
    return this._currentTag

  }

}

export default TagProvider
