import {getRandomItem, getRandomNumber, getItems, getDistinctItems} from './util.js';

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

export {createNotice};
