// add whatever parameters you deem necessary
function twoArrayObject(keys, vals) {
  const results = {}
  let valIdx = 0

  for (let key of keys) {
    results[key] = vals[valIdx] || null
    valIdx ++
  }
  return results
}
