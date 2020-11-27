module.exports = (date = Date.now()) => {
  const string = new Date(date);
  const pretty = `${string.getFullYear()}-${string.getMonth()}-${string.getDate()}`;
  const epoch = Math.round(string.getTime() / 1000);
  return { epoch, pretty, string: string };
};
