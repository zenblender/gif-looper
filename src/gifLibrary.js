class GifLibrary {
  
  getNextSet() {
    // override me
  }

  canFetch() {
    // override me if needed
    return true
  }

  canDisplay() {
    // override me if needed
    return true
  }

}

export default GifLibrary
