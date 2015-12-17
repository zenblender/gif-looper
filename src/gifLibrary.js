class GifLibrary {
  
  static get cacherClass() {
    // override me
  }

  getNextSet() {
    // override me
  }

  isAllowed() {
    // override me if needed
    return true
  }

}

export default GifLibrary
