// add whatever parameters you deem necessary
function freqCounter(str) {
  const freqs = new Map()

  for (let char of str) {
    let charCount = freqs.get(char) || 0
    freqs.set(char, charCount + 1)
  }
  return freqs
}

function constructNote(str1,str2) {
  const str1Freqs = freqCounter(str1)
  const str2Freqs = freqCounter(str2)
  
  if (str1Freqs.size > str2Freqs.size) return false
  
  for (let letter of str1Freqs.keys()) {
    if (!str2Freqs.get(letter)) return false;
    if (str1Freqs.get(letter) > str2Freqs.get(letter)) return false
  }
  return true
}