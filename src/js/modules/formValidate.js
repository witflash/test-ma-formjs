/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */
const rules = {
  required: {},
  messages: {},
  defaultMessage: 'This field is required',
  formGroupClass: 'form__group',
  errorClass: 'has-error',
  successClass: 'has-success',
  messageClass: 'validate-error',
};

const divErr = document.createElement('div');
divErr.classList.add(rules.messageClass);

let names = [];

function removeError(input) {
  const error = input.parentNode.querySelector(`.${rules.messageClass}`);
  if (error) {
    error.remove();
  }
  input.classList.remove(rules.errorClass);
}

function addError(input) {
  const error = divErr.cloneNode(true);

  error.innerHTML = rules.defaultMessage;
  removeError(input);
  input.parentNode.insertBefore(error, input.nexSibling);
  input.classList.remove(rules.successClass);
  input.classList.add(rules.errorClass);
}

function addSuccess(input) {
  removeError(input);
  input.classList.remove(rules.errorClass);
  input.classList.add(rules.successClass);
}

function checkRadio(radios) {
  console.log('radios: ', radios);
  if (!rules.required[radios[0].name]) {
    return;
  }

  const formGroup = radios[0].closest(`.${rules.formGroupClass}`);
  console.log('formGroup: ', formGroup);
  for (let i = 0; i < radios.length; i += 1) {
    if (radios[i].checked) {
      removeError(formGroup);
      return;
    }
  }
  addError(formGroup);
}

function checkInput(input) {
  console.log('input: ', input);
  if (rules.required[input.name] && !input.value) {
    addError(input);
  } else {
    addSuccess(input);
  }
}

function checkAll(form) {
  for (let i = 0; i < names.length; i += 1) {
    const formField = form[names[i]];
    if (formField.length > 1 && formField[0].type === 'radio') {
      checkRadio(formField);
    } else {
      checkInput(formField);
    }
  }
}

function getNames(form) {
  const nameSet = new Set();

  for (let i = 0; i < form.length; i += 1) {
    const input = form[i];
    if (input.type !== 'submit') {
      nameSet.add(input.name);
      input.addEventListener('change', (e) => {
        e.preventDefault();
        if (e.target.type === 'radio') {
          checkRadio(form[input.name]);
        } else {
          checkInput(e.target);
        }
      });
    }
  }

  names = [...nameSet];
}

function formValidate(form, ...args) {
  if (form.length === 0) {
    return form;
  }
  if (args.length > 0 && typeof args[0] === 'object') {
    Object.assign(rules, args[0]);
  }

  getNames(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAll(form);
  });
  console.log(rules);
  console.log(names);
  return form;
}

module.exports = formValidate;
