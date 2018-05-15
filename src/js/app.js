(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */
var settings = {};
var names = {};

function listenInput(e) {
  e.preventDefault();
  console.log('input: ', e.target);
}

function getNames(form) {
  for (var i = 0; i < form.length; i += 1) {
    var input = form[i];
    if (input.type !== 'submit') {
      names[input.name] = input.name;
      input.addEventListener('change', listenInput);
    }
  }
}

function formValidate(form) {
  if (form.length === 0) {
    return form;
  }
  if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 0 && _typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object') {
    Object.assign(settings, arguments.length <= 1 ? undefined : arguments[1]);
  }

  getNames(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(e.target);
  });

  console.log('form: ', form);
  console.log('settings: ', settings);
  console.log('names: ', names);
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

formValidate(form);

},{"./formValidate":1}]},{},[2]);
