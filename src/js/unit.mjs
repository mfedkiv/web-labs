const submitButton = document.querySelector('.form__button');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm_password');


export function checkPasswordsValue() {
    return passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '' && confirmPasswordInput.value !== '';
}

export function passwordInputHandler() {
    if (passwordInput.value === '' && confirmPasswordInput.value === '') {
        confirmPasswordInput.parentElement.classList.remove('declined');
        confirmPasswordInput.parentElement.classList.remove('accepted');
    } else {
        confirmPasswordInput.parentElement.classList.toggle('declined', !checkPasswordsValue());
        confirmPasswordInput.parentElement.classList.toggle('accepted', checkPasswordsValue());
    }

    submitButton.disabled = !checkPasswordsValue();
}
