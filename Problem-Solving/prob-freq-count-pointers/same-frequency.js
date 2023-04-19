// add whatever parameters you deem necessary
function freqCounter(nums) {
  const freqs = new Map()

  for (let n of nums) {
    let numCount = freqs.get(n) || 0
    freqs.set(n, numCount + 1)
  }
  return freqs
}

function sameFrequency(num1,num2) {
  const arr1 = Array.from(String(num1),Number)
  const arr2 = Array.from(String(num2),Number)

  if (arr1.length !== arr2.length) return false

  const freqMap1 = freqCounter(arr1)
  const freqMap2 = freqCounter(arr2)

  if (freqMap1.size !== freqMap2.size) return false

  for (let n of freqMap1.keys()) {
    if (freqMap1.get(n) !== freqMap2.get(n)) return false
  }
  return true
 }
