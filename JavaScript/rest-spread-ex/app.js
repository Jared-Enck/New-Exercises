// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

//   Refactor it to use the rest operator & an arrow function:
/* Write an ES2015 Version */

const filterOutOdds = (...nums) => {
  return nums.filter((n) => n % 2 === 0);
};

// Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.
// Make sure to do this using the rest and spread operator.

const findMin = (...nums) => {
  return Math.min(...nums);
};

// Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

// Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.

const doubleAndReturnArgs = (arr, ...nums) => {
  nums.map((n) => n * 2);
  return [arr, ...nums];
};

// For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!?
// Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */
// function removeRandom(items) {}

const removeRandom = (items) => {
  const rando = Math.floor(Math.random() * items.length);
  console.log(rando);
  return [...items.slice(0, rando), ...items.slice(rando + 1)];
};

/** Return a new array with every item in array1 and array2. */
// function extend(array1, array2) {}

const extend = (arr1, arr2) => {
  return [...arr1, ...arr2];
};

/** Return a new object with all the keys and values
from obj and a new key/value pair */
// function addKeyVal(obj, key, val) {}

const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val };
};

/** Return a new object with a key removed. */
// function removeKey(obj, key) {}

const removeKey = (obj, key) => {
  delete obj[key];
  return { ...obj };
};

/** Combine two objects and return a new object. */
// function combine(obj1, obj2) {}

const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

/** Return a new object with a modified key and value. */
// function update(obj, key, val) {}

const update = (obj, key, val) => {
  return { ...obj, [key]: val };
};
