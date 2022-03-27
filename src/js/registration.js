import { passwordInputHandler } from './unit.mjs';

const form = document.querySelector('.form');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm_password');
const errorMessage = document.querySelector('.form__message');

function formHandler(event) {
    event.preventDefault();

    const obj = {};
    const formData = new FormData(this);

    for (const [key, val] of formData.entries()) {
        obj[key] = val;
    }

    fetch('http://127.0.0.1:5000/register', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: new Headers({
            'content-type': 'application/json',
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(await response.text());
            }
            return response.text();
        })
        .then((text) => {
            window.localStorage.accessToken = JSON.parse(text).access_token;
            window.location.href = 'user-page.html';
        })
        .catch((error) => {
            errorMessage.innerText = JSON.parse(error.message).message;
        });
}

passwordInput.addEventListener('keyup', passwordInputHandler);
confirmPasswordInput.addEventListener('keyup', passwordInputHandler);
form.addEventListener('submit', formHandler);
