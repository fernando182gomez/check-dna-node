const expect = require('chai').expect;
const mutantChecker = require('../services/mutant-check');

describe('Mutant Check', () => {

  it('Should check if sequence has mutation', () => {
    const dna = [
      "ATGCGA",
      "ATGTGC",
      "ATATGT",
      "AGGAGG",
      "CCTCTA",
      "TCACTG"
    ];

    const result = mutantChecker.hasMutation({ dna });

    expect(result.code).to.be.equal(200);
  });

  it('Should check if sequence has no mutation', () => {
    const dna = [
      "ATGCGA",
      "CTGTGC",
      "TTATGT",
      "AGGAGG",
      "CCTCTA",
      "TCACTG"
    ];

    const result = mutantChecker.hasMutation({ dna });

    expect(result.code).to.be.equal(403);
  });

});