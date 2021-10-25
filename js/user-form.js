const userRoomNumberSelect = document.querySelector('#room_number');
const userCapacitySelect = document.querySelector('#capacity');
const userSubmitButton = document.querySelector('.ad-form__submit');

userCapacitySelect.addEventListener('change', (evt) => {
  evt.preventDefault();
  userCapacitySelect.setCustomValidity('');
});

userSubmitButton.addEventListener('click', () => {
  const userCapacityNumberValue = Number(userCapacitySelect.value);
  const userRoomNumberValue = Number(userRoomNumberSelect.value);

  if ( userRoomNumberValue === 100) {
    if (userCapacityNumberValue !== 0) {
      userCapacitySelect.setCustomValidity('Необходимо выбрать поле "не для гостей"');
    }

    return;
  }

  if (userCapacityNumberValue > userRoomNumberValue && userCapacityNumberValue !== 0) {
    const invalidText = userRoomNumberValue === 1 ? 'поле "для 1 гостя"' : `${userRoomNumberValue} или менее гостей`;
    userCapacitySelect.setCustomValidity(`Необходимо выбрать ${invalidText}`);
  } else if (userCapacityNumberValue === 0) {
    userCapacitySelect.setCustomValidity('Необходимо выбрать поле с количеством гостей');
  } else {
    userCapacitySelect.setCustomValidity('');
  }
});
