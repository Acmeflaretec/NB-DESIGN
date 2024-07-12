const scriptURL = 'https://script.google.com/macros/s/AKfycbzLmpTMjmBu6hEK2TZ8Xm7I8Ah5NhTwdM17t2ppw1_cuYANBKkvOvtDaLzk2Ku6iwk1rA/exec';
const form = document.forms['contact-form'];
const submitButton = document.getElementById('submit');

// Initially disable the submit button
submitButton.disabled = true;

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(() => {
            alert("Thank you! Your form is submitted successfully.");
            window.location.reload();
        })
        .catch(error => console.error('Error!', error.message));
});

document.getElementById('phone').addEventListener('input', function () {
    const phone = this.value;
    const phoneError = document.getElementById('phoneError');
    const pattern = /^\d{10,}$/;

    if (!pattern.test(phone)) {
        phoneError.textContent = "Please enter at least 10 digits.";
    } else {
        phoneError.textContent = "";
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const phonePattern = /^\d{10,}$/;

    submitButton.disabled = !(name && phonePattern.test(phone) && subject && message);
}
