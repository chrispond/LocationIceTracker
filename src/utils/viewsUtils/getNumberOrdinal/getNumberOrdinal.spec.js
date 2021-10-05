const getNumberOrdinal = require('./getNumberOrdinal');
const { properOrdinals } = require('./getNumberOrdinal.seedData');

describe('getNumberOrdinal utils test', () => {
  context('default', () => {
    it('returns the proper ordinals', function () {
      properOrdinals.forEach((ordinal, index) => {
        const ordinalNumber = index + 1;
        expect(getNumberOrdinal(ordinalNumber)).to.eq(ordinal);
      });
    });
  });
});
