/*
  Project Name: MA Test - Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */

const formValidate = require('./formValidate');

const form = document.querySelector('form[name=formMain]');
const rules = {
  required: {
    firstName: true,
    lastName: true,
    birthday: true,
    sex: true,
    country: true,
    email: true,
    password: true,
    address: true,
  },
  messages: {
    firstName: 'Please enter your first name',
    lastName: 'Please enter your last name',
    email: 'Please enter your email',
  },
  except: {
    firstName: [/["']/, 'This field must not contain any quotes'],
    lastName: [/["']/, 'This field must not contain any quotes'],
  },
  match: {
    email: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email address is incorrect',
    ],
  },
  dates: {
    birthday: ['past', 'The date must be less than today date'],
  },
  minlength: {
    password: [6, 'Password must be at least 6 characters'],
  },
  errorClass: 'alert',
  successClass: 'success',
  modalPopup: [true, 'modal'],
};

formValidate(form, rules);
