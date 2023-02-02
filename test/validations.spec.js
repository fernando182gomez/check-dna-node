const expect = require('chai').expect;
const validator = require('../services/validations');

describe('Validations', () => {

  it('Should validate DNA sequence (not null or empty)', () => {
    const expectedResult = { code: 500, message: 'The array can not be null or empty' };

    const array = null;
    const responseArray = validator.validateDNA({ dna: array });
    expect(responseArray).to.deep.equal(expectedResult);

    const arrayEmpty = [];
    const responseArrayEmpty = validator.validateDNA({ dna: arrayEmpty });
    expect(responseArrayEmpty).to.deep.equal(expectedResult);
  });

  it('Should validate DNA sequence (valid structure)', () => {
    const expectedResult = { code: 500, message: 'This array should be used in a 3x3 format' };
    const array = [
      "ATG",
      "CT",
      "TTA"
    ];
    const responseArray = validator.validateDNA({ dna: array });

    expect(responseArray).to.deep.equal(expectedResult);
  });

  it('Should validate DNA sequence (valid characters)', () => {
    const expectedResult = { code: 500, message: 'The string DAF has not valid information.' };
    const array = [
      "ATG",
      "CTG",
      "DAF"
    ];
    const responseArray = validator.validateDNA({ dna: array });

    expect(responseArray).to.deep.equal(expectedResult);
  });

  it('Should validate DNA sequence (ALL OK)', () => {
    const expectedResult = { code: 200, message: '' };
    const array = [
      "ATG",
      "CTG",
      "TTG"
    ];
    const responseArray = validator.validateDNA({ dna: array });

    expect(responseArray).to.deep.equal(expectedResult);
  });

});