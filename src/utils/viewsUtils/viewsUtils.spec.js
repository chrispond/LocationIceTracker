const iceSeedData = require('../calcFreezeThaw/calcFreezeThaw.seedData.js');
const viewUtils = require('./viewUtils');

describe('viewUtils utils test', () => {
  context('default', () => {
    const { freezeTemp, listOfTemps, thawTemp } = iceSeedData;
    const {
      iceFreeze,
      iceThaw,
      iceThickness,
      currentYear,
      prettyDate,
    } = viewUtils;
    it('returns expected iceFreeze number', function () {
      expect(iceFreeze(freezeTemp)).to.eq('0.1');
    });
    it('returns expected iceThaw number', function () {
      expect(iceThaw(thawTemp)).to.eq('0.3');
    });
    it('returns expected iceThickness number', function () {
      expect(iceThickness(listOfTemps, 2)).to.eq('2.3');
    });
    it('returns expected currentYear number', function () {
      expect(currentYear).to.eq('2021');
    });
    it('returns expected prettyDate date', function () {
      expect(prettyDate('2020/10/29').date).to.eq('29th');
    });
    it('returns expected prettyDate day', function () {
      expect(prettyDate('2020/10/29').day).to.eq('Thu');
    });
    it('returns expected prettyDate month', function () {
      expect(prettyDate('2020/10/29').month).to.eq('Oct');
    });
    it('returns expected prettyDate year', function () {
      expect(prettyDate('2020/10/29').year).to.eq('2020');
    });
  });
});
