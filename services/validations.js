/**
 * Function to validate if a dna array is valid
 * @param {*} requestBody request from the client and shoudl contains a dna array inside
 * @returns code 500 if is not valid, 200 if is valid
 */
function validateDNA(requestBody) {

  const { dna } = requestBody;

  // Validate if the dna array is not empty and has a valid value
  if (!dna || dna.length === 0) {
    return { code: 500, message: 'The array can not be null or empty' };
  }

  const dnaLength = dna.length;
  const regex = '^[ACGT]+$';
  let error = null;

  for (let i = 0; i < dnaLength; i++) {

    // Check the correct structure of the array, validating if is a square array
    if (dna[i].trim().length !== dnaLength) {
      error = { code: 500, message: `This array should be used in a ${dnaLength}x${dnaLength} format` };
      break;
    }

    // Check if the array contains valid characters in all positions
    if (!dna[i].match(regex)) {
      error = { code: 500, message: `The string ${dna[i]} has not valid information.` };
      break;
    }
  }

  return error ? error : { code: 200, message: '' };
}

module.exports = {
  validateDNA
};