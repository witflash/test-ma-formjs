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
  except: {},
  match: {},
  defaultMessage: 'This field is required',
  formGroupClass: 'form__group',
  errorClass: 'has-error',
  successClass: 'has-success',
  messageClass: 'validate-error'
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
  if (rules.except[input.name]) {
    var regexp = rules.except[input.name][0];
    var message = rules.except[input.name][1];
    if (input.value.search(regexp) !== -1) {
      addError(input, message);
      return;
    }
  }
  if (rules.match[input.name]) {
    var _regexp = rules.match[input.name][0];
    var _message = rules.match[input.name][1];
    if (!input.value.match(_regexp)) {
      addError(input, _message);
      return;
    }
  }
  if (rules.required[input.name] && !input.value) {
    var _message2 = rules.messages[input.name];
    addError(input, _message2);
  } else {
    addSuccess(input);
  }
}

function checkAll(form) {
  isValid = true;
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
  messages: {
    firstName: 'Please enter your First Name'
  },
  except: {
    firstName: [/["']/, 'This field must not contain any quotes'],
    lastName: [/["']/, 'This field must not contain any quotes']
  },
  errorClass: 'alert',
  successClass: 'success'
};

formValidate(form, rules);

},{"./formValidate":1}]},{},[2]);
