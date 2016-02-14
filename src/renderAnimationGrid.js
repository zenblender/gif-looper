import config from './config'

export default function() {

  const table = document.createElement('table')

  for (let r = 0; r < config.rows; r++) {
    const tr = document.createElement('tr')
    for (let c = 0; c < config.cols; c++) {
      const td = document.createElement('td')
      td.classList.add('anim')

      const loading = document.createElement('div')
      loading.classList.add('loading')
      loading.textContent = 'LOADING'
      td.appendChild(loading)

      tr.appendChild(td)
    }
    table.appendChild(tr)
  }

  document.body.appendChild(table)

}
