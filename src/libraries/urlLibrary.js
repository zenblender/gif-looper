class UrlLibrary {
  
  constructor(validator) {
    this.validator = validator
  }

  getNextUrl() {
    // override me
  }

  getValidUrl(url) {
    return this.validator.getValidUrl(url)
  }

}

export default UrlLibrary
