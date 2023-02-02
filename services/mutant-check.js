const { transformToVerticalArray, transformToPositiveDiagonal, transformToNegativeDiagonal } = require("./transform-array");

const NUM_TO_HAS_MUTATION = 2;
const REGEX = /([ATGC])\1{3,4}/;

function hasMutation(requestBody) {

  const { dna } = requestBody;
  const horizontal = checkHorizontalSecuence(dna);
  const vertical = checkVerticalSecuence(dna);
  const positive = checkDiagonalPositive(dna);
  const negative = checkDiagonalNegative(dna);

  const sequences = horizontal.concat(vertical).concat(positive).concat(negative);
  const numberOfSequences = sequences.length;
  const id = dna.join("");

  if (numberOfSequences >= NUM_TO_HAS_MUTATION) {
    return { code: 200, message: 'This sequence has mutation', data: { id, dna, sequences, numberOfSequences, hasMutation: true } }
  } else {
    return { code: 403, message: 'This sequence has not mutation', data: { id, dna, sequences, numberOfSequences, hasMutation: false } }
  }
}

/**
 * Check for horizontal matches in the array
 * @param {*} array to check
 * @returns array of items that includes 4 equals characters
 */
function checkHorizontalSecuence(array) {
  return array.filter((string) => {
    return REGEX.test(string);
  });
}

/**
 * Check for vertical matches in the array
 * @param {*} array to check
 * @returns array of items that includes 4 equals characters
 */
function checkVerticalSecuence(array) {
  return checkHorizontalSecuence(transformToVerticalArray(array));
}

/**
 * Check for positive diagonal matches in the array
 * @param {*} array to check
 * @returns array of items that includes 4 equals characters
 */
function checkDiagonalPositive(array) {
  return checkHorizontalSecuence(transformToPositiveDiagonal(array));
}

/**
 * Check for negative diagonal matches in the array
 * @param {*} array to check
 * @returns array of items that includes 4 equals characters
 */
function checkDiagonalNegative(array) {
  return checkHorizontalSecuence(transformToNegativeDiagonal(array));
}

module.exports = {
  hasMutation
}