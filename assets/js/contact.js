(function() {
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
                <h2>Success!</h2>
                <p>Your message has been sent. Thank you for getting in touch.</p>
                <a href="index.html" class="button">Return home</a>
                `;
        document.getElementsByClassName('form')[0].innerHTML = html;
    }
})();