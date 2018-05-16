(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */
var rules = {
  required: {},
  messages: {},
  defaultMessage: 'This field is required',
  formGroupClass: 'form__group',
  errorClass: 'has-error',
  successClass: 'has-success',
  messageClass: 'validate-error'
};

var divErr = document.createElement('div');
divErr.classList.add(rules.messageClass);

var names = [];

function removeError(input) {
  var error = input.parentNode.querySelector('.' + rules.messageClass);
  if (error) {
    error.remove();
  }
  input.classList.remove(rules.errorClass);
}

function addError(input) {
  var error = divErr.cloneNode(true);

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

  var formGroup = radios[0].closest('.' + rules.formGroupClass);
  console.log('formGroup: ', formGroup);
  for (var i = 0; i < radios.length; i += 1) {
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
  for (var i = 0; i < names.length; i += 1) {
    var formField = form[names[i]];
    if (formField.length > 1 && formField[0].type === 'radio') {
      checkRadio(formField);
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
  });
  console.log(rules);
  console.log(names);
  return form;
}

module.exports = formValidate;

},{}],2:[function(require,module,exports){
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
    country: true
  },
  errorClass: 'alert',
  successClass: 'success'
};

formValidate(form, rules);

},{"./formValidate":1}]},{},[2]);
