const nameInput = document.querySelector('#first-name');
const secondNameInput = document.querySelector('#second-name');
const loginInput = document.querySelector('#login');
const form = document.querySelector('.user_info_container');
const deleteButton = document.querySelector('.delete');
const submitButton = document.querySelector('.user_profile__button[type="submit"]');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm_password');
const errorText = document.querySelector('.user_profile__error');

async function showResponse(foo, body = undefined) {
    const response = await foo(body);
    const responseText = JSON.parse(await response.text());
    if (response.ok) {
        nameInput.value = responseText.name;
        secondNameInput.value = responseText.surname;
        loginInput.value = responseText.username;

        return true;
    }

    errorText.innerText = responseText.message;
    return false;
}

showResponse(getUserData);

async function formHandler(event) {
    event.preventDefault();

    const obj = {};
    const formData = new FormData(this);

    for (const [key, val] of formData.entries()) {
        obj[key] = val;
    }

    if (await showResponse(updateUserData, obj)) {
        this.submit();
    }
}

async function deleteButtonHandler() {
    const response = await deleteUser();

    if (response.ok) {
        window.location.href = 'registration.html';
    }
}

function checkPasswordsValue() {
    return passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '' && confirmPasswordInput.value !== '';
}

function passwordInputHandler() {
    if (passwordInput.value === '' && confirmPasswordInput.value === '') {
        confirmPasswordInput.parentElement.classList.remove('declined');
        confirmPasswordInput.parentElement.classList.remove('accepted');
    } else {
        confirmPasswordInput.parentElement.classList.toggle('declined', !checkPasswordsValue());
        confirmPasswordInput.parentElement.classList.toggle('accepted', checkPasswordsValue());
    }

    submitButton.disabled = !checkPasswordsValue();
}

form.addEventListener('submit', formHandler);
deleteButton.addEventListener('click', deleteButtonHandler);
passwordInput.addEventListener('keyup', passwordInputHandler);
confirmPasswordInput.addEventListener('keyup', passwordInputHandler);

function getUserData() {
    return fetch('http://127.0.0.1:5000/user', {
        method: 'get',
        headers: new Headers({
            'content-type': 'application/json',
            authorization: `Bearer ${window.localStorage.accessToken}`,
        }),
    });
}

function updateUserData(body) {
    return fetch('http://127.0.0.1:5000/user', {
        method: 'put',
        body: JSON.stringify(body),
        headers: new Headers({
            'content-type': 'application/json',
            authorization: `Bearer ${window.localStorage.accessToken}`,
        }),
    });
}

function deleteUser() {
    return fetch('http://127.0.0.1:5000/user', {
        method: 'delete',
        headers: new Headers({
            'content-type': 'application/json',
            authorization: `Bearer ${window.localStorage.accessToken}`,
        }),
    });
}
