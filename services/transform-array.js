/**
 * Transforms dna array in a vertical way
 * @param {*} array to transform
 * @returns transformed array in vertical
 */
function transformToVerticalArray(array) {
  const newArray = [];

  array.forEach((_, i) => {
    array.forEach(subItem => {
      if (!newArray[i]) {
        newArray[i] = '';
      }
      const subArray = subItem.split("");
      newArray[i] += subArray[i];
    });
  });

  return newArray;
}

/**
 * Transforms dna array from top to bottom
 * @param {*} array to transform
 * @returns transformed array from top to bottom
 */
function transformToPositiveDiagonal(array) {
  return transformDiagonal(array);
}

/**
 * Transforms dna array from bottom to top
 * @param {*} array to transform
 * @returns transformed array from bottom to top
 */
function transformToNegativeDiagonal(array) {
  return transformDiagonal(array, true);
}

/**
 * Transforms the array in a diagonal way
 * @param {*} array to transform
 * @param {*} fromBottom, indicate if the array starts from the top or from the bottom
 * @returns transformed array in diagonal
 */
function transformDiagonal(array, fromBottom = false) {
  var length = { "x": array[0].length, "y": array.length };
  length.max = Math.max(length.x, length.y);

  var tempArray, k, x, y;

  var newArray = [];

  for (k = 0; k <= 2 * (length.max - 1); ++k) {
    for (tempArray = [], y = length.y - 1; y >= 0; --y) {
      x = k - (fromBottom ? length.y - y : y);
      x >= 0 && x < length.x && tempArray.push(array[y][x]);
    }
    tempArray.length > 0 && newArray.push(tempArray.join(''));
  }
  return newArray;
}

// Export functions
module.exports = {
  transformToVerticalArray,
  transformToPositiveDiagonal,
  transformToNegativeDiagonal
}