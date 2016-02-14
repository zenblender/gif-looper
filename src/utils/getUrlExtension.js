export default function(url) {
  return url.split('.').pop().split(/\#|\?/)[0].toLowerCase()
}
