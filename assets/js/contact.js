(function() {
    /**
     * Form validation code from https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
     * with changes to make it work for this site and with EmailJS API.
     */

    // Set up variables for the contact form.
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const form = document.getElementById('contact-form');

    /**
     * Runs through field checking functions (isRequired and isBetween).
     * Displays the relevant error messaging and returns valid as true/false.
     * @returns boolean.
     */
    const checkName = () => {
        let valid = false;
        const min = 3;
        const name = nameField.value.trim();
        if (!isRequired(name)) {
            showError(nameField, 'Please enter your name.');
        } else if (!isBetween(name.length, min)) {
            showError(nameField, `Your name must be at least ${min} characters long.`);
        } else {
            showSuccess(nameField);
            valid = true;
        }
        return valid;
    };

    /**
     * Runs through field checking functions (isRequired and isEmailValid).
     * Displays the relevant error messaging and returns valid as true/false.
     * @returns boolean.
     */
    const checkEmail = () => {
        let valid = false;
        const email = emailField.value.trim();
        if (!isRequired(email)) {
            showError(emailField, 'Please enter your email address.');
        } else if (!isEmailValid(email)) {
            showError(emailField, "The email doesn't seem to be valid. Please try again.");
        } else {
            showSuccess(emailField);
            valid = true;
        }
        return valid;
    };

    /**
     * Runs through field checking functions (isRequired and isBetween).
     * Displays the relevant error messaging and returns valid as true/false.
     * @returns boolean.
     */
    const checkMessage = () => {
        let valid = false;
        const min = 30;
        const message = messageField.value.trim();
        if (!isRequired(message)) {
            showError(messageField, 'Please enter your message.');
        } else if (!isBetween(message.length, min)) {
            showError(messageField, `The message must be at least ${min} characters.`);
        } else {
            showSuccess(messageField);
            valid = true;
        }
        return valid;
    };

    /**
     * Uses regex to check the contents of the email field and returns true or false.
     * @param {string} email - contents of email field.
     * @returns boolean.
     */
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Check to see that a field has content.
    const isRequired = value => value === '' ? false : true;
    // Check the content is between the set min and max characters.
    const isBetween = (length, min, max) => length < min || length > max ? false : true;

    /**
     * Get the form's input element's parent element, remove the success class.
     * Then add the error class and show the error message.
     * @param {input} input - form input elements.
     * @param {string} message - error message.
     */
    const showError = (input, message) => {
        // get the form-field element
        const formField = input.parentElement;
        // add the error class
        formField.classList.remove('success');
        formField.classList.add('error');
    
        // show the error message
        const error = formField.querySelector('small');
        error.textContent = message;
    };
    
    /**
     * Get the form's input element's parent element, remove the error class.
     * Then add the success class and hide the error message.
     * @param {input} input - form input elements.
     */
    const showSuccess = (input) => {
        // get the form-field element
        const formField = input.parentElement;
    
        // remove the error class
        formField.classList.remove('error');
        formField.classList.add('success');
    
        // hide the error message
        const error = formField.querySelector('small');
        error.textContent = '';
    };
    
    
    form.addEventListener('submit', function (e) {
        // prevent the form from submitting
        e.preventDefault();
    
        // validate fields
        let isNameValid = checkName(),
            isEmailValid = checkEmail(),
            isMessageValid = checkMessage();
    
        let isFormValid = isNameValid &&
            isEmailValid &&
            isMessageValid;
    
        // submit to the server if the form is valid
        if (isFormValid) {
            // Uses the EmailJS API to send the form input.
            emailjs.init("user_e0qnu0neIitMWOhxmH7Yu");
            emailjs.sendForm('service_x1hrmtx', 'xxxtemplate_lgttxpk', this)
                .then(function () {
                    // success sending email
                    // Displays a thank you message.
                    displayThanks();
                }, function (error) {
                    // error message
                    // Displays an error message.
                    displayOops();
                });
        }
    });
    
    // Use debouncing technique to improve form performance.
    // Helpful to limit the number of times a function gets called.
    const debounce = (fn, delay = 500) => {
        let timeoutId;
        return (...args) => {
            // cancel the previous timer
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            // setup a new timer
            timeoutId = setTimeout(() => {
                fn.apply(null, args);
            }, delay);
        };
    };
    
    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'name':
                checkName();
                break;
            case 'email':
                checkEmail();
                break;
            case 'message':
                checkMessage();
                break;
        }
    }));
    
    /**
     * Replaces the form HTML with a thank you message after the form has been submitted.
     */
    function displayThanks() {
        let html = `
                <h2>Success!</h2>
                <p>Your message has been sent. Thank you for getting in touch.</p>
                <a href="index.html" class="button">Return home</a>
                `;
        document.getElementsByClassName('form')[0].innerHTML = html;
    }

    /**
     * Replaces the form HTML with a thank you message after the form has been submitted.
     */
     function displayOops() {
        let html = `
                <h2>Oh no!</h2>
                <p>There was a problem sending your message. Please try again later.</p>
                <a href="index.html" class="button">Return home</a>
                `;
        document.getElementsByClassName('form')[0].innerHTML = html;
    }
})();