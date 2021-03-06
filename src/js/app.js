(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */

var modalPopup = require('./modalPopup');

var rules = {
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
  modalPopup: []
};

var divErr = document.createElement('div');
divErr.classList.add(rules.messageClass);

var names = [];
var isValid = void 0;

function removeError(input) {
  var error = input.parentNode.querySelector('.' + rules.messageClass);
  if (error) {
    error.remove();
  }
  input.classList.remove(rules.errorClass);
}

function addError(input, message) {
  var error = divErr.cloneNode(true);

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
    var message = rules.messages[input.name];
    addError(input, message);
    return;
  }
  if (rules.minlength[input.name]) {
    var minlength = rules.minlength[input.name][0];
    var _message = rules.minlength[input.name][1];
    if (input.value.length < minlength) {
      addError(input, _message);
      return;
    }
  }
  if (rules.except[input.name]) {
    var regex = rules.except[input.name][0];
    var _message2 = rules.except[input.name][1];
    if (input.value.search(regex) !== -1) {
      addError(input, _message2);
      return;
    }
  }
  if (rules.match[input.name]) {
    var _regex = rules.match[input.name][0];
    var _message3 = rules.match[input.name][1];
    if (!input.value.match(_regex)) {
      addError(input, _message3);
      return;
    }
  }
  addSuccess(input);
}

function checkRadio(radio) {
  if (!rules.required[radio[0].name]) {
    return;
  }
  var formGroup = radio[0].closest('.' + rules.formGroupClass);
  for (var i = 0; i < radio.length; i += 1) {
    if (radio[i].checked) {
      removeError(formGroup);
      return;
    }
  }
  addError(formGroup);
}

function checkDate(date) {
  var userDate = Date.parse(date.value);
  if (rules.required[date.name] && !date.value) {
    var message = rules.messages[date.name];
    addError(date, message);
    return;
  }
  if (rules.dates[date.name]) {
    var todayDate = new Date();
    var dateState = rules.dates[date.name][0];
    var _message4 = rules.dates[date.name][1];
    if (dateState === 'past' && todayDate < userDate) {
      addError(date, _message4);
      return;
    }
  }
  addSuccess(date);
}

function checkAll(form) {
  isValid = true;
  for (var i = 0; i < names.length; i += 1) {
    var formField = form[names[i]];
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
  var nameSet = new Set();

  var _loop = function _loop(i) {
    var input = form[i];
    if (input.type !== 'submit') {
      nameSet.add(input.name);
      input.addEventListener('change', function (e) {
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
  };

  for (var i = 0; i < form.length; i += 1) {
    _loop(i);
  }
  names = [].concat(_toConsumableArray(nameSet));
}

function submitForm(form) {
  // form.submit();
  form.reset();
  if (rules.modalPopup[0]) {
    var modalClass = rules.modalPopup[1];
    modalPopup('.' + modalClass);
  }
}

function formValidate(form) {
  if (form.length === 0) {
    return form;
  }
  if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 0 && _typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
    Object.assign(rules, arguments.length <= 1 ? undefined : arguments[1]);
  }

  getNames(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkAll(form);
    if (isValid) {
      submitForm(form);
    }
  });
  return form;
}

module.exports = formValidate;

},{"./modalPopup":3}],2:[function(require,module,exports){
'use strict';

/*
  Project Name: MA Test - Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */

var formValidate = require('./formValidate');

var form = document.querySelector('form[name=formMain]');
var rules = {
  required: {
    firstName: true,
    lastName: true,
    birthday: true,
    sex: true,
    country: true,
    email: true,
    password: true,
    address: true
  },
  messages: {
    firstName: 'Please enter your first name',
    lastName: 'Please enter your last name',
    email: 'Please enter your email'
  },
  except: {
    firstName: [/["']/, 'This field must not contain any quotes'],
    lastName: [/["']/, 'This field must not contain any quotes']
  },
  match: {
    email: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email address is incorrect']
  },
  dates: {
    birthday: ['past', 'The date must be less than today date']
  },
  minlength: {
    password: [6, 'Password must be at least 6 characters']
  },
  errorClass: 'alert',
  successClass: 'success',
  modalPopup: [true, 'modal']
};

formValidate(form, rules);

},{"./formValidate":1}],3:[function(require,module,exports){
'use strict';

/*
  Module Name: Modal Popup
  Author: Andrew Mambyk
  Start Date: 16.05/18
 */

var isVisible = 'isVisible';
var button = '.modal__btn-close';
var modal = void 0;
var btnClose = void 0;

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
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      hide();
    }
  });
}

module.exports = modalPopup;

},{}]},{},[2]);
