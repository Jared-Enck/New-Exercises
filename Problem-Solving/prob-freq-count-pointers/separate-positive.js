// add whatever parameters you deem necessary
function separatePositive(nums) {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    if (nums[left] < 0 && nums[right] > 0) {
      let temp = nums[left]
      nums[left] = nums[right]
      nums[right] = temp
      
      left++
      right--
    } else {
      if (nums[left] > 0) left++
      else right--
    }
  }
  return nums
}

