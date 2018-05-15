/*
  Module Name: Form Validation
  Author: Andrew Mambyk
  Start Date: 14.05/18
 */
const settings = {};
const names = {};

function listenInput(e) {
  e.preventDefault();
  console.log('input: ', e.target);
}

function getNames(form) {
  for (let i = 0; i < form.length; i += 1) {
    const input = form[i];
    if (input.type !== 'submit') {
      names[input.name] = input.name;
      input.addEventListener('change', listenInput);
    }
  }
}

function formValidate(form, ...args) {
  if (form.length === 0) {
    return form;
  }
  if (args.length > 0 && typeof args[0] === 'object') {
    Object.assign(settings, args[0]);
  }

  getNames(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target);
  });

  console.log('form: ', form);
  console.log('settings: ', settings);
  console.log('names: ', names);
}

module.exports = formValidate;
