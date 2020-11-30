module.exports = (date = new Date()) => {
  const epoch = Math.floor(date.getTime() / 1000);
  const UTCTime = new Date(date.toISOString());
  const pretty = `${UTCTime.getFullYear()}/${
    UTCTime.getMonth() + 1
  }/${UTCTime.getDate()}`;

  return { epoch, pretty, string: UTCTime };
};
