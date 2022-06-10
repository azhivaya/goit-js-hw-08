import throttle from "lodash.throttle";

const LS_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

const formData = {};

form.addEventListener('submit', onFormSubmit);
email.addEventListener('input', throttle(onTextareaInput, 500));
message.addEventListener('input', throttle(onTextareaInput, 500));

if (localStorage.getItem(LS_KEY) !== null) {
    const parsedData = JSON.parse(localStorage.getItem(LS_KEY));

    email.value = parsedData.email;
    message.value = parsedData.message;
}

function onFormSubmit(e) {
    e.preventDefault();

    const inputData = {
        email: email.value,
        message: message.value,
    }

    if (email.value === '' || message.value === '') {
        return alert('fullfill all fields')
    } else {
    console.log(inputData);
    localStorage.removeItem(LS_KEY);
    e.currentTarget.reset(); 
};  
}

function onTextareaInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

