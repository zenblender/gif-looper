class UrlLibrary {
  
  getNextUrl() {
    // override me
  }

  getValidUrl(url) {
    // override me if needed
    return url
  }

}

export default UrlLibrary
