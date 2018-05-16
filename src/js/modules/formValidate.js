/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */
const rules = {
  required: {},
  messages: {},
  except: {},
  match: {},
  dates: {},
  minlength: {},
  defaultMessage: 'This field is required',
  formGroupClass: 'form__group',
  errorClass: 'has-error',
  successClass: 'has-success',
  messageClass: 'validate-error',
};

const divErr = document.createElement('div');
divErr.classList.add(rules.messageClass);

let names = [];
let isValid;

function removeError(input) {
  const error = input.parentNode.querySelector(`.${rules.messageClass}`);
  if (error) {
    error.remove();
  }
  input.classList.remove(rules.errorClass);
}

function addError(input, message) {
  const error = divErr.cloneNode(true);

  isValid = false;
  error.innerHTML = message || rules.defaultMessage;
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

function checkInput(input) {
  if (rules.required[input.name] && !input.value) {
    const message = rules.messages[input.name];
    addError(input, message);
    return;
  }
  if (rules.minlength[input.name]) {
    const minlength = rules.minlength[input.name][0];
    const message = rules.minlength[input.name][1];
    if (input.value.length < minlength) {
      addError(input, message);
      return;
    }
  }
  if (rules.except[input.name]) {
    const regex = rules.except[input.name][0];
    const message = rules.except[input.name][1];
    if (input.value.search(regex) !== -1) {
      addError(input, message);
      return;
    }
  }
  if (rules.match[input.name]) {
    const regex = rules.match[input.name][0];
    const message = rules.match[input.name][1];
    if (!input.value.match(regex)) {
      addError(input, message);
      return;
    }
  }
  addSuccess(input);
}

function checkRadio(radio) {
  console.log('radio: ', radio);
  if (!rules.required[radio[0].name]) {
    return;
  }
  const formGroup = radio[0].closest(`.${rules.formGroupClass}`);
  console.log('formGroup: ', formGroup);
  for (let i = 0; i < radio.length; i += 1) {
    if (radio[i].checked) {
      removeError(formGroup);
      return;
    }
  }
  addError(formGroup);
}

function checkDate(date) {
  const userDate = Date.parse(date.value);
  console.log('userDate: ', userDate);
  if (rules.required[date.name] && !date.value) {
    const message = rules.messages[date.name];
    addError(date, message);
    return;
  }
  if (rules.dates[date.name]) {
    const todayDate = new Date();
    const dateState = rules.dates[date.name][0];
    const message = rules.dates[date.name][1];
    if (dateState === 'past' && todayDate < userDate) {
      addError(date, message);
      return;
    }
  }
  addSuccess(date);
}

function checkAll(form) {
  isValid = true;
  for (let i = 0; i < names.length; i += 1) {
    const formField = form[names[i]];
    if (formField.length > 1 && formField[0].type === 'radio') {
      checkRadio(formField);
    } else if (formField.type === 'date') {
      checkDate(formField);
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
        } else if (e.target.type === 'date') {
          checkDate(e.target);
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
    if (isValid) {
      alert('Submit OK!');
      // form.submit();
    }
  });
  console.log(rules);
  console.log(names);
  return form;
}

module.exports = formValidate;
