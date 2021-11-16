const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRoom = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');
const features = document.querySelectorAll('[name="features"]');

const setHousingTypeChange = (cb, points) => {
  const copiedPoints = points.slice();
  housingType.addEventListener('change', (evt) => {
    points = copiedPoints.filter(point => evt.target.value === point.offer.type);
    cb(points);
  });
};

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

const setPriceChange = (cb, points) => {
  const copiedPoints = points.slice();
  housingPrice.addEventListener('change', (evt) => {
    points = copiedPoints.filter(point => isCorrectPrice(point.offer.price, evt.target.value));
    cb(points);
  });
};

const setRoomChange = (cb, points) => {
  const copiedPoints = points.slice();
  housingRoom.addEventListener('change', (evt) => {
    points = copiedPoints.filter(point => evt.target.value === point.offer.rooms.toString());
    cb(points);
  });
};

const setGuestChange = (cb, points) => {
  const copiedPoints = points.slice();
  console.log(copiedPoints);
  housingGuest.addEventListener('change', (evt) => {
    points = copiedPoints.filter(point => evt.target.value === point.offer.guests.toString());
    cb(points);
  });
};

const setFeatures = (cb, points) => {
  features.forEach(feature => feature.addEventListener('click', () => {
    cb(points);
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

export {setHousingTypeChange, setPriceChange, setRoomChange, setGuestChange, setFeatures, comparePoints};
