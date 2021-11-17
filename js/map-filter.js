import {showPoints} from './map.js';
import {debounce} from './utils/debounce.js';

const SIMILAR_NOTICE_COUNT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RERENDER_DELAY = 500;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRoom = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');
const features = document.querySelectorAll('[name="features"]');

const isCorrectPrice = (price, priceType) => {
  switch (priceType) {
    case 'low':
      return price < LOW_PRICE;
    case 'middle':
      return price >= LOW_PRICE && price <= HIGH_PRICE;
    case 'high':
      return price > HIGH_PRICE;
    default:
      return true;
  }
};

const filterHousingType = (point) => housingType.value === 'any' || housingType.value === point.offer.type;

const filterPrice = (point) => housingPrice.value === 'any' || isCorrectPrice(point.offer.price, housingPrice.value);

const filterRoom = (point) => housingRoom.value === 'any' || housingRoom.value === point.offer.rooms.toString();

const filterGuest = (point) => housingGuest.value === 'any' || housingGuest.value === point.offer.guests.toString();

const filterFeature = (point) => {
  const featureInputs = Array.from(document.querySelectorAll('[name="features"]:checked'));

  return featureInputs.every((feature) => point.offer.features && point.offer.features.includes(feature.value));
};

const filterPoints = (points) => {
  const filteredPoints = [];

  for (const point of points) {
    if (filterHousingType(point) && filterPrice(point) && filterRoom(point) && filterGuest(point) && filterFeature(point)) {
      filteredPoints.push(point);
      if (filteredPoints.length >= SIMILAR_NOTICE_COUNT) {
        break;
      }
    }
  }

  return filteredPoints;
};

const setHousingTypeChange = (cb, points) => {
  housingType.addEventListener('change', () => {
    cb(filterPoints(points));
  });
};

const setPriceChange = (cb, points) => {
  housingPrice.addEventListener('change', () => {
    cb(filterPoints(points));
  });
};

const setRoomChange = (cb, points) => {
  housingRoom.addEventListener('change', () => {
    cb(filterPoints(points));
  });
};

const setGuestChange = (cb, points) => {
  housingGuest.addEventListener('change', () => {
    cb(filterPoints(points));
  });
};

const setFeatures = (cb, points) => {
  features.forEach((feature) => feature.addEventListener('click', () => {
    cb(filterPoints(points));
  }));
};

const showFilteredPoints = (points) => {
  showPoints(points.slice(0, SIMILAR_NOTICE_COUNT));
  setHousingTypeChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setPriceChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setRoomChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setGuestChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setFeatures(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
};

export {showFilteredPoints, filterPoints};
