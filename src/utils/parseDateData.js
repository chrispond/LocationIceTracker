module.exports = (date = new Date()) => {
  const timeZoneOffsetMilliseconds = date.getTimezoneOffset() * 60000;
  const dateMilliseconds = date.getTime() - timeZoneOffsetMilliseconds;
  const epoch = Math.round(dateMilliseconds / 1000);
  const localTime = new Date(dateMilliseconds);
  const pretty = `${localTime.getFullYear()}-${
    localTime.getMonth() + 1
  }-${localTime.getDate()}`;

  return { epoch, pretty, string: localTime };
};
