/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1;

  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, longestWord = 0, i = 0) {
  if (i === words.length) return longestWord;

  longestWord = 
    words[i].length > longestWord 
      ? words[i].length 
      : longestWord
  
  return longest(words, longestWord, i + 1)
}

/** everyOther: return a string with every other letter. */

function everyOther(str, newStr = '', i = 0) {
  if (i >= str.length) return newStr

  newStr += str[i]

  return everyOther(str, newStr, i + 2)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, reverse = '', i = str.length - 1) {
  if (i < 0) return str === reverse

  reverse += str[i]

  return isPalindrome(str, reverse, i - 1)
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (i === arr.length || arr[i] === val) {
    return arr[i] === val ? i : -1
  }

  return findIndex(arr, val, i + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, reverse = '', i = str.length - 1) {
  if (i < 0) return reverse

  reverse += str[i]

  return revString(str, reverse, i - 1)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, strArr = []) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      gatherStrings(obj[key], strArr)
    }
    if (typeof obj[key] === 'string') strArr.push(obj[key])
  }
  return strArr
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, leftIdx = 0, rightIdx = arr.length) {
  if (leftIdx > rightIdx) return -1

  let middleIdx = Math.floor((leftIdx + rightIdx) / 2)
  let middleVal = arr[middleIdx]

  if (middleVal === val) return middleIdx
  
  if (middleVal < val) {
    return binarySearch(arr, val, middleIdx + 1, rightIdx)
  } 
  return binarySearch(arr, val, leftIdx, middleIdx - 1)
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
