const MAX_ITEMS_COUNT = 5;

const getRandomNumber = (min, max, precision = 1) => {
  if (min < 0 || max < 0 || precision < 0) {
    throw ('Диапазон и точность могут быть только положительными, включая ноль.');
  }

  if (min > max) {
    throw ('Значение «до» должно должно быть больше, чем значение «от».');
  }
  const randomNumber = Math.random() * (max - min + 1) + min;
  return precision === 1 ? Math.floor(randomNumber) : randomNumber.toPrecision(precision);
};

const getRandomIndexItem = (array) => getRandomNumber(0, array.length - 1);

const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

const getItems = (array) => {
  const result = [];
  const resultSize = getRandomNumber(0, MAX_ITEMS_COUNT);

  for (let size = 0; size < resultSize; size++) {
    result.push(getRandomItem(array));
  }

  return result;
};

const getDistinctItems = (array) => {
  const result = array.slice();
  const removedCount = getRandomIndexItem(result);

  for (let count = 0; count <= removedCount; count++) {
    result.splice(getRandomIndexItem(result), 1);
  }

  return result;
};

export {getRandomItem, getRandomNumber, getItems, getDistinctItems};
