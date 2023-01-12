// function double(arr) {
//   return arr.map(function (val) {
//     return val * 2;
//   });
// }

// Refactor the above code to use two arrow functions. Turn it into a one-liner.

const nums = [1, 2, 3, 4, 5];

const double = (arr) => arr.map((n) => n * 2);

// Replace ALL functions with arrow functions:

// function squareAndFindEvens(numbers){
//     var squares = numbers.map(function(num){
//       return num ** 2;
//     });
//     var evens = squares.filter(function(square){
//       return square % 2 === 0;
//     });
//     return evens;
//   }

const squareAndFindEvens = (arr) =>
  arr.map((n) => n ** 2).filter((sqArr) => sqArr % 2 === 0);
