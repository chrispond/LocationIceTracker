module.exports = (date = new Date()) => {
  const timeZoneOffset = -(420 * 60000); // Mountain Standard Time offset from UTC
  const localTime = new Date(date.getTime() + timeZoneOffset);
  const epoch = Math.floor(localTime / 1000);
  const formatted = `${localTime.getFullYear()}/${
    localTime.getMonth() + 1
  }/${localTime.getDate()}`;
  return { epoch, formatted, string: localTime };
};
