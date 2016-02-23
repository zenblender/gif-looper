import UrlValidator from './urlValidator'

class PassthroughUrlValidator extends UrlValidator {

  getValidUrl(url) {
    return url
  }

  isValidMetaData(url, metaData) {
    return true
  }

}

export default PassthroughUrlValidator
