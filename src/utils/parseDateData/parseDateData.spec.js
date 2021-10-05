const seedData = require('./parseDateData.seedData.js');
const parseDateData = require('./parseDateData');

describe('parseDateData utils test', () => {
  context('default', () => {
    const { testDate, timezoneOffset } = seedData;
    it('returns the proper epoch number', function () {
      expect(
        parseDateData(new Date('1995-12-17T03:24:00T00:00:00')).epoch
      ).to.eq(448439400000);
    });
    it('returns the proper formatted date', function () {
      expect(
        parseDateData(new Date('1995-12-17T03:24:00T00:00:00')).formatted
      ).to.eq('1984/3/18');
    });
    it('returns the proper formatted date', function () {
      expect(
        parseDateData(new Date('1995-12-17T03:24:00T00:00:00')).string
      ).to.eq('Sat Mar 17 1984 16:30:00 GMT-0700 (Mountain Standard Time)');
    });
  });
});

/*
    expected data:
    {
        epoch: 448439400000,
        formatted: 1984/03/18,
        string: 'Sat Mar 17 1984 16:30:00 GMT-0700 (Mountain Standard Time)'
    }
    withOffset: 448414200
    noOffset: 448439400000
*/
