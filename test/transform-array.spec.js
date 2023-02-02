const expect = require('chai').expect;
const transformArray = require('../services/transform-array');

describe('Transform Arrays', () => {

  let dna;

  beforeEach(() => {
    dna = [
      "ATGCGA",
      "CTGTGC",
      "TTATGT",
      "AGGAGG",
      "CCTCTA",
      "TCACTG"
    ];
  });

  it('Should Transform to vertical Array', () => {
    const result = transformArray.transformToVerticalArray(dna);

    expect(result).to.deep.equal([
      "ACTACT",
      "TTTGCC",
      "GGAGTA",
      "CTTACC",
      "GGGGTT",
      "ACTGAG"
    ]);
  });

  it('Should Transform to positive diagonal Array', () => {
    const result = transformArray.transformToPositiveDiagonal(dna);

    expect(result).to.deep.equal([
      "A",
      "CT",
      "TTG",
      "ATGC",
      "CGATG",
      "TCGTGA",
      "CTAGC",
      "ACGT",
      "CTG",
      "TA",
      "G"
    ]);
  });

  it('Should Transform to negative diagonal Array', () => {
    const result = transformArray.transformToNegativeDiagonal(dna);

    expect(result).to.deep.equal([
      "T",
      "CC",
      "ACA",
      "CTGT",
      "TCGTC",
      "GTAATA",
      "AGTGT",
      "GGTG",
      "TGC",
      "CG"
    ]);
  });

});