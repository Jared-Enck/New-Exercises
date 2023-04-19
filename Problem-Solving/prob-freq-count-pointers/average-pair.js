// add whatever parameters you deem necessary
function averagePair(arr, avg) {
  let left = 0
  let right = arr.length -1

  while (left < right) {
    let currAverage = (arr[left] + arr[right]) / 2
    if (currAverage === avg) return true
    else if (currAverage > avg){
      right --
    } else {
      left ++
    }
  }
  return false
}
