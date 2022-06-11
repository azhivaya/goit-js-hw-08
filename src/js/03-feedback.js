import throttle from "lodash.throttle";

const LS_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormDataInput, 500));
form.addEventListener('submit', onFormSubmit)

if (localStorage.getItem(LS_KEY) !== null) {
    const parsedData = JSON.parse(localStorage.getItem(LS_KEY));

    email.value = parsedData.email;
    message.value = parsedData.message;
}

let inputData = {
  email: email.value,
  message: message.value,
};

function onFormDataInput(e) {
  if (e.target === email) {
    inputData.email = e.target.value;
  }

  if (e.target === message) {
    inputData.message = e.target.value;
  }

  localStorage.setItem(LS_KEY, JSON.stringify(inputData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (email.value === '' || message.value === '') {
        return alert('Fullfill all fields')
  };

  localStorage.removeItem(LS_KEY);
  console.log(inputData);
  email.value = '';
  message.value = '';
  inputData.email = '';
  inputData.message = '';
}

