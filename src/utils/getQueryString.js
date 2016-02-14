export default function (field, url = window.location.href) {
  const reg = new RegExp(`[?&]${ field }=([^&#]*)`, 'i')
  const string = reg.exec(url)
  return string ? string[1] : null
}
