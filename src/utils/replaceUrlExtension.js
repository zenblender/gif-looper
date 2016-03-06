// Note: Will remove any query string
export default function(url, fromExtension, toExtension) {
  const pos = url.toLowerCase().lastIndexOf(`.${ fromExtension }`)
  if (pos !== -1) {
    return `${ url.substr(0, pos) }.${ toExtension }`
  } else {
    return url
  }
}
