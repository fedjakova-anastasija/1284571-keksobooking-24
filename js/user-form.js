import {sendData} from './api.js';
import {showErrorMessage} from './util.js';
import {map, mainPinMarker, CENTER_LAT, CENTER_LNG} from './map.js';
import {showFilteredPoints} from './map-filter.js';

const MAX_ROOM_NUMBER_VALUE = 100;
const MIN_CAPACITY_NUMBER_VALUE = 1;
const NO_CAPACITY_VALUE = 0;

const userRoomNumberSelect = document.querySelector('#room_number');
const userCapacitySelect = document.querySelector('#capacity');
const userHousingTypeSelect = document.querySelector('#type');
const userPriceInput = document.querySelector('#price');
const userTimeinSelect = document.querySelector('#timein');
const userTimeoutSelect = document.querySelector('#timeout');
const userSubmitButton = document.querySelector('.ad-form__submit');
const userForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const housingType = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const checkCapacity = () => {
  const userCapacityNumberValue = Number(userCapacitySelect.value);
  const userRoomNumberValue = Number(userRoomNumberSelect.value);

  if (userRoomNumberValue === MAX_ROOM_NUMBER_VALUE && userCapacityNumberValue !== NO_CAPACITY_VALUE) {
    userCapacitySelect.setCustomValidity('Необходимо выбрать поле "не для гостей"');
    userCapacitySelect.reportValidity();

    return;
  }

  if (userCapacityNumberValue > userRoomNumberValue && userCapacityNumberValue !== NO_CAPACITY_VALUE) {
    const invalidText = userRoomNumberValue === MIN_CAPACITY_NUMBER_VALUE ? 'поле "для 1 гостя"' : `${userRoomNumberValue} или менее гостей`;
    userCapacitySelect.setCustomValidity(`Необходимо выбрать ${invalidText}`);
  } else if (userCapacityNumberValue === NO_CAPACITY_VALUE && userRoomNumberValue !== MAX_ROOM_NUMBER_VALUE) {
    userCapacitySelect.setCustomValidity('Необходимо выбрать поле с количеством гостей');
  } else {
    userCapacitySelect.setCustomValidity('');
  }
  userCapacitySelect.reportValidity();
};

const checkPrice = () => {
  const userPriceValue = Number(userPriceInput.value);
  const userHousingTypeValue = userHousingTypeSelect.value;

  if (userPriceValue < housingType[userHousingTypeValue]) {
    userPriceInput.setCustomValidity(`Минимальная цена ${housingType[userHousingTypeValue]}`);
  } else {
    userPriceInput.setCustomValidity('');
  }

  userPriceInput.reportValidity();
};

const onCapacityChange = () => {
  checkCapacity();
};

const onRoomNumberChange = () => {
  checkCapacity();
};

const onHousingTypeChange = () => {
  const userHousingTypeValue = userHousingTypeSelect.value;

  userPriceInput.placeholder = housingType[userHousingTypeValue];

  checkPrice();
  userCapacitySelect.reportValidity();
};

const onPriceChange = () => {
  checkPrice();
};

const onTimeinChange = (evt) => userTimeoutSelect.value = evt.target.value;

const onTimeoutChange = (evt) => userTimeinSelect.value = evt.target.value;

userCapacitySelect.addEventListener('change', onCapacityChange);
userRoomNumberSelect.addEventListener('change', onRoomNumberChange);
userHousingTypeSelect.addEventListener('change', onHousingTypeChange);
userPriceInput.addEventListener('input', onPriceChange);
userTimeinSelect.addEventListener('change', onTimeinChange);
userTimeoutSelect.addEventListener('change', onTimeoutChange);

const resetForm = (points) => {
  const addressInput = document.querySelector('#address');
  const latlng = L.latLng(CENTER_LAT, CENTER_LNG);

  userForm.reset();
  mapFiltersForm.reset();
  mainPinMarker.setLatLng(latlng);
  map.closePopup();
  addressInput.setAttribute('value', `${CENTER_LAT}, ${CENTER_LNG}`);
  showFilteredPoints(points);
};

userSubmitButton.addEventListener('click', () => {
  onCapacityChange();
  onHousingTypeChange();
});

const setUserFormSubmit = (onSuccess) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      showErrorMessage,
      new FormData(evt.target),
    );
  });

  userForm.addEventListener('reset', () => {
    onSuccess();
  });
};

export {setUserFormSubmit, resetForm};
