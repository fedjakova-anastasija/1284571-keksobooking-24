const SIMILAR_NOTICE_COUNT = 10;

const MAX_ITEMS_COUNT = 5;

const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 10;

const MIN_PRICE = 10;
const MAX_PRICE = 100;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 5;

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const LATITUDE_PRECISION = 7;

const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const LONGITUDE_PRECISION = 8;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

const getDistinctItems = (array) => {
  const result = array.slice();
  const removedCount = getRandomIndexItem(result);

  for (let count = 0; count <= removedCount; count++) {
    result.splice(getRandomIndexItem(result), 1);
  }

  return result;
};

const getItems = (array) => {
  const result = [];
  const resultSize = getRandomNumber(0, MAX_ITEMS_COUNT);

  for (let size = 0; size < resultSize; size++) {
    result.push(getRandomItem(array));
  }

  return result;
};

const createAuthor = () => {
  const index = getRandomNumber(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX);

  return {
    avatar: `img/avatars/user${(index < MAX_AVATAR_INDEX) ? ('0').concat(index) : index}.png`,
  };
};

const createOffer = (location) => ({
  title: 'Заголовок',
  address: location.lat.concat(', ', location.lng),
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  type: getRandomItem(TYPES),
  rooms: getRandomNumber(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
  guests: getRandomNumber(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
  checkin: getRandomItem(CHECKIN),
  checkout: getRandomItem(CHECKOUT),
  features: getDistinctItems(FEATURES),
  description: 'Описание',
  photos: getItems(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomNumber(MIN_LATITUDE, MAX_LATITUDE, LATITUDE_PRECISION),
  lng: getRandomNumber(MIN_LONGITUDE, MAX_LONGITUDE, LONGITUDE_PRECISION),
});

const createNotice = () => {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location: location,
  };
};

const similarNotices = Array.from({length: SIMILAR_NOTICE_COUNT}, createNotice);

similarNotices;
