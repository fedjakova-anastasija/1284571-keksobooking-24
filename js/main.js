function getRandomNumber(min, max, precision) {
  if ((min || max || precision) < 0) {
    console.error('Диапазон и точность могут быть только положительными, включая ноль.');
    return;
  }

  if (min > max) {
    console.error('Значение «до» должно должно быть больше, чем значение «от».');
    return;
  }

  return ((Math.random() * (max - min)) + min).toPrecision(precision + 1);
}

getRandomNumber(3, 5, 0);
getRandomNumber(5, 5, 1);
getRandomNumber(0, 5, 2);
getRandomNumber(5, 3, 3);
getRandomNumber(-3, 5, 4);
getRandomNumber(3, -5, 5);
getRandomNumber(-3, -5, 6);
