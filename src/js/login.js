const form = document.querySelector('.form');
const errorMessage = document.querySelector('.form__message');

async function formHandler(event) {
    event.preventDefault();

    const obj = {};
    const formData = new FormData(this);

    for (const [key, val] of formData.entries()) {
        obj[key] = val;
    }

    loginUser(obj)
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

form.addEventListener('submit', formHandler);

function loginUser(body) {
    return fetch('http://127.0.0.1:5000/login', {
        method: 'post',
        body: JSON.stringify(body),
        headers: new Headers({
            'content-type': 'application/json',
        }),
    });
}
