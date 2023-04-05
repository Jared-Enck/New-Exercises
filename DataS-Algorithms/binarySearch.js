function binarySearch(arr, val) {
  let leftIdx = 0
  let rightIdx = arr.length - 1

  while(leftIdx <= rightIdx) {
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2)
    let middleVal = arr[middleIdx]

    if (middleVal < val) {
      leftIdx = middleIdx +1

    } else if (middleIdx > val) {
      rightIdx = middleIdx -1

    } else {
      return middleIdx
    }
  }
  return -1
}