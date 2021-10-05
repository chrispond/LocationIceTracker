const getNumberOrdinal = (day) => {
  return (
    day +
    (day > 0
      ? ['th', 'st', 'nd', 'rd'][
          (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10
        ]
      : '')
  );
};

module.exports = getNumberOrdinal;
