const getRandomNumber = (min, max) => {
  const precision = 4;

  if (min < 0 || max < 0) {
    throw ('Диапазон и точность могут быть только положительными, включая ноль.');
  }

  if (min > max) {
    throw ('Значение «до» должно должно быть больше, чем значение «от».');
  }

  return ((Math.random() * (max - min)) + min).toPrecision(precision + 1);
};

getRandomNumber(3, 5);
getRandomNumber(3, 5);
getRandomNumber(5, 5);
getRandomNumber(0, 5);
getRandomNumber(5, 3);
getRandomNumber(-3, 5);
getRandomNumber(3, -5);
getRandomNumber(-3, -5);
