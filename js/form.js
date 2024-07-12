const scriptURL = 'https://script.google.com/macros/s/AKfycbyaq80ObNpfKNePgt_eZHroWiP7t46yNYhmJ2LEn27s3xqjbFnqvleQcppBda0H7ILZ3w/exec';
const form = document.forms['contact-form'];
const submitButton = document.getElementById('submit');

form.addEventListener('input', validateForm);
form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
        return;
    }

    const phoneInput = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^\d{10,}$/;

    if (!phonePattern.test(phoneInput)) {
        phoneError.textContent = "Please enter at least 10 digits.";
        return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! Your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message));
});

document.getElementById('phone').addEventListener('input', function () {
    var phone = this.value;
    var phoneError = document.getElementById('phoneError');
    var pattern = /^\d{10,}$/;

    if (!pattern.test(phone)) {
        phoneError.textContent = "Please enter at least 10 digits.";
    } else {
        phoneError.textContent = " ";
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const phonePattern = /^\d{10,}$/;

    if (name && phonePattern.test(phone) && subject && message) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}