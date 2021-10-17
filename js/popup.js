const TYPES_NAME = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const offers = document.querySelector('#map-canvas');
const similarListFragment = document.createDocumentFragment();
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

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

  const featureContainer = offerElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => 'popup__feature--'.concat(feature));

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
};

const showOffer = (similarNotices) => {
  similarNotices.slice(-1).forEach(({offer, author}) => {
    const offerElement = similarOfferTemplate.cloneNode(true);

    offerElement.querySelector('.popup__title').innerHTML = offer.title;
    offerElement.querySelector('.popup__text--address').innerHTML = offer.address;
    offerElement.querySelector('.popup__text--price').innerHTML = offer.price.toString().concat(' ₽/ночь');
    offerElement.querySelector('.popup__type').innerHTML = TYPES_NAME[offer.type];
    offerElement.querySelector('.popup__text--capacity').innerHTML = offer.rooms.toString().concat(' комнат для ') + offer.guests.toString().concat(' гостей');
    offerElement.querySelector('.popup__text--time').innerHTML = 'Заезд после '.concat(offer.checkin) + ', выезд до '.concat(offer.checkout);
    offerElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);

    const description = offerElement.querySelector('.popup__description');
    offer.description ? description.innerHTML = offer.description : description.classList.add('hidden');

    showFeatures(offer, offerElement);
    showPhotos(offer, offerElement);

    similarListFragment.appendChild(offerElement);
  });

  offers.appendChild(similarListFragment);
};

export {showOffer};
