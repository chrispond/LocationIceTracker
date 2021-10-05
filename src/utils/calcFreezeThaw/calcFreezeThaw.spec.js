const seedData = require('./calcFreezeThaw.seedData.js');
const {
  calcFreeze,
  calcThaw,
  calcThickness,
  isFreezing,
} = require('./calcFreezeThaw');

describe('calcFreezeThaw utils test', () => {
  context('default', () => {
    const { belowZero, freezeTemp, listOfTemps, thawTemp } = seedData;
    it('calculates freezing properly', function () {
      expect(calcFreeze(freezeTemp)).to.eq(0.13);
    });
    it('calculates freezing properly with negative number', function () {
      expect(calcFreeze(belowZero)).to.eq(4.8);
    });
    it('calculates thawing properly', function () {
      expect(calcThaw(thawTemp)).to.eq(0.33);
    });
    it('calculates thickness properly', function () {
      expect(calcThickness(listOfTemps)).to.eq(4.29);
    });
    it('isFreezing returns true when freezing temp', function () {
      expect(isFreezing(freezeTemp)).to.eq(true);
    });
    it('isFreezing returns false when above freezing temp', function () {
      expect(isFreezing(thawTemp)).to.eq(false);
    });
  });
});
