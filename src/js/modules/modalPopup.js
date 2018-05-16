/*
  Module Name: Modal Popup
  Author: Andrew Mambyk
  Start Date: 16.05/18
 */

const isVisible = 'isVisible';
const button = '.modal__btn-close';
let modal;
let btnClose;

function hide() {
  modal.classList.remove(isVisible);
  document.body.style.overflow = '';
}

function show() {
  modal.classList.add(isVisible);
  document.body.style.overflow = 'hidden';
}

function modalPopup(selector) {
  modal = document.querySelector(selector);
  btnClose = modal.querySelector(button);

  show();

  btnClose.addEventListener('click', hide);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hide();
    }
  });
}

module.exports = modalPopup;
