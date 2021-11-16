import {showPoints} from './map.js';
import {debounce} from './utils/debounce.js';

const SIMILAR_NOTICE_COUNT = 10;
const RERENDER_DELAY = 500;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRoom = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');
const features = document.querySelectorAll('[name="features"]');

function isCorrectPrice(price, priceType) {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

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
}

const filterPoints = (allPoints) => {
  let points = allPoints.slice();

  points = housingType.value !== 'any' ? points.filter((point) => housingType.value === point.offer.type) : points;
  points = housingPrice.value !== 'any' ? points.filter((point) => isCorrectPrice(point.offer.price, housingPrice.value)) : points;
  points = housingRoom.value !== 'any' ? points.filter((point) => housingRoom.value === point.offer.rooms.toString()) : points;
  points = housingGuest.value !== 'any' ? points.filter((point) => housingGuest.value === point.offer.guests.toString()) : points;

  return points;
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

const getPointRank = (point) => {
  const featureInputs = document.querySelectorAll('[name="features"]:checked');

  let rank = 0;

  featureInputs.forEach((feature) => {
    if (point.offer.features && point.offer.features.includes(feature.value)) {
      rank++;
    }
  });

  return rank;
};

const comparePoints = (pointA, pointB) => {
  const rankA = getPointRank(pointA);
  const rankB = getPointRank(pointB);

  return rankB - rankA;
};

const showFilteredPoints = (points) => {
  showPoints(points.slice(0, SIMILAR_NOTICE_COUNT));
  setHousingTypeChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setPriceChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setRoomChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setGuestChange(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
  setFeatures(debounce((filteredPoints) => showPoints(filteredPoints), RERENDER_DELAY), points);
};

export {comparePoints, showFilteredPoints};
