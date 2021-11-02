const noticeForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const toggleForm = (form, disabled = true) => {
  for (const formItem of form) {
    if (disabled) {
      formItem.setAttribute('disabled', '');
    } else {
      formItem.removeAttribute('disabled');
    }
  }
};

const makeInactive = () => {
  noticeForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  toggleForm(noticeForm);
  toggleForm(mapForm);
};

const makeActive = () => {
  noticeForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  toggleForm(noticeForm, false);
  toggleForm(mapForm, false);
};

makeInactive();
makeActive();
