const TYPES_NAME = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const showPhotos = (offer, offerElement) => {
  const photosListFragment = document.createDocumentFragment();
  const photosContainer = offerElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');

  offer.photos.forEach((photoUrl) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.setAttribute('src', photoUrl);
    photosListFragment.appendChild(photoElement);
  });

  photosContainer.innerHTML = '';
  photosContainer.append(photosListFragment);
};

const showFeatures = (offer, offerElement) => {
  const features = offer.features;
  const featureList = offerElement.querySelectorAll('.popup__feature');

  featureList.forEach((featureListItem) => {
    const isNecessary = features.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const showOffers = (similarNotice) => {
  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offer = similarNotice.offer;
  const author = similarNotice.author;
  const offerElement = similarOfferTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = offer.price.toString().concat(' ₽/ночь');
  offerElement.querySelector('.popup__type').textContent = TYPES_NAME[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = offer.rooms.toString().concat(' комнат для ') + offer.guests.toString().concat(' гостей');
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после '.concat(offer.checkin) + ', выезд до '.concat(offer.checkout);
  offerElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);

  const description = offerElement.querySelector('.popup__description');
  description.textContent = offer.description ? offer.description : description.classList.add('hidden');

  showFeatures(offer, offerElement);
  showPhotos(offer, offerElement);

  return offerElement;
};

export {showOffers};
