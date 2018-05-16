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
  },
  messages: {
    firstName: 'Please enter your First Name',
  },
  except: {
    firstName: [/["']/, 'This field must not contain any quotes'],
    lastName: [/["']/, 'This field must not contain any quotes'],
  },
  errorClass: 'alert',
  successClass: 'success',
};

formValidate(form, rules);
