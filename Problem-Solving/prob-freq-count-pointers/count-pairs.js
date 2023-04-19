// add whatever parameters you deem necessary
function countPairs(nums, target) {
  let count = 0;
  let left = 0;
  let right = nums.length - 1

  if (nums.length === 0) return 0;

  nums.sort((a,b) => a - b)

  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) {
      count++
      left++
    } else if (sum > target) right--
    else left++
  }
  return count
}
