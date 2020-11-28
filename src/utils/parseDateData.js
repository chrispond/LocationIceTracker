module.exports = (date = new Date()) => {
  const epoch = Math.floor(date.getTime() / 1000);
  const localTime = new Date(date);
  const pretty = `${localTime.getFullYear()}/${
    localTime.getMonth() + 1
  }/${localTime.getDate()}`;

  return { epoch, pretty, string: localTime };
};
