import sample from 'lodash/collection/sample'

// allows the use of nested arrays to influence the probability of an item being selected
export default function(arr) {

  if (!Array.isArray(arr)) {
    return arr
  } else {
    let item = sample(arr)
    while (Array.isArray(item)) {
      item = sample(item)
    }
    return item
  }

}
