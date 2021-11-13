import {isEscapeKey} from './util.js';

const renderModal = (status) => {
  const alertContainer = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const alert = alertContainer.cloneNode(true);

  alert.classList.add('hidden');
  document.body.append(alert);
};

renderModal('success');
renderModal('error');

const successModal = document.querySelector('.success');
const errorModal = document.querySelector('.error');
const errorModalCloseElement = document.querySelector('.error__button');

const onPopupEscKeydown = (evt, modal) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal(modal);
  }
};

function closeUserModal(modal) {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown(modal));
}

errorModalCloseElement.addEventListener('click', () => {
  closeUserModal(errorModal);
});

successModal.addEventListener('click', () => {
  closeUserModal(successModal);
});

errorModal.addEventListener('click', (evt) => {
  if (evt.target !== errorModalCloseElement) {
    closeUserModal(errorModal);
  }
});

export {onPopupEscKeydown};
