document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.init("user_e0qnu0neIitMWOhxmH7Yu");
        emailjs.sendForm('service_x1hrmtx', 'template_lgttxpk', this)
            .then(function () {
                // success sending email
            }, function (error) {
                // error message
                console.log('FAILED...', error);
            });
        displayThanks();
    });
});


function displayThanks() {
    let html = `
            <p>Thanks</p>
            `;
    document.getElementById('content--contact').innerHTML = html;
}