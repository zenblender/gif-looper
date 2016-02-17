export default function(url) {
  const value = Math.floor(Math.random() * 100000000)
  const delim = url.indexOf('?') === -1 ? '?' : '&'
  return `${ url }${ delim }cb=${ value }`
}
